'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { isModalActiveAtom } from '@/store/modalAtom';
import CatRegisterModal from '@/components/zip/CatRegisterModal';
import { useModalAnimation } from '@/hooks/useModalAnimation';

export default function InterceptedCatRegisterModal() {
  const router = useRouter();
  const setIsModalActive = useSetAtom(isModalActiveAtom);
  const { handleClose: animatedClose, animationClasses } = useModalAnimation();

  useEffect(() => {
    setIsModalActive(true);
    return () => {
      setIsModalActive(false);
    };
  }, [setIsModalActive]);

  return (
    <div
      className={`fixed left-1/2 top-0 z-50 h-screen w-full max-w-[640px] -translate-x-1/2 overflow-y-auto bg-gr-white ${animationClasses}`}
    >
      <CatRegisterModal onClose={animatedClose} />
    </div>
  );
}
