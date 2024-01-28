'use client';

import React, { useState } from 'react';
import UserArea from './feed/UserArea';
import Carousel from '@/components/ui/Carousel';
import ButtonArea from '@/components/community/feed/ButtonArea';

interface FeedCardProps {
  content: {
    profile: string;
    nickname: string;
    time: string;
    text: string;
    images: string[];
    like: number;
    comment: number;
  };
}

const FeedCard = ({ content }: FeedCardProps) => {
  const [showMore, setMore] = useState(false);

  const clickLike = () => {
    console.log('click like interaction');
  };

  const clickComment = () => {
    console.log('피드 상세로 이동');
  };

  const clickBookmark = () => {
    console.log('프로필의 저장한 글에 피드 저장');
  };

  return (
    <div className="border-b border-gr-100 px-4 pt-4">
      <UserArea nickname={content.nickname} profile={content.profile} />
      <section className="flex flex-col items-start gap-1">
        <p
          className={`pt-4 text-body-3 text-gr-black ${
            showMore ? 'line-clamp-none' : 'line-clamp-3'
          }`}
        >
          {content.text}
        </p>
        <button
          className="text-body-3 text-gr-300"
          onClick={() => setMore(!showMore)}
        >
          {showMore ? '간략히' : '더보기'}
        </button>
      </section>
      {content.images && content.images?.length > 0 && (
        <section className="flex h-[300px] gap-2 pt-4">
          <Carousel images={content.images} style="rounded-b-lg" />
        </section>
      )}
      <ButtonArea
        like={content.like}
        comment={content.comment}
        clickLike={clickLike}
        clickComment={clickComment}
        clickBookmark={clickBookmark}
      />
    </div>
  );
};

export default FeedCard;
