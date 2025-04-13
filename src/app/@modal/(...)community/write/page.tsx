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

export default function InterceptedDiaryWriteModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setIsModalActive = useSetAtom(isModalActiveAtom);

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
    staleTime: 1000 * 60 * 5
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading && feedId) {
    return <FeedWriteModalSkeleton />;
  }

  if (isError) {
    console.error('피드 상세 정보 조회 오류:', error);
    return (
      <div className="fixed left-0 top-0 z-20 h-screen w-full overflow-y-auto bg-gr-white">
        <Topbar type="one">
          <Topbar.Back onClick={handleClose} />
          <Topbar.Title title="오류" />
        </Topbar>
        <div className="pt-14 text-center">
          피드 정보를 불러오는 중 오류가 발생했습니다.
        </div>
      </div>
    );
  }

  return <FeedWriteModal onClose={handleClose} feedDetail={feedDetail} />;
}
