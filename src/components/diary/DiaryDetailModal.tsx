'use client';

import React from 'react';
import Topbar from '@/components/ui/Topbar';
import Carousel from '@/components/ui/Carousel';
import Label from '@/components/ui/Label';
import FemaleIcon from '../../../public/images/icons/gender-female.svg';
import MaleIcon from '../../../public/images/icons/gender-male.svg';

interface DiaryDetailModalProps {
  images?: string[];
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
    name: string;
    gender: 'female' | 'male';
  }[];
}

const DiaryDetailModal = ({
  images,
  labels,
  content,
  profiles
}: DiaryDetailModalProps) => {
  return (
    <div className="fixed left-0 top-0">
      <Topbar type="home" title="날짜 props" />
      <section className="flex flex-col gap-4 border-b border-gr-100 px-4 pb-8 pt-4">
        <h5 className="text-body-4 text-gr-500">아이디 • 7시간 전</h5>
        {images && <Carousel images={images} />}
        <h4 className="text-body-3 text-gr-black">{content}</h4>
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
      </section>
      <section className="px-4 pb-[120px] pt-4">
        <h3 className="py-3 text-heading-5 text-gr-900">
          태그된 고양이 <span className="text-pr-500">{5}</span>
        </h3>
        {profiles.map(item => (
          <article key={item.key} className="flex items-center gap-4 py-2">
            <img
              src={item.src}
              height={48}
              width={48}
              alt="cat-image"
              className="rounded-full"
            />
            <div className="flex items-center gap-2">
              <h4 className="text-body-3 text-gr-900">{item.name}</h4>
              <h5>{item.gender}</h5>
              <img
                src={`/images/icons/gender-${item.gender}.svg`}
                alt=""
                className="rounded-full bg-[#FFF2F1]"
              />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default DiaryDetailModal;
