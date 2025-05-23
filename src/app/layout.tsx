import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/Toaster';
import Providers from './providers';
import UserProvider from '@/providers/UserInfoProvider';
import JotaiProvider from '@/providers/JotaiProvider';
import React from 'react';
import AuthSession from '@/providers/AuthSession';
import MainLayoutClient from '@/components/common/MainLayoutClient';
import ClickNotiProvider from '@/providers/ClickNotiProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '냥.zip | 길냥이 돌봄 기록',
  description: '당신이 마주친 모든 길냥이들을 위해',
  keywords: ['길고양이', '길냥이'],
  authors: [{ name: '냥집' }],
  openGraph: {
    title: '냥.zip | 길냥이 돌봄 기록',
    description: '당신이 마주친 모든 길냥이들을 위해',
    images: ['/images/og-image.png']
  },
  icons: {
    icon: [
      { url: '/images/favicon/favicon.ico' },
      {
        url: '/images/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        url: '/images/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      }
    ],
    apple: [
      {
        url: '/images/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    other: [
      {
        url: '/images/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        url: '/images/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: false,
    viewportFit: 'cover'
  }
};

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${inter.className} relative h-screen w-full bg-gr-100 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]`}
      >
        <Providers>
          <AuthSession>
            <JotaiProvider>
              <UserProvider>
                <ClickNotiProvider />
                <MainLayoutClient>{children}</MainLayoutClient>
                {modal}
              </UserProvider>
            </JotaiProvider>
          </AuthSession>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
