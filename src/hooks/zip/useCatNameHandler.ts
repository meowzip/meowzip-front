import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

const useCatNameHandler = () => {
  const [catName, setCatName] = useState({ value: '', error: false });

  /**
   * @description 고양이 이름 유효성 검사
   * @returns boolean
   */
  const validateCatName = (name: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(name);
  };

  /**
   * @description debounce catName input
   */
  const debounceCatName = useCallback(
    debounce(email => {
      setCatName(prev => ({ ...prev, error: !validateCatName(email) }));
    }, 300),
    []
  );

  const handleCatNameChange = (e: { target: { value: string } }) => {
    setCatName(prev => ({ ...prev, value: e.target.value }));
    debounceCatName(e.target.value);
  };

  return { catName, handleCatNameChange };
};

export default useCatNameHandler;
