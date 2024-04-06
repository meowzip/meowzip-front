import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import returnFetchJson from '@/utils/returnFetchJson';
import { cookies } from 'next/headers';
import { parseCookieString } from './utils/common';

const fetchExtended = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_MEOW_API,
  headers: {
    Accept: 'application/json'
  }
});

const PROTECTED_ROUTES = ['/diary'];
const PUBLIC_ROUTES = ['/signin', '/signup'];

export const middleware = async (request: NextRequest) => {
  const currentPath = request.nextUrl.pathname;
  const cookieList = cookies();
  const accessToken = cookieList.get('Authorization')?.value;
  const refreshToken = cookies().get('Authorization-Refresh')?.value;

  try {
    if (
      (accessToken && checkExpiredToken(accessToken)) ||
      (!accessToken && refreshToken)
    ) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        const nextResponse = NextResponse.next();
        nextResponse.cookies.set('Authorization', newAccessToken, {
          maxAge: 60 * 60 * 2,
          secure: true,
          path: '/'
        });
        return nextResponse;
      }
    }
  } catch (error) {
    console.error('Error:', error);
    const url = request.nextUrl.clone();
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }

  if (!accessToken && PROTECTED_ROUTES.includes(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }

  if (accessToken && PUBLIC_ROUTES.includes(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
};

const checkExpiredToken = (accessToken: string) => {
  const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
  const exp = decodedToken.exp * 1000;
  const now = Date.now();
  return exp < now;
};

let refreshPromise: any = null;
const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refreshToken = cookies().get('Authorization-Refresh')?.value;

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
        if (!response.ok) {
          throw new Error('Failed to refresh token');
        }

        const newAccessToken = response.headers.get('authorization');
        if (newAccessToken) {
          return newAccessToken;
        } else {
          throw new Error('Authorization token not found in the response');
        }
      } catch (error) {
        refreshPromise = null;
        throw error;
      }
    })();
    return refreshPromise;
  } else {
    return refreshPromise;
  }
};
