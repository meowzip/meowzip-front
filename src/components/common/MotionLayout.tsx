'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { isModalActiveAtom } from '@/store/modalAtom';

interface MotionLayoutProps {
  children: ReactNode;
}

const exceptionPaths = new Set(['/', '/login', '/signup', '/signin']);

const variants = {
  hidden: { x: '100%' },
  enter: {
    x: 0,
    transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] }
  },
  exit: {
    x: '-100%',
    transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } // 동일한 ease 커브 사
  }
};

export default function MotionLayout({ children }: MotionLayoutProps) {
  const pathname = usePathname();
  const isModalActive = useAtomValue(isModalActiveAtom);

  useEffect(() => {}, [pathname, isModalActive]);

  if (exceptionPaths.has(pathname) || isModalActive) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.div
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
