import { useState, useEffect } from 'react';

type LocalStorageState<T> = [T, (value: T) => void];

const useLocalStorage = <T>(key: string, initialValue: T): LocalStorageState<T> => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;