import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface EmailProps {
  setStep: () => void;
}
export default function Email({ setStep }: EmailProps) {
  return (
    <section className="w-full px-[16px] text-[24px] font-bold text-gray-800">
      <div>
        이메일을 입력하여 <br /> 로그인해 주세요
      </div>
      <Input variant="outlined" placeholder="이메일을 입력하세요" disabled />
      <div className="py-3">
        <Button onClick={setStep} className="w-full">
          계정 확인하기
        </Button>
      </div>
    </section>
  );
}
