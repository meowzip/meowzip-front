'use client';

import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import Image from 'next/image';

const Page = () => {
  const [userName, setUserName] = useState('명랑한캔따개310');

  const getStart = () => {
    console.log('시작하기');
  };

  const editProfile = () => {
    console.log('프로필 설정하기');
  };

  return (
    <section className="px-4 pt-[60px]">
      <article className="flex items-center justify-center">
        <Image
          src="https://i.pinimg.com/564x/dc/fe/e5/dcfee5f8b2eea184af2fbff4e15a2b7b.jpg"
          alt="profile"
          width={120}
          height={120}
          className="rounded-[48px]"
        />
      </article>
      <article className="text-bg-black flex flex-col items-center justify-center gap-2 py-8 text-heading-1">
        <h1>
          <span className="text-pr-500">{userName}</span>님,
        </h1>
        <h1>환영합니다.</h1>
      </article>
      <article className="flex flex-col gap-1">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          disabled={false}
          onClick={getStart}
        >
          시작하기
        </Button>
        <Button
          variant="text"
          size="lg"
          className="w-full text-gr-300"
          disabled={false}
          onClick={editProfile}
        >
          프로필 설정하기
        </Button>
      </article>
    </section>
  );
};

export default Page;
