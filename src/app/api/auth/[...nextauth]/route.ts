import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import returnFetchJson from '@/utils/returnFetchJson';
import { cookies } from 'next/headers';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

const fetchExtended = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_MEOW_API,
  headers: { Accept: 'application/json' }
  // interceptors: {
  //   request: async args => {
  //     console.log('********* before sending request *********');
  //     console.log('url:', args[0].toString()); // eslint-disable-line
  //     console.log('requestInit:', args[1], '\n\n');
  //     return args;
  //   },
  //   response: async (response, requestArgs) => {
  //     console.log('********* after receiving response *********');
  //     console.log('url:', requestArgs[0].toString());
  //     console.log('requestInit:', requestArgs[1], '\n\n');
  //     return response;
  //   }
  // }
});

// import KakaoProvider from 'next-auth/providers/kakao';
// import NaverProvider from 'next-auth/providers/naver';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
    // KakaoProvider({
    //   clientId: process.env.KAKAO_CLIENT_ID || '',
    //   clientSecret: process.env.KAKAO_CLIENT_SECRET || ''
    // }),
    // NaverProvider({
    //   clientId: process.env.NAVER_CLIENT_ID || '',
    //   clientSecret: process.env.NAVER_CLIENT_SECRET || ''
    // })
  ],
  callbacks: {
    async signIn({ user, account }) {
      const email = user.email || '';
      const token = await signInOnServer({
        email: 'abc@gmail.com',
        password: 'qwer12345!'
      });

      return true;
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

const signInOnServer = async (reqObj: { email: string; password: string }) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: reqObj,
      credentials: 'include' as RequestCredentials
    };

    const response = await fetchExtended('/members/login', requestOptions);
    const token = response.headers.get('Authorization');
    const setCookies = response.headers.get('set-cookie');
    console.log(setCookies, 'setCookie');

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
    if (error instanceof Error) {
      throw new Error('로그인 요청 중 오류 발생:' + error.message);
    } else {
      throw new Error('로그인 요청 중 오류 발생');
    }
  }
};

export { handler as GET, handler as POST };
