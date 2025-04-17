'use client';

import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { diaryDateAtom } from '@/store/diaryAtom';
import { dateToString } from '@/utils/common';
import DiaryListLayout from '@/components/diary/DiaryListLayout';
import useInfiniteDiaries from '@/hooks/diary/useInfiniteDiaries';
import CatFilterList from '@/components/diary/CatFilterList';
import DiaryList from '@/components/diary/DiaryList';
import useInfiniteCats from '@/hooks/diary/useInfiniteCats';

const DiaryClient = () => {
  const router = useRouter();
  const { ref: catsRef, inView: catsInView } = useInView();
  const { ref: diaryRef, inView: diaryInView } = useInView();

  const [diaryDate] = useAtom(diaryDateAtom);
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);

  const { catList, isCatsLoading, isCatListError, catListError } =
    useInfiniteCats(catsInView);

  const { diaryList, isDiaryLoading, isDiaryListError, diaryListError } =
    useInfiniteDiaries({
      inView: diaryInView,
      date: dateToString(diaryDate),
      selectedCatId
    });

  const handleCatSelect = (id: number) => {
    setSelectedCatId(prev => (prev === id ? null : id));
  };

  const handleDiaryClick = (id: number) => {
    router.push(`/diary/${id}`);
  };

  if (isCatListError) throw catListError;
  if (isDiaryListError) throw diaryListError;

  return (
    <>
      <DiaryListLayout>
        <CatFilterList
          catList={catList}
          isLoading={isCatsLoading}
          selectedCatId={selectedCatId}
          onSelect={handleCatSelect}
          catsRef={catsRef}
        />
        <DiaryList
          diaryList={diaryList}
          isLoading={isDiaryLoading}
          diaryRef={diaryRef}
          onClick={handleDiaryClick}
        />
      </DiaryListLayout>
    </>
  );
};

export default DiaryClient;
