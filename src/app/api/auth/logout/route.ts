import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });

  const isProduction = process.env.NODE_ENV === 'production';
  const isLocalhost = !isProduction;

  const baseConfig = {
    secure: isProduction,
    path: '/',
    ...(isLocalhost && { domain: 'localhost' })
  };

  const cookieConfigs = {
    Authorization: {
      ...baseConfig,
      secure: true
    },
    'Authorization-Refresh': {
      ...baseConfig,
      secure: true
    },

    'next-auth.session-token': {
      ...baseConfig,
      sameSite: 'lax' as const
    },
    'next-auth.pkce.code_verifier': {
      ...baseConfig,
      sameSite: 'none' as const,
      secure: true // PKCE는 항상 secure=true (NextAuth 내부 설정)
    },
    'next-auth.state': {
      ...baseConfig,
      sameSite: 'lax' as const
    }
  };

  Object.entries(cookieConfigs).forEach(([name, config]) => {
    response.cookies.set(name, '', {
      ...config,
      maxAge: 0,
      expires: new Date(0)
    });
  });

  return response;
}
