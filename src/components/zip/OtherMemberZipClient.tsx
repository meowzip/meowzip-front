'use client';

import { CatListObj } from '@/types/cat';
import { useRouter } from 'next/navigation';
import ZipCard from '@/components/zip/ZipCard';
import { useInView } from 'react-intersection-observer';
import { useEffect, useCallback } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getCatsOnServer } from '@/services/cat';
import Topbar from '@/components/ui/Topbar';
import { PageResponse } from '@/types/infiniteListType';

interface OtherMemberZipClientProps {
  memberId: number;
  memberName: string;
  initialCatsData: PageResponse<CatListObj>;
}

const OtherMemberZipClient = ({
  memberId,
  memberName,
  initialCatsData
}: OtherMemberZipClientProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();

  useEffect(() => {
    queryClient.setQueryData(['getCats', memberId], {
      pages: [initialCatsData],
      pageParams: [1]
    });
  }, [initialCatsData, memberId, queryClient]);

  const {
    data: catList,
    fetchNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery({
    queryKey: ['getCats', memberId],
    queryFn: ({ pageParam = 1 }) =>
      getCatsOnServer({
        page: pageParam,
        size: 10,
        memberId
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 0
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const openDetailModal = useCallback(
    (item: CatListObj) => {
      router.push(`/zip/${item.id}`);
    },
    [router]
  );

  if (isError) throw error;

  return (
    <div className="fixed left-0 top-0 z-[50] h-screen w-full overflow-y-auto bg-gr-50">
      <Topbar type="three">
        <Topbar.Back onClick={() => router.back()} />
        <Topbar.Title title={`${memberName} 모음집`} />
        <Topbar.Empty />
      </Topbar>
      <section className="pb-30 h-screen bg-gr-50 px-4 pt-16">
        <div className="grid grid-cols-2 gap-4 pb-28">
          {catList?.pages?.map(page =>
            page?.items?.map((cat: CatListObj) => (
              <ZipCard
                key={cat.id}
                {...cat}
                onClick={() => openDetailModal(cat)}
              />
            ))
          )}
          {/* 무한 스크롤 감지 영역 */}
          <div ref={ref} className="h-20 bg-transparent" />
        </div>
      </section>
    </div>
  );
};

export default OtherMemberZipClient;
