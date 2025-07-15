import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getCatsOnServer } from '@/services/cat';
import { InfiniteQueryResponse } from '@/types/infiniteListType';
import { CatListObj } from '@/types/cat';

const useInfiniteCats = (inView: boolean) => {
  const {
    data: catList,
    isLoading: isCatsLoading,
    fetchNextPage: fetchNextPageCats,
    isError: isCatListError,
    error: catListError
  } = useInfiniteQuery({
    queryKey: ['getCats'],
    queryFn: ({ pageParam = 1 }) =>
      getCatsOnServer({ page: pageParam, size: 10 }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    staleTime: 0
  });

  useEffect(() => {
    if (inView) {
      fetchNextPageCats();
    }
  }, [inView, fetchNextPageCats]);

  return {
    catList: catList as InfiniteQueryResponse<CatListObj>,
    isCatsLoading,
    fetchNextPageCats,
    isCatListError,
    catListError
  };
};

export default useInfiniteCats;
