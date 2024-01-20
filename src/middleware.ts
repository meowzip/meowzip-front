import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/diary', 'onboard'];
const publicRoutes = ['/signin', '/signup'];

export function middleware(request: NextRequest) {
  const token = getTokenFromCookies(request);
  const currentPath = request.nextUrl.pathname;

  if (!token && protectedRoutes.includes(currentPath)) {
    console.log('redirecting to signin');
    const url = request.nextUrl.clone();
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }

  // if (token && publicRoutes.includes(currentPath)) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = '/';
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}

function getTokenFromCookies(request: NextRequest) {
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
}
