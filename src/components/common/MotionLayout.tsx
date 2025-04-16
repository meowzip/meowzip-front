'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { useAtomValue } from 'jotai';
import { isModalActiveAtom } from '@/store/modalAtom';

interface MotionLayoutProps {
  children: ReactNode;
}

const exceptionPaths = new Set(['/', '/login', '/signup', '/signin']);

const slideVariants: Variants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute',
    width: '100%',
    height: '100%'
  }),
  enter: {
    x: '0%',
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' },
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeInOut' },
    position: 'absolute',
    width: '100%',
    height: '100%'
  })
};

const PAGE_BACKGROUND_COLOR = 'var(--color-gr-100)';

export default function MotionLayout({ children }: MotionLayoutProps) {
  const pathname = usePathname();
  const isModalActive = useAtomValue(isModalActiveAtom);

  if (exceptionPaths.has(pathname) || isModalActive) {
    return <>{children}</>;
  }

  const direction = 1;

  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.div
        key={pathname}
        custom={direction}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={slideVariants}
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
      </motion.div>
    </AnimatePresence>
  );
}
