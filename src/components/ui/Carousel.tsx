'use client';

import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';
import { Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import Image from 'next/image';
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
        return `${current}/${total}`;
      }
    },
    spaceBetween: 30,
    modules: [Pagination],
    speed: 300
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
  }, [images]);

  return (
    <>
      <Swiper
        {...params}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        className="relative h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="relative h-full w-full">
            <Image
              src={image}
              alt={`slide-${index}`}
              fill
              className={`h-full w-full object-cover ${style}`}
              sizes="(max-width: 640px) 100vw, 640px"
            />
          </SwiperSlide>
        ))}
        <div
          ref={swiperPagination}
          className="fraction absolute bottom-5 right-4 z-10 rounded-16 bg-gr-300 px-[4px] text-center text-body-4 text-gr-white"
        />
      </Swiper>
    </>
  );
};

export default Carousel;
