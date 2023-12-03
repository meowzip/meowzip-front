import React from 'react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="max-[640px] p-[40px 16px 0px 16px] flex-[1 0 0] flex-col items-center self-stretch">
      <div className=" flex-col items-center justify-center gap-4">
        <div className="px-10 text-center text-heading-2">
          <p>
            당신이 마주친
            <br /> 모든 길냥이들을 위해
          </p>
          <Image
            src="https://i.pinimg.com/564x/dc/fe/e5/dcfee5f8b2eea184af2fbff4e15a2b7b.jpg"
            alt="cat-image"
            width={300}
            height={200}
          />
        </div>
        <div className="flex-col items-center p-4">
          <Button className="w-full">이메일로 계속하기</Button>
        </div>
        <div className="flex flex-col items-center justify-end gap-6 py-6">
          <div className="flex flex-col justify-end gap-6 py-6 text-body-4 text-gr-300">
            SNS 계정으로 간편하게 시작하기
          </div>
          <div className="flex items-end justify-center gap-6">
            <button>카톡</button>
            <button>구글</button>
            <button>애플</button>
          </div>
        </div>
      </div>
    </div>
  );
}
