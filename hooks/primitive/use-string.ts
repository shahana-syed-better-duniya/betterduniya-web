import React, { useCallback, useState } from 'react';

export type UseStringReturn = {
  isEmpty: boolean;
  value: string;
  onChangeValue: (newValue: string) => void;
  onChangeValueByEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
};

const useString = (initialString: string = ''): UseStringReturn => {
  const [value, setValue] = useState<string>(initialString);
  const isEmpty = value.length === 0;

  const onChangeValue = useCallback((newValue: string) => {
    setValue(newValue ?? '');
  }, []);

  const onChangeValueByEvent = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChangeValue(e.target.value),
    [onChangeValue]
  );

  const onClear = useCallback(() => onChangeValue(''), [onChangeValue]);

  return {
    isEmpty,
    value,
    onChangeValue,
    onChangeValueByEvent,
    onClear,
  };
};

export default useString;
