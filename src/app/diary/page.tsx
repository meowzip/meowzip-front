'use client';

import { useState, useEffect } from 'react';
import DiaryCard from '@/components/diary/DiaryCard';
import Filter from '@/components/diary/Filter';
import DiaryListLayout from '@/components/diary/DiaryListLayout';
import DiaryDetailModal from '@/components/diary/DiaryDetailModal';
import DiaryWriteModal from '@/components/diary/DiaryWriteModal';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import { DiaryPageProps } from './diaryType';
import { useDiaries } from '@/hooks/useDiaries';
import { dateToString } from '@/utils/common';
import { useAtom } from 'jotai';
import { diaryDateAtom } from '@/atoms/diaryAtom';
// const mockup = [
//   {
//     pk: 1,
//     images: [
//       'https://www.petmd.com/sites/default/files/petmd-cat-happy-13.jpg',
//       'https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg',
//       'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg'
//     ],
//     labels: [
//       {
//         type: 'default' as const,
//         content: '사료',
//         icon: 'https://nemo-erp-dev.s3.ap-northeast-2.amazonaws.com/bus/image/home.svg'
//       },
//       {
//         type: 'default' as const,
//         content: '물',
//         icon: 'https://nemo-erp-dev.s3.ap-northeast-2.amazonaws.com/bus/image/home.svg'
//       }
//     ],
//     content:
//       '오늘도 먼지는 귀엽다냥 🧡 내용이 길어도 세 줄까지만 보여짐 냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥냥',
//     profiles: [
//       {
//         id: '1',
//         image: 'https://github.com/shadcn.png',
//         style: 'w-6 h-6 absolute border border-gr-white',
//         name: '식빵이',
//         gender: 'female' as const
//       },
//       {
//         id: '2',
//         image: 'https://github.com/shadcn.png',
//         style: 'w-6 h-6 absolute left-[20px] border border-gr-white',
//         name: '콩이',
//         gender: 'male' as const
//       },
//       {
//         id: '3',
//         image: 'https://github.com/shadcn.png',
//         style: 'w-6 h-6 absolute left-[40px] border border-gr-white',
//         name: '백설이',
//         gender: 'female' as const
//       }
//     ]
//   }
// ];

const DiaryPage = () => {
  const [diaryDate] = useAtom(diaryDateAtom);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState<DiaryPageProps>(
    {} as DiaryPageProps
  );

  const openDetailModal = (item: DiaryPageProps) => {
    console.log('item', item);
    setSelectedModal(item);
    setShowDetailModal(true);
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

  useEffect(() => {}, [diaryDate]);
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

      {showDetailModal && (
        <DiaryDetailModal
          id={selectedModal.id}
          images={selectedModal.images}
          labels={selectedModal.labels}
          content={selectedModal.content}
          profiles={selectedModal.profiles}
          onClose={() => setShowDetailModal(false)}
          memberId={selectedModal.memberId}
        />
      )}
      {showWriteModal && (
        <DiaryWriteModal onClose={() => setShowWriteModal(false)} />
      )}
    </>
  );
};

export default DiaryPage;
