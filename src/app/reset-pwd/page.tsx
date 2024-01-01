'use client';

import React, { useCallback, useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { debounce } from 'lodash';
import { resetPwdOnServer } from '../../services/signup';

const ResetPwdPage = () => {
  const [password, setPassword] = useState({ value: '', error: false });
  const [passwordCheck, setPasswordCheck] = useState({
    value: '',
    error: false
  });

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

  const resetPwd = () => {
    const data = resetPwdOnServer({ password: password.value, token: 'asdf' });
    console.log('data', data);
    // router.push('/signin');
  };

  return (
    <section className="px-4 pt-10">
      <article className="pb-8 text-left text-heading-1 text-gr-black">
        <h1>새 비밀번호를 입력하여</h1>
        <h1>재설정하세요</h1>
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
          onClick={resetPwd}
        >
          재설정하기
        </Button>
      </article>
    </section>
  );
};

export default ResetPwdPage;
