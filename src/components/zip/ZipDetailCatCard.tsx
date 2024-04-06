import { CatBaseType } from '@/app/zip/catType';
import Label from '@/components/ui/Label';
import Image from 'next/image';
import React from 'react';

const ZipDetailCatCard = ({ ...props }: CatBaseType) => {
  return (
    <div className="px-6">
      <div className="flex flex-col items-center justify-center gap-1 pb-4 pt-2">
        <h1 className="text-heading-1 text-gr-900">{props.name}</h1>
        <Label.Default
          className="rounded-[4px] bg-gr-50 py-1 pl-2 pr-[6px] text-gr-600"
          src="/images/icons/share.svg"
          content={`만난지 ${props.dDay}일`}
        />
      </div>
      <Image
        src={'https://github.com/shadcn.png'}
        width={375}
        height={240}
        className="rounded-xl object-cover"
        alt="cat-image"
      />
      <div className="pb-6 pt-4">
        <div className="flex items-center gap-2 py-[6px]">
          <h2 className="min-w-[60px] text-heading-5 text-gr-900">성별</h2>
          <div className="flex items-center gap-2 text-body-3 text-gr-700">
            <p>{props.sex}</p>
            <Label.Icon
              src={`/images/icons/gender-${props.sex}.svg`}
              className={`p-[2px] ${
                props.sex === 'F' ? 'bg-[#FFF2F1]' : 'bg-[#ECF5FF]'
              }`}
            >
              ❤️
            </Label.Icon>
          </div>
        </div>
        <div className="flex gap-1 py-[6px]">
          <h2 className="min-w-[60px] text-heading-5 text-gr-900">만난 날</h2>
          <p className="text-body-3 text-gr-700">{'2023년 12월 25일'}</p>
        </div>
        <div className="flex gap-1 py-[6px]">
          <h2 className="min-w-[60px] text-heading-5 text-gr-900">중성화</h2>
          <p className="text-body-3 text-gr-700">
            {props.isNeutered === 'Y' ? '완료' : '모름'}
          </p>
        </div>
        <div className="flex gap-1 py-[6px]">
          <h2 className="min-w-[60px] text-heading-5 text-gr-900">특징</h2>
          <p className="text-body-3 text-gr-700">
            사람 좋아해서 졸졸 쫒아다니는 호기심 많은 아깽이 (제리아파트
            급식소에 어미와 함께 자주 출몰함)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ZipDetailCatCard;
