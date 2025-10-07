'use client';

import React, { useEffect, useRef, useState } from 'react';
import UserArea from '../feed/UserArea';
import Carousel from '@/components/ui/Carousel';
import ButtonArea from '@/components/community/feed/ButtonArea';
import { FeedType } from '@/types/communityType';
import { DEFAULT_PROFILE_IMAGE_SRC } from '@/constants/general';

interface FeedDetailContentProps {
  feedDetail: FeedType;
  onOpenBottomSheet: () => void;
  onToggleLike: () => void;
  onToggleBookmark: () => void;
}

const FeedDetailContent = ({
  feedDetail,
  onOpenBottomSheet,
  onToggleLike,
  onToggleBookmark
}: FeedDetailContentProps) => {
  const [showMore, setShowMore] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsClamped(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }, [feedDetail?.content]);

  const toggleContent = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowMore(!showMore);
  };

  return (
    <div className="border-b border-gr-100 bg-gr-white px-4 pt-4">
      <UserArea
        writerId={feedDetail?.writerId}
        nickname={feedDetail?.writerNickname}
        profile={feedDetail?.writerProfileImage || DEFAULT_PROFILE_IMAGE_SRC}
        createdAt={feedDetail?.createdAt}
        onClick={onOpenBottomSheet}
      />
      <section className="flex flex-col items-start gap-1">
        <p
          ref={contentRef}
          className={`w-full whitespace-pre-line pt-4 text-body-3 text-gr-black ${
            showMore ? 'line-clamp-none' : 'line-clamp-3'
          }`}
        >
          {feedDetail?.content}
        </p>
        {isClamped && (
          <button
            className="text-body-3 text-gr-300"
            onClick={e => toggleContent(e)}
          >
            {showMore ? '간략히' : '더보기'}
          </button>
        )}
      </section>
      {feedDetail?.images && feedDetail?.images?.length > 0 && (
        <section className="flex h-[300px] gap-2 pt-4">
          <Carousel images={feedDetail.images} style="rounded-b-lg" />
        </section>
      )}
      <ButtonArea
        like={feedDetail?.likeCount}
        isLiked={feedDetail?.isLiked}
        isBookmarked={feedDetail?.isBookmarked}
        comment={feedDetail?.commentCount}
        toggleLike={onToggleLike}
        toggleBookmark={onToggleBookmark}
        clickComment={() => {}}
      />
    </div>
  );
};

export default FeedDetailContent;
