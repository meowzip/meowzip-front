'use client';

import DiaryCard from './DiaryCard';
import DiarySkeleton from './DiarySkeleton';
import DiaryEmptyState from './DiaryEmptyState';
import { DiaryObj } from '@/app/diary/diaryType';
import { InfiniteQueryResponse } from '@/types/infiniteListType';

interface DiaryListProps {
  diaryList: InfiniteQueryResponse<DiaryObj>;
  isLoading: boolean;
  diaryRef: (node?: Element | null) => void;
  onClick: (id: number) => void;
}

const DiaryList = ({
  diaryList,
  isLoading,
  diaryRef,
  onClick
}: DiaryListProps) => {
  return (
    <section className="mx-auto max-w-[640px] p-4">
      {isLoading ? (
        <div className="flex flex-col gap-4">
          <DiarySkeleton />
        </div>
      ) : diaryList?.pages[0]?.items?.length === 0 ? (
        <DiaryEmptyState />
      ) : (
        diaryList?.pages?.map(page =>
          page?.items?.map((diary: DiaryObj) => (
            <DiaryCard
              key={diary.id}
              {...diary}
              onClick={() => onClick(diary.id)}
            />
          ))
        )
      )}
      <div ref={diaryRef} className="h-20 bg-transparent" />
    </section>
  );
};

export default DiaryList;
