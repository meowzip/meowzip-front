'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const catImages = [
  { src: '/images/icons/cats/cat-sun.svg', alt: 'Sunday Cat' },
  { src: '/images/icons/cats/cat-mon.svg', alt: 'Monday Cat' },
  { src: '/images/icons/cats/cat-tue.svg', alt: 'Tuesday Cat' },
  { src: '/images/icons/cats/cat-wed.svg', alt: 'Wednesday Cat' },
  { src: '/images/icons/cats/cat-thu.svg', alt: 'Thursday Cat' },
  { src: '/images/icons/cats/cat-fri.svg', alt: 'Friday Cat' },
  { src: '/images/icons/cats/cat-sat.svg', alt: 'Saturday Cat' }
];

export default function Loading() {
  const [currentCatIndex, setCurrentCatIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCatIndex(prev => (prev + 1) % catImages.length);
    }, 1400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100">
      <div className="relative mb-8 h-32 w-32">
        {/* 글래스모피즘 배경 */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/30 bg-white/40 shadow-lg backdrop-blur-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentCatIndex}
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{
              scale: [0.5, 1.2, 1],
              opacity: 1,
              y: [20, -10, 0]
            }}
            exit={{ scale: 0.5, opacity: 0, y: -20 }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              animate={{
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Image
                src={catImages[currentCatIndex].src}
                alt={catImages[currentCatIndex].alt}
                width={72}
                height={72}
                className="opacity-85 drop-shadow-lg filter"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* 부드러운 그림자 */}
        <motion.div
          className="absolute bottom-2 left-1/2 h-6 w-20 -translate-x-1/2 transform rounded-full bg-slate-300/15 blur-sm"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      {/* 심플한 로딩 텍스트 */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.h2
          className="text-lg font-medium tracking-wide text-slate-600"
          animate={{
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          잠시만 기다려주세요
        </motion.h2>

        {/* 심플한 점 3개 */}
        <motion.div
          className="mt-3 flex justify-center space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {[0, 1, 2].map(dot => (
            <motion.div
              key={dot}
              className="h-1.5 w-1.5 rounded-full bg-slate-400"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1.5,
                delay: dot * 0.2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
