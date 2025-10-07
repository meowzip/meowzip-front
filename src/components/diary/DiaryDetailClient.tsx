'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import Topbar from '@/components/ui/Topbar';
import MoreBtnBottomSheet from '@/components/community/MoreBtnBottomSheet';
import { deleteDiaryOnServer, getDiaryDetail } from '@/services/diary';
import DiaryDetailContent from './DiaryDetailContent';

interface DiaryDetailClientProps {
  diaryDetail: any;
  id: number;
}

const DiaryDetailClient = ({
  diaryDetail: initialDiaryDetail,
  id
}: DiaryDetailClientProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [editBottomSheet, setEditBottomSheet] = useState(false);

  const { data: diaryDetail } = useQuery({
    queryKey: ['diaryDetail', id],
    queryFn: () => getDiaryDetail(id),
    initialData: initialDiaryDetail,
    staleTime: 5 * 60 * 1000
  });

  const deleteDiaryMutation = useMutation({
    mutationFn: (id: number) => deleteDiaryOnServer(id),
    onSuccess: (response: any) => {
      if (response.status === 'OK') {
        queryClient.removeQueries({
          predicate: query => query.queryKey[0] === 'diaries'
        });
        router.push('/diary');
      } else {
        console.error('일지 삭제 중 오류:', response.message);
      }
    },
    onError: (error: any) => {
      console.error('일지 삭제 중 오류:', error);
    }
  });

  const deleteDiary = useCallback(() => {
    deleteDiaryMutation.mutate(id);
  }, [deleteDiaryMutation, id]);

  return (
    <div className="relative mx-auto">
      <div className="fixed left-1/2 top-0 z-50 h-screen w-screen max-w-[640px] -translate-x-1/2 overflow-y-auto bg-gr-white">
        <Topbar type="two">
          <Topbar.Back onClick={() => router.back()} />
          <Topbar.Title title={diaryDetail?.caredDate} />
          <Topbar.More onClick={() => setEditBottomSheet(true)} />
        </Topbar>
        <DiaryDetailContent diaryDetail={diaryDetail} />
        <MoreBtnBottomSheet
          type="diary"
          isVisible={editBottomSheet}
          setIsVisible={() => setEditBottomSheet(!editBottomSheet)}
          heightPercent={['50%', '40%']}
          name={diaryDetail?.memberNickname}
          memberId={diaryDetail?.memberId}
          onDelete={deleteDiary}
          onEdit={() => router.push(`/diary/${id}/edit`)}
        />
      </div>
    </div>
  );
};

export default DiaryDetailClient;
