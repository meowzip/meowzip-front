'use client';

import { useState, useEffect } from 'react';
import DiaryCard from '@/components/diary/DiaryCard';
import Filter from '@/components/diary/Filter';
import DiaryListLayout from '@/components/diary/DiaryListLayout';
import DiaryWriteModal from '@/components/diary/DiaryWriteModal';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import { DiaryPageProps } from './diaryType';
import { useDiaries } from '@/hooks/useDiaries';
import { dateToString } from '@/utils/common';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { diaryDateAtom } from '@/atoms/diaryAtom';
import { useQueryClient } from '@tanstack/react-query';

const DiaryPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [diaryDate] = useAtom(diaryDateAtom);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState<DiaryPageProps>(
    {} as DiaryPageProps
  );

  const openDetailModal = (item: DiaryPageProps) => {
    setSelectedModal(item);
    router.push(`/diary/${item.id}`);
  };

  const {
    data: diaryList,
    error,
    isLoading
  } = useDiaries({
    date: dateToString(diaryDate),
    page: 0,
    size: 10
  });

  useEffect(() => {
    if (showWriteModal) return;
    queryClient.invalidateQueries({ queryKey: ['diaries'] });
  }, [diaryDate, showWriteModal]);
  return (
    <>
      {!isLoading && (
        <DiaryListLayout>
          <section className="flex justify-start bg-gr-white">
            <Filter
              propObj={{
                id: '1',
                image: 'bg-gr-400',
                share: true,
                name: '전체보기'
              }}
            />
            <Filter
              propObj={{
                id: '1',
                image:
                  'https://i.natgeofe.com/k/ad9b542e-c4a0-4d0b-9147-da17121b4c98/MOmeow1_square.png',
                share: true,
                name: '식빵이'
              }}
            />
            <Filter
              propObj={{
                id: '2',
                image:
                  'https://i.natgeofe.com/k/ad9b542e-c4a0-4d0b-9147-da17121b4c98/MOmeow1_square.png',
                share: false,
                name: '꼬기'
              }}
            />
          </section>
          <section className="p-4">
            {!isLoading &&
              diaryList?.map((diary: DiaryPageProps, index: number) => (
                <DiaryCard
                  key={index}
                  id={diary.id}
                  images={diary.images}
                  labels={diary.labels}
                  content={diary.content}
                  profiles={diary.profiles}
                  onClick={() => openDetailModal(diary)}
                  memberId={selectedModal.memberId}
                />
              ))}
          </section>
        </DiaryListLayout>
      )}

      <FloatingActionButton onClick={() => setShowWriteModal(true)} />

      {showWriteModal && (
        <DiaryWriteModal
          onClose={() => setShowWriteModal(false)}
          id={selectedModal.id}
        />
      )}
    </>
  );
};

export default DiaryPage;
