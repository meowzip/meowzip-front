import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

const useEmailHandler = () => {
  const [email, setEmail] = useState({ value: '', error: false });

  /**
   * @description 이메일 유효성 검사
   * @returns boolean
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  /**
   * @description debounce email input
   */
  const debounceEmail = useCallback(
    debounce(email => {
      setEmail(prev => ({ ...prev, error: !validateEmail(email) }));
    }, 300),
    []
  );

  const handleEmailChange = (e: { target: { value: string } }) => {
    setEmail(prev => ({ ...prev, value: e.target.value }));
    debounceEmail(e.target.value);
  };

  return { email, handleEmailChange };
};

export default useEmailHandler;
