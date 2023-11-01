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
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
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
      if (swiperSlides.length > 2) {
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
            right: 0;
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
          <SwiperSlide key={index} className="p-5">
            <img
              className="object-contain h-full"
              src={image}
              alt={`slide-${index}`}
              style={{ width: '100%' }}
            />
          </SwiperSlide>
        ))}
        <div
          ref={swiperPagination}
          className="fraction w-1/2 relative bottom-5 text-body-4 bottom-10 bg-gr-300 rounded-16 px-[4px] text-center text-gr-white absolute right-0 z-10"
        ></div>
      </Swiper>
    </>
  );
};

export default Carousel;
