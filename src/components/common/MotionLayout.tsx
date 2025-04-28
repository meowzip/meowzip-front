'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { useAtomValue } from 'jotai';
import { isModalActiveAtom } from '@/store/modalAtom';

interface MotionLayoutProps {
  children: ReactNode;
}

const exceptionPaths = new Set(['/', '/login', '/signup', '/signin']);

const PAGE_BACKGROUND_COLOR = 'var(--color-gr-100)';

export default function MotionLayout({ children }: MotionLayoutProps) {
  const pathname = usePathname();
  const isModalActive = useAtomValue(isModalActiveAtom);

  if (exceptionPaths.has(pathname) || isModalActive) {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: PAGE_BACKGROUND_COLOR
      }}
    >
      {children}
    </div>
  );
}
