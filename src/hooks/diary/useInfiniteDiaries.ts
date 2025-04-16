import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getDiaries } from '@/services/diary';
import { InfiniteQueryResponse } from '@/types/infiniteListType';
import { DiaryObj } from '@/app/diary/diaryType';

interface Props {
  inView: boolean;
  date: string;
  selectedCatId: number | null;
}

const useInfiniteDiaries = ({ inView, date, selectedCatId }: Props) => {
  const {
    data: diaryList,
    isLoading: isDiaryLoading,
    fetchNextPage: fetchNextPageDiary,
    isError: isDiaryListError,
    error: diaryListError
  } = useInfiniteQuery({
    queryKey: ['diaries', date, selectedCatId],
    queryFn: ({ pageParam = 1 }) => {
      const params: {
        date: string;
        page: number;
        size: number;
        'cat-id'?: number;
      } = {
        date,
        page: pageParam,
        size: 10
      };
      if (selectedCatId) {
        params['cat-id'] = selectedCatId;
      }
      return getDiaries(params);
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    staleTime: 0
  });

  useEffect(() => {
    if (inView) {
      fetchNextPageDiary();
    }
  }, [inView, fetchNextPageDiary]);

  return {
    diaryList: diaryList as InfiniteQueryResponse<DiaryObj>,
    isDiaryLoading,
    fetchNextPageDiary,
    isDiaryListError,
    diaryListError
  };
};

export default useInfiniteDiaries;
