import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import returnFetchJson from '@/utils/returnFetchJson';

const fetchExtended = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_MEOW_API,
  headers: {
    Accept: 'application/json'
  }
});

const PROTECTED_ROUTES: string[] = ['/diary', '/zip', '/community'];
const PUBLIC_ROUTES: string[] = ['/signin', '/signup'];

export const middleware = async (
  request: NextRequest
): Promise<NextResponse> => {
  const currentPath: string = request.nextUrl.pathname;
  const cookieList = cookies();
  const accessToken: string | undefined =
    cookieList.get('Authorization')?.value;
  const refreshToken: string | undefined = cookieList.get(
    'Authorization-Refresh'
  )?.value;

  if (!accessToken && !refreshToken) {
    return handlePublicAndProtectedRoutes(currentPath, accessToken, request);
  }

  if (accessToken && checkExpiredToken(accessToken)) {
    try {
      const newAccessToken = await refreshAccessToken(refreshToken);
      return handleTokenRefresh(newAccessToken);
    } catch (error) {
      console.error('Error:', error);
      return redirectToSignIn(request);
    }
  } else if (!accessToken && refreshToken) {
    try {
      const newAccessToken = await refreshAccessToken(refreshToken);
      return handleTokenRefresh(newAccessToken);
    } catch (error) {
      console.error('Error:', error);
      return redirectToSignIn(request);
    }
  }

  return handlePublicAndProtectedRoutes(currentPath, accessToken, request);
};

const handlePublicAndProtectedRoutes = (
  currentPath: string,
  accessToken: string | undefined,
  request: NextRequest
): NextResponse => {
  if (!accessToken && PROTECTED_ROUTES.includes(currentPath)) {
    return redirectToSignIn(request);
  }

  if (accessToken && PUBLIC_ROUTES.includes(currentPath)) {
    return redirectToHome(request);
  }

  return NextResponse.next();
};

const redirectToSignIn = (request: NextRequest): NextResponse => {
  const url = request.nextUrl.clone();
  url.pathname = '/signin';
  return NextResponse.redirect(url);
};

const redirectToHome = (request: NextRequest): NextResponse => {
  const url = request.nextUrl.clone();
  url.pathname = '/';
  return NextResponse.redirect(url);
};

const handleTokenRefresh = (
  newAccessToken: string | undefined
): NextResponse => {
  if (newAccessToken) {
    const nextResponse = NextResponse.next();
    nextResponse.cookies.set('Authorization', newAccessToken, {
      maxAge: 60 * 60 * 2,
      secure: true,
      path: '/'
    });
    return nextResponse;
  }
  throw new Error('Failed to refresh token');
};

const refreshAccessToken = async (
  refreshToken: string | undefined
): Promise<string> => {
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const reqOptions = {
    headers: {
      Cookie: `Authorization-Refresh=${refreshToken}`
    }
  };

  try {
    const response = await fetchExtended('/tokens/refresh', {
      method: 'POST',
      ...reqOptions
    });

    if (response.ok) {
      const newAccessToken: string | null =
        response.headers.get('authorization');
      if (newAccessToken) {
        return newAccessToken;
      } else {
        throw new Error('Authorization token not found in the response');
      }
    } else {
      throw new Error('Failed to refresh token');
    }
  } catch (error) {
    throw error;
  }
};

const checkExpiredToken = (accessToken: string): boolean => {
  try {
    const payloadBase64: string = accessToken.split('.')[1];
    const decodedPayload: { exp: number } = JSON.parse(
      Buffer.from(payloadBase64, 'base64').toString()
    );
    const expirationTimeMs: number = decodedPayload.exp * 1000;
    return expirationTimeMs < Date.now();
  } catch (error) {
    console.error('Failed to decode or check token expiration:', error);
    throw new Error('Invalid token format');
  }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)']
};
