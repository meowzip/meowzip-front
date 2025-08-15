import { fetchRaw } from '@/utils/fetch';
import { NextRequest, NextResponse } from 'next/server';

let refreshPromise: Promise<NextResponse> | null = null;

const extractCookieValue = (
  setCookieHeader: string,
  cookieName: string
): string | null => {
  const cookieMatch = setCookieHeader.match(
    new RegExp(`${cookieName}=([^;]+)`)
  );
  return cookieMatch ? cookieMatch[1] : null;
};

const clearPreviousTokens = (response: NextResponse) => {
  const isProduction = process.env.NODE_ENV === 'production';

  const clearConfig = {
    path: '/',
    maxAge: 0,
    secure: isProduction,
    ...(isProduction ? {} : { domain: 'localhost' })
  };

  response.cookies.set('Authorization', '', clearConfig);
  response.cookies.set('Authorization-Refresh', '', {
    ...clearConfig,
    httpOnly: true
  });
};

const performTokenRefresh = async (
  request: NextRequest
): Promise<NextResponse> => {
  try {
    const refreshToken = request.cookies.get('Authorization-Refresh')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token이 없습니다' },
        { status: 401 }
      );
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        Cookie: `Authorization-Refresh=${refreshToken}`
      }
    };

    const response = await fetchRaw('/tokens/refresh', requestOptions);

    if (!response.ok) {
      const errorData = await response.text();
      console.error(
        `Backend refresh request failed with status: ${response.status}`,
        errorData
      );
      const errorResponse = NextResponse.json(
        { error: '토큰 새로고침 실패' },
        { status: response.status }
      );
      clearPreviousTokens(errorResponse);
      return errorResponse;
    }

    const newAccessToken = response.headers.get('Authorization');
    const setCookieHeader = response.headers.get('set-cookie');
    const newRefreshToken = setCookieHeader
      ? extractCookieValue(setCookieHeader, 'Authorization-Refresh')
      : null;

    if (!newAccessToken) {
      return NextResponse.json(
        { error: '새로운 토큰을 받을 수 없습니다' },
        { status: 500 }
      );
    }

    const successResponse = NextResponse.json(
      { success: true, accessToken: newAccessToken },
      { status: 200 }
    );

    clearPreviousTokens(successResponse);

    const isProduction = process.env.NODE_ENV === 'production';

    const baseCookieOptions = {
      secure: isProduction,
      path: '/',
      sameSite: 'lax' as const,
      ...(isProduction ? {} : { domain: 'localhost' })
    };

    successResponse.cookies.set('Authorization', newAccessToken, {
      ...baseCookieOptions,
      maxAge: 60 * 60 * 2,
      httpOnly: false
    });

    if (newRefreshToken) {
      successResponse.cookies.set('Authorization-Refresh', newRefreshToken, {
        ...baseCookieOptions,
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true
      });
    }

    return successResponse;
  } catch (error) {
    console.error('Refresh Token API Error:', error);
    return NextResponse.json(
      { error: '토큰 새로고침 처리 중 오류 발생' },
      { status: 500 }
    );
  }
};

export async function POST(request: NextRequest) {
  if (refreshPromise) {
    console.log('>>> Ongoing refresh request. Waiting...');
    const response = await refreshPromise;
    return response.clone();
  }

  console.log('>>> Starting new refresh request.');
  refreshPromise = performTokenRefresh(request);

  try {
    const response = await refreshPromise;
    return response.clone();
  } finally {
    console.log('>>> Refresh request finished. Releasing lock.');
    refreshPromise = null;
  }
}
