'use client';

import { useState } from 'react';
import Carousel from '../ui/Carousel';
import Label from '../ui/Label';
import Profile from '../ui/Profile';
import { DiaryPageProps } from '@/app/diary/diaryType';

interface DiaryCardProps extends DiaryPageProps {
  onClick: () => void;
}

const DiaryCard = ({
  images,
  labels,
  content,
  profiles,
  onClick
}: DiaryCardProps) => {
  const [showMore, setShowMore] = useState(false);

  /**
   * @description 시간 포맷
   * @returns 오후/오전 HH:MM
   */
  const formatTime = (date: Date): string => {
    let hours: number = date.getHours();
    let hoursIn12HourFormat: string = (hours % 12 || 12).toString();
    hoursIn12HourFormat = ('0' + hoursIn12HourFormat).slice(-2);

    let minutes: string = date.getMinutes().toString();
    minutes = ('0' + minutes).slice(-2);

    let ampm: string = hours >= 12 ? '오후' : '오전';

    let formattedTime: string = `${ampm} ${hoursIn12HourFormat}:${minutes}`;
    return formattedTime;
  };

  return (
    <div className="mb-4 rounded-16 bg-gr-white" onClick={onClick}>
      {images && images?.length > 0 && (
        <section className="flex h-[300px] gap-2">
          <Carousel images={images} style="rounded-t-2xl" />
        </section>
      )}
      <section className="p-4">
        <article className="mb-2 flex items-center justify-start gap-1">
          {labels.map((label, index) => (
            <Label
              key={index}
              type={label.type}
              content={label.content}
              icon={label.icon}
            />
          ))}
        </article>
        <article className="mb-2">
          <div
            className={`mb-1 text-body-3 text-gr-black ${
              showMore ? 'line-clamp-0' : 'line-clamp-3'
            }`}
          >
            {content}
          </div>
          <div className="flex justify-start">
            <button
              className="text-body-3 text-gr-300"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? '닫기' : '더보기'}
            </button>
          </div>
        </article>
        <article className="flex h-6 items-center justify-between">
          <div className="relative">
            <Profile items={profiles} lastLeft="left-[100px]" />
          </div>
          <h5 className="text-body-4 text-gr-500">
            아이디 • {formatTime(new Date())}
          </h5>
        </article>
      </section>
    </div>
  );
};

export default DiaryCard;
