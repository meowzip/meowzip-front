'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface MotionLayoutProps {
  children: ReactNode;
}

// 애니메이션 예외 처리할 경로 목록 (Set 사용으로 검색 성능 향상)
const exceptionPaths = new Set(['/', '/login', '/signup', '/signin']);

// 애니메이션 variants: 자연스러운 수평 슬라이드
const variants = {
  hidden: { x: '100%' }, // 오른쪽 화면 밖에서 시작 (opacity 제거)
  enter: {
    x: 0,
    transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } // 자연스러운 ease 커브 (iOS 유사)
  },
  exit: {
    x: '-100%',
    transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } // 동일한 ease 커브 사용
  }
};

export default function MotionLayout({ children }: MotionLayoutProps) {
  const pathname = usePathname();

  // 현재 경로가 예외 경로 목록에 포함되어 있으면 애니메이션 미적용
  if (exceptionPaths.has(pathname)) {
    return <>{children}</>;
  }

  // AnimatePresence 와 motion.div 복원
  return (
    <AnimatePresence initial={false}>
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
