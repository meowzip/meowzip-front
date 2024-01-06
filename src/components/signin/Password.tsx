import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface PasswordProps {
  setStep: () => void;
}

export default function Password({ setStep }: PasswordProps) {
  return (
    <section className="w-full px-6 text-[24px] font-bold text-gray-800">
      <div className="mb-[32px]">
        비밀번호를 입력하여 <br /> 로그인해 주세요
      </div>
      <div className="pb-4">
        <Input variant="outlined" placeholder="비밀번호를 입력하세요" />
      </div>
      <Button onClick={setStep} className="w-full">
        로그인하기
      </Button>
    </section>
  );
}
