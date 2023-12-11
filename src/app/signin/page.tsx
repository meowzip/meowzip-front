'use client';

import React from 'react';
export type NonEmptyArray<T> = readonly [T, ...T[]];
import SignInMain from '@/components/signin/SignInMain';
import { useFunnel } from '@/components/common/Funnel';
export default function LoginPage() {
  const [Funnel, setStep] = useFunnel(
    ['main', 'email', 'accountInfo', 'password', 'complete'] as const,
    'main'
  );
  return (
    <div className="p-[40px 16px 0px 16px] flex-[1 0 0] flex max-w-[640px] flex-col items-center self-stretch">
      <Funnel>
        <Funnel.Step name="main">
          <SignInMain setStep={() => setStep('email')} />
        </Funnel.Step>
        <Funnel.Step name="email">
          <div>이메일을 입력하여 로그인해 주세요</div>
          <h2 onClick={() => setStep('password')}>go Password step</h2>
          <h2 onClick={() => setStep('accountInfo')}>계정 확인하기</h2>
        </Funnel.Step>
        <Funnel.Step name="accountInfo">
          <div>이전에 가입한 계정을 확인하세요</div>
          <div>기존 계정으로 로그인하기</div>
          <h2 onClick={() => setStep('main')}>메인으로 가좍</h2>
        </Funnel.Step>
        <Funnel.Step name="password">
          <div>비밀번호를 입력하여 로그인해 주세요</div>
          <h3 onClick={() => setStep('complete')}>password</h3>
        </Funnel.Step>
        <Funnel.Step name="complete">
          <h4 onClick={() => console.log('완료')}>complete</h4>
        </Funnel.Step>
      </Funnel>
    </div>
  );
}
