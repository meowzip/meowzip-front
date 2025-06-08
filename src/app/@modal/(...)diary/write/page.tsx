'use client';

import { useLayoutEffect } from 'react';
import { useSetAtom } from 'jotai';
import { isModalActiveAtom } from '@/store/modalAtom';
import DiaryWriteModal from '@/components/diary/DiaryWriteModal';
import { useModalAnimation } from '@/hooks/useModalAnimation';

export default function InterceptedDiaryWriteModal() {
  const setIsModalActive = useSetAtom(isModalActiveAtom);
  const { handleClose, animationClasses } = useModalAnimation();

  useLayoutEffect(() => {
    setIsModalActive(true);

    return () => {
      setIsModalActive(false);
    };
  }, [setIsModalActive]);

  return (
    <div
      className={`fixed left-1/2 top-0 z-50 h-screen w-full max-w-[640px] -translate-x-1/2 overflow-y-auto bg-gr-white ${animationClasses}`}
    >
      <DiaryWriteModal onClose={handleClose} id={0} />
    </div>
  );
}
