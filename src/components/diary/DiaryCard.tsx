'use client';

import Carousel from '../ui/Carousel';
import Label from '../ui/Label';
import Profile from '../ui/Profile';

interface DiaryCardProps {
  images: string[];
  labels: {
    type: 'default' | 'text' | 'icon';
    content?: string;
    icon?: string;
  }[];
  content: string;
  profiles: {
    key: string;
    src: string;
    style: string;
  }[];
}

const DiaryCard = ({ images, labels, content, profiles }: DiaryCardProps) => {
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
    <>
      <section className="flex h-[300px] gap-2">
        <Carousel images={images} />
      </section>
      <section>
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
          <div className="mb-1 text-body-3 text-gr-black">{content}</div>
          <div className="flex justify-start">
            <button className="text-body-3 text-gr-300">더보기</button>
          </div>
        </article>
      </section>
      <section className="flex justify-between">
        <Profile items={profiles} lastLeft="left-[100px]" />
        <article className="text-body-4 text-gr-500">
          아이디 • {formatTime(new Date())}
        </article>
      </section>
    </>
  );
};

export default DiaryCard;
