import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
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
      console.log('user', user);
      console.log('account', account);
      return true;
    },
    async redirect({ url, baseUrl }) {
      const redirectUrl = `${baseUrl}/diary`;
      return redirectUrl;
    },
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    }
  }
});

export { handler as GET, handler as POST };
