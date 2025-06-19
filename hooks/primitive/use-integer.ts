import { useState } from 'react';

export type UseIntegerReturn = {
  isNegative: boolean;
  value: number;
  onChangeValue: (newValue: number) => void;
};

const useInteger = (n: number): UseIntegerReturn => {
  const [value, setValue] = useState<number>(Math.floor(n));

  const onChangeValue = (newValue: number) => {
    setValue(Math.floor(newValue));
  };

  return {
    isNegative: value < 0,
    value,
    onChangeValue,
  };
};

export default useInteger;
