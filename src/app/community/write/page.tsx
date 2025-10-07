'use client';

export const dynamic = 'force-dynamic';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import { isModalActiveAtom } from '@/store/modalAtom';
import FeedWriteModal from '@/components/community/FeedWriteModal';
import { useQuery } from '@tanstack/react-query';
import { getFeedDetail } from '@/services/community';
import Topbar from '@/components/ui/Topbar';
import FeedWriteModalSkeleton from '@/components/community/FeedWriteModalSkeleton';

export default function DiaryWritePage() {
  const router = useRouter();
  const setIsModalActive = useSetAtom(isModalActiveAtom);

  const [isClient, setIsClient] = useState(false);
  const [feedId, setFeedId] = useState<number | undefined>(undefined);

  useEffect(() => {
    setIsClient(true);
    setIsModalActive(true);
    return () => {
      setIsModalActive(false);
    };
  }, [setIsModalActive]);

  useEffect(() => {
    if (isClient) {
      const searchParams = new URLSearchParams(window.location.search); // 표준 Web API 사용
      const editParam = searchParams.get('edit');
      const id = editParam ? parseInt(editParam, 10) : undefined;
      if (id && !isNaN(id)) {
        setFeedId(id);
      }
    }
  }, [isClient]);

  const {
    data: feedDetail,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['feedDetail', feedId],
    queryFn: () => {
      if (!feedId || isNaN(feedId)) {
        throw new Error('유효하지 않은 피드 ID입니다.');
      }
      return getFeedDetail(feedId);
    },
    enabled: isClient && typeof feedId === 'number' && !isNaN(feedId),
    staleTime: 0
  });

  const handleClose = () => {
    router.back();
  };

  if (!isClient) {
    return <FeedWriteModalSkeleton />;
  }

  if (isLoading && typeof feedId === 'number') {
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
