import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/Toaster';

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
      <body className={`${inter.className} w-full bg-slate-100`}>
        <div className="m-auto h-screen max-w-[600px] bg-white">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
