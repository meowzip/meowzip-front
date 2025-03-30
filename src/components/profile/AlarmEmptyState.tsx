import React from 'react';
import Image from 'next/image';

const AlarmEmptyState = () => {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-[6px] px-4 py-6">
        <Image
          src="/images/mockup/box-cat.svg"
          alt="edit"
          width={120}
          height={120}
        />
        <h3 className="text-lg font-medium text-gray-700">
          새로운 소식이 없어요.
        </h3>
        <p className="text-sm text-gray-500">새 소식이 생기면 알려드릴게요!</p>
      </div>
    </section>
  );
};

export default AlarmEmptyState;
