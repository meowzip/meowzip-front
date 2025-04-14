'use client';

import { useState, useEffect } from 'react';
import DiaryCard from '@/components/diary/DiaryCard';
import Filter from '@/components/diary/Filter';
import DiaryListLayout from '@/components/diary/DiaryListLayout';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import { DiaryObj } from './diaryType';
import { dateToString } from '@/utils/common';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { diaryDateAtom } from '@/store/diaryAtom';
import {
  useQueryClient,
  useInfiniteQuery,
  useMutation
} from '@tanstack/react-query';
import { getCatsOnServer } from '@/services/cat';
import DiaryEmptyState from '@/components/diary/DiaryEmptyState';
import DiarySkeleton from '@/components/diary/DiarySkeleton';
import FilterSkeleton from '@/components/diary/FilterSkeleton';
import CatRegisterBtn from '@/components/diary/CatRegisterBtn';
import { useInView } from 'react-intersection-observer';
import { getDiaries } from '@/services/diary';
import { togglePushNotificationOnServer } from '@/services/push-notification';

const DiaryPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { ref: catsRef, inView: catsInView } = useInView();
  const { ref: diaryRef, inView: diaryInView } = useInView();

  const [diaryDate] = useAtom(diaryDateAtom);
  const [, setSelectedModal] = useState({} as DiaryObj);
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);

  const handleCatSelect = (id: number) => {
    setSelectedCatId(id === selectedCatId ? null : id);
  };

  const openDetailModal = (item: DiaryObj) => {
    setSelectedModal(item);
    router.push(`/diary/${item.id}`);
  };

  const {
    data: catList,
    isLoading: isCatsLoading,
    fetchNextPage: fetchNextPageCats,
    isError: isCatListError,
    error: catListError
  } = useInfiniteQuery({
    queryKey: ['getCats'],
    queryFn: ({ pageParam = 1 }) =>
      getCatsOnServer({
        page: pageParam,
        size: 10
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 0
  });
  useEffect(() => {
    if (catsInView) {
      fetchNextPageCats();
    }
  }, [catsInView, fetchNextPageCats]);

  const {
    data: diaryList,
    isLoading: isDiaryLoading,
    fetchNextPage: fetchNextPageDiary,
    isError: isDiaryListError,
    error: diaryListError
  } = useInfiniteQuery({
    queryKey: ['diaries', dateToString(diaryDate), selectedCatId],
    queryFn: ({ pageParam = 1 }) => {
      const params: {
        date: string;
        page: number;
        size: number;
        'cat-id'?: number;
      } = {
        date: dateToString(diaryDate),
        page: pageParam,
        size: 10
      };
      if (selectedCatId) {
        params['cat-id'] = selectedCatId;
      }
      return getDiaries(params);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 0
  });
  useEffect(() => {
    if (diaryInView) {
      fetchNextPageDiary();
    }
  }, [diaryInView, fetchNextPageDiary]);

  if (isCatListError) throw catListError;
  if (isDiaryListError) throw diaryListError;

  const togglePushNotification = useMutation({
    mutationFn: () => togglePushNotificationOnServer(),
    onSuccess: (data: any) => {
      if (data.status !== 'OK') {
        console.error('data.status:', data.status);
      } else {
        queryClient.invalidateQueries({ queryKey: ['getPushNoti'] });
      }
    }
  });
  const allowNotify = () => {
    togglePushNotification.mutate();
  };
  const disallowNotify = () => {
    togglePushNotification.mutate();
  };

  return (
    <>
      <DiaryListLayout>
        <section className="flex h-28 justify-start overflow-scroll bg-gr-white px-2 scrollbar-hide">
          {isCatsLoading ? (
            <FilterSkeleton />
          ) : catList?.pages[0]?.items?.length === 0 ? (
            <Link href="/cat-register" scroll={false}>
              <CatRegisterBtn onClick={() => {}} />
            </Link>
          ) : (
            <>
              {catList?.pages.map(page =>
                page?.items?.map((cat: any) => (
                  <Filter
                    key={cat.id}
                    id={cat.id}
                    imageUrl={cat.imageUrl}
                    name={cat.name}
                    isSelected={selectedCatId === cat.id}
                    onClick={() => handleCatSelect(cat.id)}
                    coParentedCount={cat.coParentedCount}
                  />
                ))
              )}
              {/* 무한 스크롤 감지 영역 */}
              <div ref={catsRef} className="h-20 bg-transparent" />
              <Link href="/cat-register" scroll={false}>
                <CatRegisterBtn />
              </Link>
            </>
          )}
        </section>
        <section className="mx-auto max-w-[640px] p-4">
          {isDiaryLoading ? (
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
                  onClick={() => openDetailModal(diary)}
                />
              ))
            )
          )}
          {/* 무한 스크롤 감지 영역 */}
          <div ref={diaryRef} className="h-20 bg-transparent" />
        </section>
      </DiaryListLayout>

      <Link href="/diary/write" scroll={false}>
        <FloatingActionButton />
      </Link>
    </>
  );
};

export default DiaryPage;
