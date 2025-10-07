'use client';

import { Fragment, useEffect, useState, useCallback } from 'react';
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
  const [deletingFeedId, setDeletingFeedId] = useState<number | null>(null);

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
      return (lastPage as any).hasNext ? allPages.length + 1 : undefined;
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

  const handleDeleteWithAnimation = (feedToDelete: FeedType) => {
    setDeletingFeedId(feedToDelete.id);
    setEditBottomSheet(false);

    setTimeout(() => {
      deleteFeed(feedToDelete);
      setDeletingFeedId(null);
    }, 300);
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
        <Fragment key={pageIndex}>
          {(page as any)?.items.map((feed: FeedType) => (
            <div
              key={feed.id}
              className={`transition-all duration-500 ease-out ${
                deletingFeedId === feed.id
                  ? '-translate-y-2 transform opacity-0'
                  : 'translate-y-0 transform opacity-100'
              }`}
            >
              <FeedCard
                content={feed}
                goToDetail={() => {
                  router.push(`/community/${feed.id}`);
                }}
                openBottomSheet={() => {
                  setFeed(feed);
                  setEditBottomSheet(true);
                }}
                toggleLikeFeed={() => toggleLikeFeed(feed)}
                toggleBookmark={() => toggleBookmark(feed)}
                hasUserArea
              />
            </div>
          ))}
        </Fragment>
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
        onDelete={() => feed && handleDeleteWithAnimation(feed)}
        onEdit={() => {
          if (feed && feed.id) {
            router.push(`/community/write?edit=${feed.id}`);
          } else {
            console.warn('피드 ID가 없어 수정할 수 없습니다:', feed);
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
