'use client';

import React, { useCallback, useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { debounce } from 'lodash';

const Page = () => {
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [pwdCheckError, setPwdCheckError] = useState('');

  /**
   * @description 비밀번호 유효성 검사
   * @returns boolean
   */
  const validatePwd = (pwd: string): boolean => {
    const pwdRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}":;'?<>.,]).{9,}$/;
    return pwdRegex.test(pwd);
  };

  /**
   * @description debounce pwd input
   */
  const debouncePwd = useCallback(
    debounce(pwd => {
      const isValid = validatePwd(pwd);
      setPwdError(!isValid ? '8자 이상 / 영문, 숫자, 특수문자 가능' : '');
    }, 500),
    []
  );

  const handlePwdChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
    debouncePwd(e.target.value);
  };

  /**
   * @description debounce pwdCheck input
   */
  const debouncePwdCheck = useCallback(
    debounce((pwdCheck, pwd) => {
      const isValid = pwdCheck === pwd ? true : false;
      setPwdCheckError(!isValid ? '비밀번호를 확인해주세요' : '');
    }, 500),
    []
  );

  const handlePwdCheckChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPasswordCheck(e.target.value);
    debouncePwdCheck(e.target.value, password);
  };

  return (
    <section className="px-4 pt-10">
      <article className="pb-8 text-left text-heading-1 text-gr-black">
        <h1>비밀번호 설정하고</h1>
        <h1>회원가입을 완료해 주세요</h1>
      </article>
      <article className="flex flex-col gap-2">
        <Input
          helperText={pwdError}
          value={password}
          placeholder="8자 이상 / 영문, 숫자, 특수문자 가능"
          error={pwdError ? true : false}
          onChange={handlePwdChange}
        />
        <Input
          helperText={pwdCheckError}
          value={passwordCheck}
          placeholder="비밀번호 확인"
          error={pwdCheckError ? true : false}
          onChange={handlePwdCheckChange}
        />
      </article>
      <article className="py-4">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => console.log('sign up')}
        >
          가입하기
        </Button>
      </article>
    </section>
  );
};
export default Page;
