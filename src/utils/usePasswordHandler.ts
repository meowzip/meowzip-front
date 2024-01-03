import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

const usePasswordHandler = () => {
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

  return { password, passwordCheck, handlePwdChange, handlePwdCheckChange };
};

export default usePasswordHandler;
