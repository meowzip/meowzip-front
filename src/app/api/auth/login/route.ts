import { fetchPublicJson } from '@/utils/fetch';
import { NextRequest, NextResponse } from 'next/server';

const extractCookieValue = (
  setCookieHeader: string,
  cookieName: string
): string | null => {
  const cookieMatch = setCookieHeader.match(
    new RegExp(`${cookieName}=([^;]+)`)
  );
  return cookieMatch ? cookieMatch[1] : null;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fcmToken } = body;

    const requestOptions = {
      method: 'POST',
      body: { email, password, fcmToken },
      credentials: 'include' as RequestCredentials
    };

    const response = await fetchPublicJson('/members/login', requestOptions);

    if (!response.ok) {
      const errorData = (await response.body) as any;
      return NextResponse.json(
        { error: errorData.message || '로그인 실패' },
        { status: response.status }
      );
    }

    const accessToken = response.headers.get('Authorization');

    const setCookieHeader = response.headers.get('set-cookie');
    const refreshToken = setCookieHeader
      ? extractCookieValue(setCookieHeader, 'Authorization-Refresh')
      : null;

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { error: '토큰을 받을 수 없습니다' },
        { status: 500 }
      );
    }

    const successResponse = NextResponse.json(
      {
        success: true,
        message: '로그인 성공',
        redirectTo: '/diary'
      },
      { status: 200 }
    );

    const isProduction = process.env.NODE_ENV === 'production';

    const baseCookieOptions = {
      secure: isProduction,
      path: '/',
      sameSite: 'lax' as const,
      ...(isProduction ? {} : { domain: 'localhost' })
    };

    successResponse.cookies.set('Authorization', accessToken, {
      ...baseCookieOptions,
      maxAge: 60 * 60 * 2,
      httpOnly: false
    });

    successResponse.cookies.set('Authorization-Refresh', refreshToken, {
      ...baseCookieOptions,
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true
    });

    return successResponse;
  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json(
      { error: '로그인 처리 중 오류 발생' },
      { status: 500 }
    );
  }
}
