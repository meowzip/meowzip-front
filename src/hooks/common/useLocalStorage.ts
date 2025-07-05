import { useState, useEffect, useCallback } from 'react';

export const isClient = typeof window !== 'undefined';

export interface UseLocalStorageOptions<T = any> {
  defaultValue?: T;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
}

export const useLocalStorage = <T = string>(
  key: string,
  options: UseLocalStorageOptions<T> = {}
) => {
  const {
    defaultValue = null,
    serialize = JSON.stringify,
    deserialize = JSON.parse
  } = options;

  const [storedValue, setStoredValue] = useState<T | null>(() => {
    if (!isClient) return defaultValue as T;

    try {
      const item = window.localStorage.getItem(key);
      return item ? deserialize(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue as T;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T | null) => T)) => {
      if (!isClient) return;

      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (valueToStore === null || valueToStore === undefined) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, serialize(valueToStore));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, serialize, storedValue]
  );

  const getValue = useCallback((): T | null => {
    if (!isClient) return defaultValue as T;

    try {
      const item = window.localStorage.getItem(key);
      return item ? deserialize(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue as T;
    }
  }, [key, defaultValue, deserialize]);

  const removeValue = useCallback(() => {
    if (!isClient) return;

    try {
      window.localStorage.removeItem(key);
      setStoredValue(null);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  useEffect(() => {
    if (!isClient) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(deserialize(e.newValue));
        } catch (error) {
          console.error(`Error parsing storage event for key "${key}":`, error);
        }
      } else if (e.key === key && e.newValue === null) {
        setStoredValue(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, deserialize]);

  return {
    value: storedValue,
    setValue,
    getValue,
    removeValue,
    isClient
  };
};

export const useLocalStorageString = (
  key: string,
  defaultValue: string = ''
) => {
  return useLocalStorage<string>(key, {
    defaultValue,
    serialize: value => value,
    deserialize: value => value
  });
};
