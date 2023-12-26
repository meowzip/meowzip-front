'use client';

import React from 'react';
import { useFunnel } from '@/components/common/Funnel';
import Email from '@/components/signin/Email';
import Password from '@/components/signin/Password';
import CheckAccount from '@/components/signin/CheckAccount';
import SignInMain from '@/components/signin/SignInMain';
import Complete from '@/components/signin/Complete';
import Topbar from '@/components/ui/Topbar';
export type NonEmptyArray<T> = readonly [T, ...T[]];

export default function SigninPage() {
  const [Funnel, setStep] = useFunnel(
    ['main', 'email', 'accountInfo', 'password', 'complete'] as const,
    'main'
  );

  return (
    <div className="p-[40px 16px 0px 16px] flex-[1 0 0] flex max-w-[640px] flex-col items-center self-stretch">
      <div className="funnel-container mt-16 w-full">
        <Funnel>
          <Funnel.Step name="main">
            <SignInMain setStep={() => setStep('email')} />
          </Funnel.Step>
          <Funnel.Step name="email">
            <Email setStep={() => setStep('accountInfo')} />
          </Funnel.Step>
          <Funnel.Step name="accountInfo">
            <div className="fixed top-0 w-full">
              <Topbar
                hideRight
                type="modal"
                title="계정 확인"
                onClick={() => history.go(-1)}
              />
            </div>
            <CheckAccount setStep={() => setStep('complete')} />
          </Funnel.Step>
          <Funnel.Step name="password">
            <Password setStep={() => setStep('complete')} />
          </Funnel.Step>
          <Funnel.Step name="complete">
            <Complete />
          </Funnel.Step>
        </Funnel>
      </div>
    </div>
  );
}
