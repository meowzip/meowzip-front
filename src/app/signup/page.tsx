'use client';

import React, { useCallback, useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { debounce } from 'lodash';
import { Checkbox } from '../../components/ui/Checkbox';
import BottomSheet from '../../components/ui/BottomSheet';

const Page = () => {
  const [password, setPassword] = useState({ value: '', error: false });
  const [passwordCheck, setPasswordCheck] = useState({
    value: '',
    error: false
  });
  const [isVisible, setIsVisible] = useState(true);

  /**
   * @description 비밀번호 유효성 검사
   * @returns boolean
   */
  const validatePwd = (pwd: string): boolean => {
    const pwdRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}":;'?<>.,~`₩\-=/\[\]\\|]).{9,}$/;

    return pwdRegex.test(pwd);
  };

  /**
   * @description debounce pwd input
   */
  const debouncePwd = useCallback(
    debounce(pwd => {
      setPassword(prev => ({ ...prev, error: !validatePwd(pwd) }));
    }, 500),
    []
  );

  const handlePwdChange = (e: { target: { value: string } }) => {
    setPassword(prev => ({ ...prev, value: e.target.value }));
    debouncePwd(e.target.value);
  };

  const handlePwdCheckChange = (e: { target: { value: string } }) => {
    setPasswordCheck(prev => ({ ...prev, value: e.target.value }));
    setPasswordCheck(prev => ({
      ...prev,
      error: e.target.value !== password.value ? true : false
    }));
  };

  const openTermsOfUseModal = () => {
    console.log('openTermsOfUse');
  };
  const openPrivacyModal = () => {
    console.log('openPrivacy');
  };

  return (
    <section className="px-4 pt-10">
      <article className="pb-8 text-left text-heading-1 text-gr-black">
        <h1>비밀번호 설정하고</h1>
        <h1>회원가입을 완료해 주세요</h1>
      </article>
      <article className="flex flex-col gap-2">
        <Input
          helperText={
            password.error ? '8자 이상 / 영문, 숫자, 특수문자 가능' : ''
          }
          value={password.value}
          placeholder="8자 이상 / 영문, 숫자, 특수문자 가능"
          error={password.error ? true : false}
          onChange={handlePwdChange}
        />
        <Input
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
          onClick={() => setIsVisible(true)}
        >
          가입하기
        </Button>
      </article>
      <BottomSheet isVisible={isVisible} setIsVisible={setIsVisible}>
        <div className="flex items-center space-x-2 rounded-14 bg-gr-50 p-4">
          <Checkbox id="agreeAll" kind="hasBg" />
          <label
            htmlFor="agreeAll"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            전체 동의하기
          </label>
        </div>
        <ul className="pt-[10px]">
          <li className="flex items-center justify-between">
            <div className="flex items-center space-x-2 py-2 pl-2">
              <Checkbox id="terms" kind="noBg" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <h5>
                  <span className="text-body-3 text-pr-500">(필수)</span> 서비스
                  이용약관 동의
                </h5>
              </label>
            </div>
            <img
              src="/images/icons/right.svg"
              alt="right"
              className="h-6 w-6"
              onClick={openTermsOfUseModal}
            />
          </li>
          <li className="flex items-center justify-between pb-2">
            <div className="flex items-center space-x-2 py-2 pl-2">
              <Checkbox id="privacy" kind="noBg" />
              <label
                htmlFor="privacy"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <h5>
                  <span className="text-body-3 text-pr-500">(필수)</span>{' '}
                  개인정보 수집 및 처리방침 안내 및 동의
                </h5>
              </label>
            </div>
            <img
              src="/images/icons/right.svg"
              alt="right"
              className="h-6 w-6"
              onClick={openPrivacyModal}
            />
          </li>
        </ul>
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          disabled={true}
          onClick={() => {}}
        >
          동의하고 시작하기
        </Button>
      </BottomSheet>
    </section>
  );
};
export default Page;
