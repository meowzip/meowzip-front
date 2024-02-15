'use client';

import { useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useUser } from '@/contexts/EmailContext';
import { useAtom } from 'jotai';
import { useMutation } from '@tanstack/react-query';
import { signUpOnServer } from '@/services/signup';
import { nicknameAtom } from '@/atoms/nicknameAtom';
import { useRouter } from 'next/navigation';
import SignupAgreeBottomSheet from '../../components/signup/SignupAgreeBottomSheet';
import usePasswordHandler from '@/utils/usePasswordHandler';
import Modal from '@/components/ui/Modal';

interface SignUpResponse {
  status: string;
  result?: number;
  message?: string;
  data?: {
    generatedNickname: string;
  };
}

const SignUpPage = () => {
  const router = useRouter();

  const [openAgreeBottom, setOpenAgreeBottom] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [nickname, setNickname] = useAtom(nicknameAtom);

  const { password, passwordCheck, handlePwdChange, handlePwdCheckChange } =
    usePasswordHandler();

  const { email } = useUser();

  const openTermsOfUseModal = () => {
    console.log('openTermsOfUse');
  };
  const openPrivacyModal = () => {
    console.log('openPrivacy');
  };

  const signUp = () => {
    signUpMutation.mutate({
      email: email,
      password: password.value,
      loginType: 'EMAIL'
    });
  };

  /**
   * @description API - POST signup
   */
  const signUpMutation = useMutation({
    mutationFn: (reqObj: {
      email: string;
      password: string;
      loginType: string;
    }) => signUpOnServer(reqObj),
    onSuccess: (data: any) => {
      if (data.status !== 'OK') {
        data.message && setErrorMsg(data.message);
        setOpenModal(true);
      } else {
        data.data && setNickname(data.data.generatedNickname);
        router.push('/onboard');
      }
    }
  });

  return (
    <section className="px-4 pt-10">
      <article className="pb-8 text-left text-heading-1 text-gr-black">
        <h1>비밀번호 설정하고</h1>
        <h1>회원가입을 완료해 주세요</h1>
      </article>
      <article className="flex flex-col gap-2">
        <Input
          type="password"
          helperText={
            password.error ? '8자 이상 / 영문, 숫자, 특수문자 가능' : ''
          }
          value={password.value}
          placeholder="8자 이상 / 영문, 숫자, 특수문자 가능"
          error={password.error ? true : false}
          onChange={handlePwdChange}
        />
        <Input
          type="password"
          helperText={passwordCheck.error ? '비밀번호를 확인해주세요' : ''}
          value={passwordCheck.value}
          placeholder="비밀번호 확인"
          error={passwordCheck.error ? true : false}
          onChange={handlePwdCheckChange}
        />
      </article>
      <article className="py-4">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          disabled={
            !password.value ||
            !passwordCheck.value ||
            password.error ||
            passwordCheck.error
              ? true
              : false
          }
          onClick={() => setOpenAgreeBottom(true)}
        >
          가입하기
        </Button>
      </article>
      <SignupAgreeBottomSheet
        open={openAgreeBottom}
        setIsVisible={setOpenAgreeBottom}
        onClick={signUp}
      />
      {openModal && (
        <Modal
          contents={{ title: '알림', body: errorMsg }}
          scrim={true}
          buttons={[
            {
              variant: 'primary',
              size: 'lg',
              content: '확인',
              style: 'w-full rounded-[16px] px-4 py-2 bg-sm-error-700',
              onClick: () => {
                setOpenModal(false), setOpenAgreeBottom(false);
              }
            }
          ]}
        />
      )}
    </section>
  );
};

SignUpPage.displayName = 'SignUpPage';
export default SignUpPage;
