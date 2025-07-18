'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  MotionProps,
  PanInfo
} from 'framer-motion';

interface BottomSheetProps extends MotionProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  topBar?: React.ReactNode;
  children: React.ReactNode;
  heightPercent: string[];
  overflow?: string;
  disableDrag?: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  setIsVisible,
  topBar,
  children,
  heightPercent,
  overflow,
  disableDrag,
  ...props
}) => {
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, []);

  const initialHeightValue = windowHeight * 0.2;
  const y = useMotionValue(initialHeightValue);
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = windowHeight * 0.25;
    const closeThreshold = windowHeight * 0.7;
    const endY = y.get();
    const velocity = info.velocity.y;

    if (velocity > 500) {
      setIsVisible(false);
      return;
    }

    if (velocity < -500) {
      y.set(0);
      return;
    }

    if (endY < threshold) {
      y.set(0);
    } else if (endY > closeThreshold) {
      setIsVisible(false);
    } else {
      y.set(initialHeightValue);
    }
  };

  const bottomSheetHeight = useTransform(y, [0, windowHeight], heightPercent);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      bottomSheetRef.current &&
      !bottomSheetRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (!isVisible) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (
        bottomSheetRef.current &&
        !bottomSheetRef.current.contains(e.target as Node)
      ) {
        e.preventDefault();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        e.stopPropagation();
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, {
      passive: false
    });

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={handleClickOutside}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={bottomSheetRef}
            initial={{ y: windowHeight }}
            animate={{
              y: initialHeightValue,
              transition: {
                type: 'spring',
                damping: 30,
                stiffness: 300,
                duration: 0.3
              }
            }}
            exit={{
              y: windowHeight,
              transition: {
                type: 'tween',
                ease: 'easeIn',
                duration: 0.3
              }
            }}
            style={{
              y,
              height: bottomSheetHeight
            }}
            className={`fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-[640px] flex-col rounded-tl-3xl rounded-tr-3xl bg-white shadow-lg ${
              overflow ? overflow : 'overflow-hidden'
            }`}
            {...props}
          >
            <motion.div
              ref={dragHandleRef}
              {...(!disableDrag && {
                drag: 'y',
                dragConstraints: {
                  top: -windowHeight * 0.5,
                  bottom: windowHeight * 0.7
                },
                dragElastic: 0.1,
                onDragEnd: handleDragEnd,
                whileDrag: { cursor: 'grabbing' }
              })}
              className="relative cursor-grab active:cursor-grabbing"
              style={{ touchAction: disableDrag ? 'auto' : 'none' }}
            >
              <div className="drag-bar mx-auto my-2 h-1 w-10 rounded-full bg-gray-300" />
              {topBar && (
                <div className="topBar relative pb-2 text-center">{topBar}</div>
              )}
            </motion.div>

            {/* 컨텐츠 영역 - 스크롤 가능하지만 드래그 불가 */}
            <div
              className={`flex-1 ${overflow ? overflow : 'overflow-y-auto'}`}
              style={{
                touchAction: 'pan-y', // 세로 스크롤만 허용
                WebkitOverflowScrolling: 'touch' // iOS 스크롤 최적화
              }}
              onTouchMove={e => e.stopPropagation()}
              onTouchStart={e => e.stopPropagation()}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BottomSheet;
