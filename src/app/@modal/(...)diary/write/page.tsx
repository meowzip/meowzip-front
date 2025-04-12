'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { isModalActiveAtom } from '@/store/modalAtom';
import DiaryWriteModal from '@/components/diary/DiaryWriteModal';

export default function InterceptedDiaryWriteModal() {
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

  return <DiaryWriteModal onClose={handleClose} id={0} />;
}
