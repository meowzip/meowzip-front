'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import usePasswordHandler from '@/utils/usePasswordHandler';
import { useUser } from '@/contexts/EmailContext';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signInOnServer } from '@/services/signin';
import { useRouter } from 'next/navigation';

interface PasswordProps {
  setStep: () => void;
}

export default function Password({ setStep }: PasswordProps) {
  const { password, handlePwdChange } = usePasswordHandler();
  const { email } = useUser();
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const signIn = () => {
    signInMutation.mutate({
      email: email,
      password: password.value
    });
  };

  const signInMutation = useMutation({
    mutationFn: (reqObj: { email: string; password: string }) => {
      return signInOnServer(reqObj);
    },
    onSuccess: (response: any) => {
      if (response.status === 200) {
        router.push('/diary');
      } else {
        console.error('로그인 중 오류:', response.message);
        router.push('/signin');
      }
    }
  });

  return (
    <section className="w-full px-6 text-[24px] font-bold text-gray-800">
      <div className="mb-[32px]">
        비밀번호를 입력하여 <br /> 로그인해 주세요
      </div>
      <div className="pb-4">
        <Input
          variant="outlined"
          type="password"
          placeholder="비밀번호를 입력하세요"
          helperText={password.error ? '비밀번호를 확인해주세요' : ''}
          value={password.value}
          error={password.error ? true : false}
          onChange={handlePwdChange}
        />
      </div>
      <Button
        onClick={signIn}
        className="w-full"
        disabled={!password.value || password.error}
      >
        로그인하기
      </Button>
      <Button variant="secondary" size="sm" className="mt-8">
        비밀번호를 잊으셨나요?
      </Button>
    </section>
  );
}
