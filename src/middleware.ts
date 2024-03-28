import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import returnFetchJson from '@/utils/returnFetchJson';
import { cookies } from 'next/headers';

const fetchExtended = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_MEOW_API,
  headers: {
    Accept: 'application/json'
  }
});

const protectedRoutes = ['/diary'];
const publicRoutes = ['/signin', '/signup'];

export const middleware = async (request: NextRequest) => {
  const currentPath = request.nextUrl.pathname;
  const cookieList = cookies();
  const accessToken = cookieList.get('Authorization')?.value;
  const refreshToken = cookies().get('Authorization-Refresh')?.value;
  console.log(refreshToken, 'refreshToken');

  if (accessToken && checkExpiredToken(accessToken)) {
    try {
      await refreshAccessToken();
    } catch (error) {
      console.error('Error:', error);
      const url = request.nextUrl.clone();
      url.pathname = '/signin';
      console.log('accessToken:', accessToken);
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
  console.log('NextResponse.next();');
  return NextResponse.next();
};

const checkExpiredToken = (accessToken: string) => {
  const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
  const exp = decodedToken.exp * 1000;
  const now = Date.now();
  return exp < now;
};

const refreshAccessToken = async () => {
  const refreshToken = cookies().get('Authorization-Refresh')?.value;
  console.log(refreshToken, 'refreshToken');
  const reqOptions = {
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  };
  const response = await fetchExtended('/tokens/refresh', {
    method: 'POST',
    ...reqOptions
  });
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
