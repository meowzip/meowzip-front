import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/Toaster';
import BottomNavBar from '../components/ui/BottomNavBar';
import Providers from './providers';

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
    <html lang="en">
      <body className={`${inter.className} relative w-full bg-slate-100`}>
        <Providers>
          <div className="m-auto h-screen max-w-[600px] bg-white">
            {children}
          </div>
          <Toaster />
          <div className="fixed bottom-0">{/* <BottomNavBar /> */}</div>
        </Providers>
      </body>
    </html>
  );
}
