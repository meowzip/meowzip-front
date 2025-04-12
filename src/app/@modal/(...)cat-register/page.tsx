'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { isModalActiveAtom } from '@/store/modalAtom';
import CatRegisterModal from '@/components/zip/CatRegisterModal';

export default function InterceptedCatRegisterModal() {
  const router = useRouter();
  const setIsModalActive = useSetAtom(isModalActiveAtom);

  useEffect(() => {
    setIsModalActive(true);
    return () => {
      setIsModalActive(false);
    };
  }, [setIsModalActive]);

  const handleClose = () => {
    router.back();
  };

  return <CatRegisterModal onClose={handleClose} id={0} />;
}
