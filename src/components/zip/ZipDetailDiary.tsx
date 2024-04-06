'use client';

import { DiaryObj } from '@/app/diary/diaryType';
import Carousel from '@/components/ui/Carousel';
import Label from '@/components/ui/Label';
import React from 'react';

const ZipDetailDiary = ({ ...props }: DiaryObj) => {
  return (
    <div className="border-b border-gr-50 py-[14px] last:border-0">
      <section className="flex flex-row gap-1">
        {props.isFeed && (
          <Label.Text
            content="🐟 사료"
            className="w-fit rounded-md bg-gr-50 px-[6px] pb-1 pt-[5px]"
          />
        )}
        {props.isGivenWater && (
          <Label.Text
            content="💧 물"
            className="rounded-md bg-gr-50 px-[6px] pb-1 pt-[5px]"
          />
        )}
      </section>
      <section className="flex justify-between gap-[10px] pt-2">
        <div>
          <p className="line-clamp-4 text-body-3 text-gr-black">
            {props.content}
          </p>
          <p className="pt-[6px] text-btn-3 text-gr-400">{props.caredTime}</p>
        </div>
        <div className="w-[90px]">
          {props.images && (
            <Carousel images={props.images} style="rounded-lg" />
          )}
        </div>
      </section>
    </div>
  );
};

export default ZipDetailDiary;
