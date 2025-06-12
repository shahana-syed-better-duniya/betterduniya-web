import { useEffect, useState } from 'react';

type Callback = (...args: any[]) => void;

/**
 * A custom hook to initialize a function once when the component mounts,
 * and provides a reset mechanism to re-trigger the initialization.
 *
 * @param callback - The function to be called when the hook initializes.
 * @param args - Any arguments to pass to the callback function.
 * @returns A tuple containing the resetInit function.
 */
const useInit = (callback: Callback, ...args: any[]): [() => void] => {
  const [mounted, setMounted] = useState(false);

  const resetInit = () => setMounted(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      callback(...args);
    }
  }, [mounted, callback, args]);

  return [resetInit];
};

export default useInit;
