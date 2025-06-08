'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { isModalActiveAtom } from '@/store/modalAtom';
import CatInfo from '@/components/zip/CatInfo';
import { useQuery } from '@tanstack/react-query';
import { getCatDetail } from '@/services/cat';
import { useModalAnimation } from '@/hooks/useModalAnimation';

export default function InterceptedCatEditModal() {
  const router = useRouter();
  const params = useParams(); // useParams 훅 사용
  const setIsModalActive = useSetAtom(isModalActiveAtom);
  const { handleClose: animatedClose, animationClasses } = useModalAnimation();

  const catId = params.id ? parseInt(params.id as string, 10) : undefined;

  useEffect(() => {
    setIsModalActive(true);
    return () => {
      setIsModalActive(false);
    };
  }, [setIsModalActive]);

  const {
    data: catDetail,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['catDetail', catId],
    queryFn: () => getCatDetail(catId as number),
    enabled: !!catId && !isNaN(catId)
  });

  if (isLoading) {
    return (
      <div
        className={`fixed left-1/2 top-0 z-50 flex h-screen w-full max-w-[640px] -translate-x-1/2 items-center justify-center overflow-y-auto bg-gr-white ${animationClasses}`}
      >
        <div>로딩 중...</div>
      </div>
    );
  }

  if (isError) {
    console.error('고양이 상세 정보 조회 오류:', error);
    return (
      <div
        className={`fixed left-1/2 top-0 z-50 h-screen w-full max-w-[640px] -translate-x-1/2 overflow-y-auto bg-gr-white ${animationClasses}`}
      >
        <button onClick={animatedClose}>닫기</button>
        <div className="pt-14 text-center">
          고양이 정보를 불러오는 중 오류가 발생했습니다.
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed left-1/2 top-0 z-50 h-screen w-full max-w-[640px] -translate-x-1/2 overflow-y-auto bg-gr-white ${animationClasses}`}
    >
      <CatInfo
        setPrev={animatedClose}
        setStep={animatedClose}
        catData={catDetail}
        type="edit"
      />
    </div>
  );
}
