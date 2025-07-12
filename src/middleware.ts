import { NextResponse, NextRequest } from 'next/server';

const PROTECTED_ROUTES: string[] = [
  '/',
  '/diary',
  '/zip',
  '/community',
  '/profile'
];
const PUBLIC_ROUTES: string[] = ['/signin', '/signup'];

export const middleware = async (
  request: NextRequest
): Promise<NextResponse> => {
  const currentPath: string = request.nextUrl.pathname;
  const cookieList = request.cookies;
  const accessToken: string | undefined =
    cookieList.get('Authorization')?.value;
  const refreshToken: string | undefined = cookieList.get(
    'Authorization-Refresh'
  )?.value;

  if (!accessToken && !refreshToken) {
    return handlePublicAndProtectedRoutes({ currentPath, request });
  }

  if (accessToken && !checkExpiredToken(accessToken)) {
    return handlePublicAndProtectedRoutes({
      currentPath,
      accessToken,
      request
    });
  }

  if (refreshToken) {
    return NextResponse.next();
  } else {
    return handlePublicAndProtectedRoutes({ currentPath, request });
  }
};

const handlePublicAndProtectedRoutes = ({
  currentPath,
  accessToken,
  request
}: {
  currentPath: string;
  accessToken?: string;
  request: NextRequest;
}): NextResponse => {
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
  url.pathname = '/diary';
  return NextResponse.redirect(url);
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
    return true;
  }
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|_next/data|_next/chunks).*)'
  ]
};
