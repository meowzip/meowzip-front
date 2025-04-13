'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { isModalActiveAtom } from '@/store/modalAtom';
import CatInfo from '@/components/zip/CatInfo';
import { useQuery } from '@tanstack/react-query';
import { getCatDetail } from '@/services/cat';

export default function InterceptedCatEditModal() {
  const router = useRouter();
  const params = useParams(); // useParams 훅 사용
  const setIsModalActive = useSetAtom(isModalActiveAtom);

  const catId = params.id ? parseInt(params.id as string, 10) : undefined;

  console.log(catId, 'catId');
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
  console.log(catDetail, 'catDetail');

  const handleClose = () => {
    router.back();
  };

  // 로딩 상태 처리 추가
  if (isLoading) {
    // TODO: 스켈레톤 컴포넌트 사용 또는 임시 로딩 UI
    return (
      <div className="bg-gr-white/80 fixed left-0 top-0 z-20 flex h-screen w-full items-center justify-center overflow-y-auto">
        {/* <CatInfoSkeleton /> */}
        <div>로딩 중...</div>
      </div>
    );
  }

  // 에러 상태 처리 추가
  if (isError) {
    console.error('고양이 상세 정보 조회 오류:', error);
    // TODO: 에러 UI 개선
    return (
      <div className="fixed left-0 top-0 z-20 h-screen w-full overflow-y-auto bg-gr-white">
        {/* <Topbar><Topbar.Back onClick={handleClose}/>...</Topbar> */}
        <button onClick={handleClose}>닫기</button>
        <div className="pt-14 text-center">
          고양이 정보를 불러오는 중 오류가 발생했습니다.
        </div>
      </div>
    );
  }

  return (
    <CatInfo
      setPrev={handleClose}
      setStep={handleClose}
      catData={catDetail}
      type="edit"
    />
  );
}
