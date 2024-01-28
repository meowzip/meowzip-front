'use client';

import React from 'react';
import Topbar from '@/components/ui/Topbar';
import Carousel from '@/components/ui/Carousel';
import Label from '@/components/ui/Label';
import { DiaryPageProps } from '@/app/diary/diaryType';

interface DiaryDetailModalProps extends DiaryPageProps {
  onClose: () => void;
}

const DiaryDetailModal = ({
  images,
  labels,
  content,
  profiles,
  onClose
}: DiaryDetailModalProps) => {
  return (
    <div className="fixed left-0 top-0 z-10 h-screen overflow-y-auto bg-gr-white">
      <Topbar type="modal" title="날짜 props" onClose={onClose} />
      <section className="flex flex-col gap-4 border-b border-gr-100 px-4 pb-8 pt-4">
        <h5 className="text-end text-body-4 text-gr-500">아이디 • 7시간 전</h5>
        <div className="flex h-[300px] w-[90vw]">
          {images && <Carousel images={images} style="rounded-16" />}
        </div>
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
        {profiles.map(cat => (
          <article key={cat.id} className="flex items-center gap-4 py-2">
            <img
              src={cat.image}
              alt="cat-image"
              className="h-12 w-12 rounded-full"
            />
            <div className="flex items-center gap-2">
              <h4 className="text-body-3 text-gr-900">{cat.name}</h4>
              <img
                src={`/images/icons/gender-${cat.gender}.svg`}
                alt=""
                className={`rounded-full ${
                  cat.gender === 'female' ? 'bg-[#FFF2F1]' : 'bg-[#ECF5FF]'
                }`}
              />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default DiaryDetailModal;
