'use client';

import { DiaryPageProps } from '@/app/diary/diaryType';
import Carousel from '@/components/ui/Carousel';
import Label from '@/components/ui/Label';
import React from 'react';

const ZipDiary = ({
  images,
  content,
  isFeed,
  isGivenWater
}: DiaryPageProps) => {
  return (
    <div className="py-[14px]">
      <section>
        {isFeed && (
          <Label.Text
            content="🐟 사료"
            className="rounded-md bg-gr-50 px-[6px] pb-1 pt-[5px]"
          />
        )}
        {isGivenWater && (
          <Label.Text
            content="💧 물"
            className="rounded-md bg-gr-50 px-[6px] pb-1 pt-[5px]"
          />
        )}
      </section>
      <section>
        <div>
          <p>{content}</p>
          <p>24.01.23 오전 09:00</p>
        </div>
        {images && <Carousel images={images} style="rounded-lg" />}
      </section>
    </div>
  );
};

export default ZipDiary;
