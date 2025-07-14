import {useCallback, useState} from 'react';

export type UseObjectReturn<T> = {
  value: T | null;
  isEmpty: boolean;
  onChangeValue: (newObj: T | null) => void;
  onNull: () => void;
};

const useObject = <T extends object>(obj: T | null): UseObjectReturn<T> => {
  const [value, setValue] = useState<T | null>(obj);

  const onChangeValue = useCallback((newObj: T | null) => {
    setValue(newObj);
  }, []);

  const onNull = () => onChangeValue(null);

  return {
    value,
    isEmpty: value == null,
    onChangeValue,
    onNull,
  };
};

export default useObject;
