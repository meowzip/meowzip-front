'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { isModalActiveAtom } from '@/store/modalAtom';
import FeedWriteModal from '@/components/community/FeedWriteModal';
import { useQuery } from '@tanstack/react-query';
import { getFeedDetail } from '@/services/community';
import Topbar from '@/components/ui/Topbar';
import FeedWriteModalSkeleton from '@/components/community/FeedWriteModalSkeleton';
import { useModalAnimation } from '@/hooks/useModalAnimation';

export default function InterceptedDiaryWriteModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setIsModalActive = useSetAtom(isModalActiveAtom);
  const { handleClose: animatedClose, animationClasses } = useModalAnimation();

  const editId = searchParams.get('edit');
  const feedId = editId ? parseInt(editId, 10) : undefined;

  useEffect(() => {
    setIsModalActive(true);
    return () => {
      setIsModalActive(false);
    };
  }, [setIsModalActive]);

  const {
    data: feedDetail,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['feedDetail', feedId],
    queryFn: () => getFeedDetail(feedId as number),
    enabled: !!feedId && !isNaN(feedId),
    staleTime: 5 * 60 * 1000
  });

  if (isLoading && feedId) {
    return (
      <div
        className={`fixed left-1/2 top-0 z-50 h-screen w-full max-w-[640px] -translate-x-1/2 overflow-y-auto bg-gr-white ${animationClasses}`}
      >
        <FeedWriteModalSkeleton />
      </div>
    );
  }

  if (isError) {
    console.error('피드 상세 정보 조회 오류:', error);
    return (
      <div
        className={`fixed left-1/2 top-0 z-50 h-screen w-full max-w-[640px] -translate-x-1/2 overflow-y-auto bg-gr-white ${animationClasses}`}
      >
        <Topbar type="one">
          <Topbar.Back onClick={animatedClose} />
          <Topbar.Title title="오류" />
        </Topbar>
        <div className="pt-14 text-center">
          피드 정보를 불러오는 중 오류가 발생했습니다.
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed left-1/2 top-0 z-50 h-screen w-full max-w-[640px] -translate-x-1/2 overflow-y-auto bg-gr-white ${animationClasses}`}
    >
      <FeedWriteModal onClose={animatedClose} feedDetail={feedDetail} />
    </div>
  );
}
