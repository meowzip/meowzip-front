'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import DiaryWriteModal from '@/components/diary/DiaryWriteModal';
import { getDiaryDetail } from '@/services/diary';

const DiaryEditModalPage = ({ params: { id } }: { params: { id: number } }) => {
  const router = useRouter();

  const {
    data: diaryDetail,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['diaryDetail', id],
    queryFn: () => getDiaryDetail(id),
    staleTime: 0
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-50">
        <div className="rounded-lg bg-white p-4 shadow-xl">
          <p>일지 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (isError || !diaryDetail) {
    console.error('일지 상세 정보를 불러오는데 실패했거나 데이터가 없습니다.');
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-50">
        <div className="rounded-lg bg-white p-4 shadow-xl">
          <p>일지 정보를 불러오는 데 실패했습니다.</p>
          <button
            onClick={handleClose}
            className="mt-2 rounded bg-pr-500 px-3 py-1 text-white"
          >
            닫기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-screen w-full max-w-[640px] overflow-hidden bg-white">
        <DiaryWriteModal
          onClose={handleClose}
          id={diaryDetail.id}
          diaryDetail={diaryDetail}
        />
      </div>
    </div>
  );
};

export default DiaryEditModalPage;
