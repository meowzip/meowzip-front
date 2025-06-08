'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import BottomNavBar from '@/components/ui/BottomNavBar';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import { PATHS } from '@/constants/paths';

const pathsWithNav = [PATHS.DIARY, PATHS.ZIP, PATHS.COMMUNITY, PATHS.PROFILE];

const fabLinkMap: Record<string, string> = {
  [PATHS.DIARY]: PATHS.DIARY_WRITE,
  [PATHS.ZIP]: PATHS.CAT_REGISTER,
  [PATHS.COMMUNITY]: PATHS.COMMUNITY_WRITE
};

interface MainLayoutClientProps {
  children: React.ReactNode;
}

export default function MainLayoutClient({ children }: MainLayoutClientProps) {
  const pathname = usePathname();
  const showBottomNav = pathsWithNav.some(p => p === pathname);
  const fabHref = fabLinkMap[pathname];
  const [showNavAnimation, setShowNavAnimation] = useState(false);

  useEffect(() => {
    if (showBottomNav) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShowNavAnimation(true);
        });
      });
    } else {
      setShowNavAnimation(false);
    }
  }, [showBottomNav]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === '+' || e.key === '-' || e.key === '=')
      ) {
        e.preventDefault();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="m-auto flex h-screen max-w-[640px] flex-col bg-gr-50">
      <main className="relative overflow-y-auto bg-gr-100">{children}</main>
      {fabHref && <FloatingActionButton href={fabHref} />}
      {showBottomNav && (
        <div
          className={`absolute bottom-0 z-[100] w-full transition-transform duration-300 ${showNavAnimation ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <BottomNavBar />
        </div>
      )}
    </div>
  );
}
