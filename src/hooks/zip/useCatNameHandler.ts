import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

const useCatNameHandler = () => {
  const [catName, setCatName] = useState({ value: '', error: false });

  /**
   * @description 고양이 이름 유효성 검사
   * @returns boolean
   */
  const validateCatName = (name: string): boolean => {
    if (!name || name.length >= 12) {
      return false;
    }
    return true;
  };

  /**
   * @description debounce catName input
   */
  const debounceCatName = useCallback(
    debounce(name => {
      setCatName(prev => ({ ...prev, error: !validateCatName(name) }));
    }, 100),
    []
  );

  const handleCatNameChange = (e: { target: { value: string } }) => {
    const newValue = e.target.value;
    setCatName(prev => {
      const newState = {
        ...prev,
        value: newValue,
        error: !validateCatName(newValue)
      };
      return newState;
    });
    debounceCatName(newValue);
  };

  return { catName, handleCatNameChange };
};

export default useCatNameHandler;
