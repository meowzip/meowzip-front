'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';
import { Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import { Skeleton } from '@/components/ui/Skeleton';
import 'swiper/css';
import 'swiper/css/pagination';

interface CarouselProps {
  images: string[];
  style?: string;
}

const Carousel: React.FC<CarouselProps> = ({ images, style }) => {
  const swiperRef = useRef<SwiperCore>();
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    new Array(images.length).fill(false)
  );
  const [isInitialized, setIsInitialized] = useState(false);

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
    speed: 500,
    effect: 'fade'
  };

  const swiperPagination = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = images.map((src, index) => {
        return new Promise(resolve => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            resolve(true);
          };
          img.onerror = () => resolve(false);
          img.src = src;
        });
      });

      await Promise.all(imagePromises);
      setIsInitialized(true);
    };

    loadImages();
  }, [images]);

  useEffect(() => {
    const swiperSlides = swiperRef.current?.slides;
    if (swiperPagination.current && swiperRef.current && swiperSlides) {
      if (swiperSlides.length > 1) {
        swiperPagination.current.style.display = 'block';
      } else {
        swiperPagination.current.style.display = 'none';
      }
    }
  }, [isInitialized]);

  if (!isInitialized) {
    return <Skeleton className="h-full w-full rounded-lg" />;
  }

  return (
    <>
      <style>
        {`
          .swiper-pagination-custom {
            width: auto;
            position: absolute;
            right: 10px;
            left: auto;
          }
          .swiper-slide {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          }
          .swiper-slide-active {
            opacity: 1;
          }
        `}
      </style>
      <Swiper
        {...params}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        className="h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            {loadedImages[index] ? (
              <img
                className={`h-full w-full object-cover transition-opacity duration-300 ${style}`}
                src={image}
                alt={`slide-${index}`}
                loading="lazy"
              />
            ) : (
              <Skeleton className="h-full w-full rounded-lg" />
            )}
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
