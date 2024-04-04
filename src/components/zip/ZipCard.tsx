import Label from '@/components/ui/Label';
import React from 'react';

const ZipCard = () => {
  return (
    <div className="w-1/2">
      <img
        src="https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg"
        alt="cat-image"
        className="h-[200px] rounded-t-lg object-cover"
      />
      <div className="rounded-b-lg bg-gr-white px-4 pb-4 pt-3">
        <div className="flex gap-1 pb-[6px]">
          <p className="text-heading-5 text-gr-900">name</p>
          <div className="rounded-full bg-[#FFF2F1]">
            <img src="/images/icons/gender-female.svg" alt="gender" />
          </div>
        </div>
        <p>만난지 100일</p>
      </div>
    </div>
  );
};

export default ZipCard;
