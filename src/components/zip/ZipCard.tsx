'use client';

import { CatListObj } from '@/app/zip/catType';
import Label from '@/components/ui/Label';
import React from 'react';

interface ZipCardProps extends CatListObj {
  onClick: () => void;
}

const ZipCard = ({
  imageUrl,
  name,
  isCoParented,
  coParentedCount,
  dDay,
  sex,
  isNeutered,
  onClick
}: ZipCardProps) => {
  return (
    <div className="relative" onClick={onClick}>
      <div className="absolute right-0 top-0 flex items-center gap-1 p-[5px]">
        {isNeutered && (
          <Label.Text
            className="bg-gr-transparent-white text-gr-800"
            content="TNR"
          />
        )}
        {isCoParented && (
          <Label.Default
            className="bg-gr-transparent-black text-gr-white"
            src="/images/icons/share.svg"
            content={coParentedCount.toString()}
          />
        )}
      </div>
      <img
        src={imageUrl}
        alt="cat-image"
        className="h-[200px] rounded-t-lg object-cover"
      />
      <div className="rounded-b-lg bg-gr-white px-4 pb-4 pt-3">
        <div className="flex gap-1 pb-[6px]">
          <p className="text-heading-5 text-gr-900">{name}</p>
          <div className="rounded-full bg-[#FFF2F1]">
            <img
              src={`/images/icons/gender-${sex}.svg`}
              alt="tag cat"
              className={`rounded-full ${
                sex === 'F' ? 'bg-[#FFF2F1]' : 'bg-[#ECF5FF]'
              }`}
            />
          </div>
        </div>
        <p className="text-btn-3 text-gr-600">만난지 {dDay}일</p>
      </div>
    </div>
  );
};

export default ZipCard;
