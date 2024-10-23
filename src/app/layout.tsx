import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/Toaster';
import Providers from './providers';
import UserProvider from '@/providers/UserInfoProvider';
import JotaiProvider from '@/providers/JotaiProvider';
import React from 'react';
import AuthSession from '@/providers/AuthSession';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MeowZip',
  description: 'Introduce MeowZip'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} relative w-full bg-[#f9f9f9]`}>
        <div className="m-auto h-screen max-w-[600px] bg-white">
          <Providers>
            <AuthSession>
              <JotaiProvider>
                <UserProvider>{children}</UserProvider>
              </JotaiProvider>
            </AuthSession>
          </Providers>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
