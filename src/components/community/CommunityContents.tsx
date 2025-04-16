'use client';

import React, { useEffect, useState } from 'react';
import FeedCard from '../../components/community/FeedCard';
import MoreBtnBottomSheet from '@/components/community/MoreBtnBottomSheet';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFeedsOnServer } from '@/services/community';
import { FeedType } from '@/types/communityType';
import { useRouter } from 'next/navigation';
import useFeedMutations from '@/hooks/community/useFeedMutations';
import CommunitySkeleton from '@/components/community/CommunitySkeleton';
import { useInView } from 'react-intersection-observer';

const CommunityContents = () => {
  const router = useRouter();
  const { ref, inView } = useInView();

  const [editBottomSheet, setEditBottomSheet] = useState(false);
  const [feed, setFeed] = useState<FeedType>();

  const {
    data: feedList,
    isLoading,
    fetchNextPage,
    isError,
    error,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['feeds'],
    queryFn: ({ pageParam = 1 }) =>
      getFeedsOnServer({
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
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetchingNextPage]);

  const { deleteFeed, blockFeed, reportFeed, toggleLikeFeed, toggleBookmark } =
    useFeedMutations(['feeds']);

  if (isError) {
    console.error('Error fetching feeds:', error);
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  const handleNewWrite = () => {
    router.push('/community/write');
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[640px] bg-gr-white pb-24">
        <CommunitySkeleton />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[640px] bg-gr-white pb-24">
      {feedList?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page?.items?.map((feed: FeedType) => (
            <FeedCard
              key={feed.id}
              content={feed}
              goToDetail={() => router.push(`/community/${feed.id}`)}
              openBottomSheet={() => {
                setFeed(feed);
                setEditBottomSheet(true);
              }}
              toggleLikeFeed={() => toggleLikeFeed(feed)}
              toggleBookmark={() => toggleBookmark(feed)}
              hasUserArea
            />
          ))}
        </React.Fragment>
      ))}
      <div ref={ref} className="h-20 bg-transparent" />
      {isFetchingNextPage && <CommunitySkeleton />}
      <MoreBtnBottomSheet
        type="feed"
        isVisible={editBottomSheet}
        setIsVisible={() => setEditBottomSheet(!editBottomSheet)}
        heightPercent={['50%', '40%']}
        name={feed?.writerNickname}
        memberId={feed?.writerId}
        onDelete={() => feed && deleteFeed(feed)}
        onEdit={() => {
          if (feed) {
            router.push(`/community/write?edit=${feed.id}`);
          }
        }}
        onBlock={() => feed && blockFeed(feed)}
        onReport={() => feed && reportFeed(feed)}
        showWriteModal={handleNewWrite}
      />
    </div>
  );
};

export default CommunityContents;
