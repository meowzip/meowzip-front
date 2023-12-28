import React from 'react';
import { Button } from '../ui/Button';

interface CheckAccountProps {
  setStep: () => void;
}
export default function Email({ setStep }: CheckAccountProps) {
  return (
    <div className="w-full px-6">
      <div className="text-heading-2">이전에 가입한 계정을 확인하세요</div>
      <div className="mb-8 text-body-3 leading-6 text-gray-500">
        기존 계정으로 다시 로그인해주세요.
      </div>
      <div className="border-sm px-s mb-4 rounded-lg bg-gr-50 px-10 py-4">
        카카오 계정쓰
      </div>
      <Button onClick={setStep} className="w-full">
        기존 계정으로 로그인하기
      </Button>
    </div>
  );
}
