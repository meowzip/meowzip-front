'use client';

import { CatListObj } from '@/types/cat';
import ZipCard from '@/components/zip/ZipCard';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import ZipSkeleton from '@/components/zip/ZipSkeleton';
import ZipEmptyState from '@/components/zip/ZipEmptyState';
import { useInView } from 'react-intersection-observer';
import useInfiniteCats from '@/hooks/diary/useInfiniteCats';

const ZipPage = () => {
  const router = useRouter();

  const { ref: catsRef, inView: catsInView } = useInView({
    threshold: 0.1,
    rootMargin: '100px'
  });

  const [, setSelectedModalId] = useState<number | null>(null);

  const { catList, isCatsLoading, isCatListError, catListError } =
    useInfiniteCats(catsInView);

  const openDetailModal = useCallback(
    (item: CatListObj) => {
      setSelectedModalId(item.id || null);
      router.push(`/zip/${item.id}`);
    },
    [router]
  );

  if (isCatListError) throw catListError;

  return (
    <div className="mx-auto h-screen w-full max-w-[640px] bg-gr-50">
      <h1 className="flex h-12 w-full items-center bg-gr-white px-4 text-heading-3 text-gr-900">
        모음집
      </h1>
      <div className="bg-gr-50">
        <section className="p-4 px-4 pb-28">
          {isCatsLoading ? (
            <div className="grid grid-cols-2 gap-4">
              <ZipSkeleton />
            </div>
          ) : catList?.pages[0]?.items?.length === 0 ? (
            <ZipEmptyState />
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {catList?.pages?.map(page =>
                page?.items?.map((cat: CatListObj) => (
                  <ZipCard
                    key={cat.id}
                    {...cat}
                    onClick={() => openDetailModal(cat)}
                  />
                ))
              )}
            </div>
          )}
          {/* 무한 스크롤 감지 영역 */}
          {!isCatsLoading && (
            <div ref={catsRef} className="h-20 bg-transparent" />
          )}
        </section>
      </div>
    </div>
  );
};

export default ZipPage;
