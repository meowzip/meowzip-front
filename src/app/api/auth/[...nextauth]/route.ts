import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import returnFetchJson from '@/utils/returnFetchJson';
import { cookies } from 'next/headers';
import { headers } from 'next/headers';
import { checkMembershipByEmail } from '@/services/signin';
import { signUpOnServer } from '@/services/signup';

const fetchExtended = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_MEOW_API,
  headers: { Accept: 'application/json' }
});

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      const signInInfo = await checkMembershipByEmail(user.email || '');

      if (signInInfo && signInInfo.isEmailExists) {
        // 소셜 로그인 처리
        signInOnServerWithSocial({
          email: user.email || '',
          password: user.id || ''
        });
        return true;
      } else {
        // 회원가입 처리
        signUpOnServerWithSocialLogin({
          email: user.email || '',
          oauthId: user.id || '',
          loginType: account?.provider.toUpperCase() || ''
        });
        return true;
      }
    },

    async redirect({ url, baseUrl }) {
      const cookieList = cookies();
      const isMember = cookieList.get('Authorization');
      const redirectUrl = isMember ? '/' : '/signin';
      return redirectUrl;
    },
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    }
  },
  events: {
    async signIn(message) {},
    async signOut(message) {
      /* on signout */
    },
    async createUser(message) {
      /* user created */
    },
    async updateUser(message) {
      /* user updated - e.g. their email was verified */
    },
    async linkAccount(message) {
      /* account (e.g. Twitter) linked to a user */
    },
    async session(message) {
      /* session is active */
    }
  }
});

const signInOnServerWithSocial = async (reqObj: {
  email: string;
  password: string;
}) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: reqObj,
      credentials: 'include' as RequestCredentials
    };

    const response = await fetchExtended('/members/login', requestOptions);
    const token = response.headers.get('Authorization');
    const setCookies = response.headers.get('set-cookie');
    console.log('response:', response);
    console.log('token:', token);
    console.log('setCookies:', setCookies);

    cookies().set({
      name: 'Authorization',
      value: token || '',
      path: '/'
    });

    cookies().set({
      name: 'Authorization-Refresh',
      value: setCookies || '',
      httpOnly: true
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('로그인 요청 중 오류 발생:' + error.message);
    } else {
      throw new Error('로그인 요청 중 오류 발생');
    }
  }
};

const signUpOnServerWithSocialLogin = async (reqObj: {
  email: string;
  oauthId: string;
  loginType: string;
}) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: reqObj,
      credentials: 'include' as RequestCredentials
    };

    const response = await fetchExtended('/members/sign-up', requestOptions);
    const token = response.headers.get('Authorization');
    const setCookies = response.headers.get('set-cookie');

    cookies().set({
      name: 'Authorization',
      value: token || ''
    });

    cookies().set({
      name: 'Authorization-Refresh',
      value: setCookies || ''
    });
  } catch (error) {
    console.error(error);
  }
};

export { handler as GET, handler as POST };
