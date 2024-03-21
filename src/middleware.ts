import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import returnFetchJson from '@/utils/returnFetchJson';

const fetchExtended = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_MEOW_API,
  headers: { Accept: 'application/json' }
});

const protectedRoutes = ['/diary'];
const publicRoutes = ['/signin', '/signup'];

export const middleware = async (request: NextRequest) => {
  const currentPath = request.nextUrl.pathname;

  const accessToken = await getTokenFromCookies(request);
  console.log('accessToken:', accessToken);
  if (accessToken && checkExpiredToken(accessToken)) {
    try {
      await refreshAccessToken();
    } catch (error) {
      console.error('Error:', error);
      const url = request.nextUrl.clone();
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }
  }

  if (!accessToken && protectedRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }

  if (accessToken && publicRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

const checkExpiredToken = (accessToken: string) => {
  const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
  const exp = decodedToken.exp * 1000;
  const now = Date.now();
  return exp < now;
};

const refreshAccessToken = async () => {
  const response = await fetchExtended('/tokens/refresh', { method: 'POST' });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const token = response.headers.get('Authorization');

  if (token) {
    document.cookie = `Authorization=${token}; path=/; max-age=3600; secure;`;
  } else {
    throw new Error('Authorization token not found in the response');
  }
};

const getTokenFromCookies = async (request: NextRequest) => {
  const cookiesHeader = request.headers.get('cookie');
  if (!cookiesHeader) return null;

  const cookiesArray: [string, string][] = cookiesHeader
    .split('; ')
    .map(cookie => {
      const [key, value] = cookie.split('=');
      return [key, value];
    });

  const cookies = new Map(cookiesArray);

  return cookies.get('Authorization');
};
