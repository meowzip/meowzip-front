'use clinet';

import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';
import { Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

interface CarouselProps {
  images: string[];
  style?: string;
}

const Carousel: React.FC<CarouselProps> = ({ images, style }) => {
  const swiperRef = useRef<SwiperCore>();

  const params: SwiperOptions = {
    pagination: {
      el: '.fraction',
      type: 'custom',
      clickable: true,
      renderCustom: function (swiper, current, total) {
        return `
            ${current}/${total}`;
      }
    },
    spaceBetween: 30,
    modules: [Pagination]
  };

  const swiperPagination = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const swiperSlides = swiperRef.current?.slides;
    if (swiperPagination.current && swiperRef.current && swiperSlides) {
      if (swiperSlides.length > 1) {
        swiperPagination.current.style.display = 'block';
      } else {
        swiperPagination.current.style.display = 'none';
      }
    }
  }, []);

  return (
    <>
      <style>
        {`
          .swiper-pagination-custom {
            width:auto;
            position:absolute;
            right: 10px;
            left: auto;
          }
        `}
      </style>
      <Swiper
        {...params}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className={`h-full object-cover ${style}`}
              src={image}
              alt={`slide-${index}`}
              style={{ width: '100%' }}
            />
          </SwiperSlide>
        ))}
        <div
          ref={swiperPagination}
          className="fraction absolute relative bottom-10 bottom-5 right-0 z-10 w-1/2 rounded-16 bg-gr-300 px-[4px] text-center text-body-4 text-gr-white"
        ></div>
      </Swiper>
    </>
  );
};

export default Carousel;
