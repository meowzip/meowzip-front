'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import MotionLayout from '@/components/common/MotionLayout';
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

  return (
    <div className="flex h-screen flex-col bg-gr-50">
      <main className="relative flex-grow overflow-y-auto bg-gr-100">
        <MotionLayout>{children}</MotionLayout>
      </main>

      {fabHref && <FloatingActionButton href={fabHref} />}
      {showBottomNav && <BottomNavBar />}
    </div>
  );
}
