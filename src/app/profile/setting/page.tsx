'use client';

import Topbar from '@/components/ui/Topbar';
import { useRouter } from 'next/navigation';
import React from 'react';
import SettingCard from '@/components/setting/SettingCard';
import { Switch } from '@/components/ui/Switch';

const SettingPage = () => {
  const router = useRouter();

  const onRightClick = () => {
    console.log('click right');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 h-full min-w-[320px] bg-gr-white">
      <Topbar type="three">
        <Topbar.Back onClick={() => router.back()} />
        <Topbar.Title title="설정" />
        <Topbar.Empty />
      </Topbar>
      <section className="flex items-center justify-between pb-4 pl-5 pr-4 pt-16">
        <div>
          <h1 className="text-btn-1 text-gr-800">푸시알림</h1>
          <h1 className="text-body-3 text-gr-400">
            알림을 꺼도 내 소식에서 확인할 수 있어요
          </h1>
        </div>
        <Switch />
      </section>
      <section className="h-2 bg-gr-50" />
      <section>
        <SettingCard text="이용약관" onClick={onRightClick} />
        <SettingCard text="개인정보 처리방침" onClick={onRightClick} />
      </section>
      <section className="h-2 bg-gr-50" />
      <SettingCard text="로그아웃" onClick={onRightClick} />
      <SettingCard text="회원탈퇴" onClick={onRightClick} />
      <section className="pt-20 text-center text-body-3 text-gr-400">
        <p>문의사항이 있을 경우,</p>
        <p>nyangzip@gmail.com으로 보내주세요</p>
      </section>
    </div>
  );
};

export default SettingPage;
