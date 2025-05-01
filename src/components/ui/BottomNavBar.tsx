'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from '@/services/profile';
import { BOTTOM_NAV } from '@/constants/bottom-nav';

const BottomNavBar = () => {
  const [activeNav, setActiveNav] = useState('diary');
  const pathName = usePathname();

  const {
    data: myProfile,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['myProfile'],
    queryFn: () => getMyProfile()
  });

  useEffect(() => {
    const path = pathName.split('/')[1];
    setActiveNav(path);
  }, [pathName]);

  const handleNavClick = () => {
    if (
      typeof window !== 'undefined' &&
      window.ReactNativeWebView &&
      window.vibrate
    ) {
      window.vibrate(50);
    }
  };

  if (isLoading) return;
  if (isError) throw error;

  return (
    <div className="flex w-full justify-evenly rounded-t-[20px] bg-gr-white px-2 pb-[34px] pt-2 shadow-bottomNav">
      {BOTTOM_NAV.map(nav => {
        const imgSrc =
          nav.key === 'profile'
            ? myProfile.profileImageUrl || nav.img.default
            : nav.key === activeNav
              ? nav.img.active
              : nav.img.default;

        return (
          <Link
            key={nav.key}
            href={`/${nav.key}`}
            className="relative px-4"
            onClick={handleNavClick}
          >
            {nav.key === 'profile' && myProfile?.existsNewNotification && (
              <div className="absolute right-4">
                <Badge type="default" bgColor="bg-pr-500" />
              </div>
            )}
            <Image
              src={imgSrc}
              alt={nav.key}
              width={40}
              height={40}
              className="select-none rounded-full p-[3px]"
              style={{
                WebkitTransform: 'translate3d(0, 0, 0)',
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden'
              }}
              priority={nav.key === activeNav}
            />
            <h5 className="text-center text-[10px] font-normal text-gr-800">
              {nav.value}
            </h5>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavBar;
