import { useCallback } from 'react';
import Toast from 'react-native-toast-message';

interface UseNotification {
  notifySuccess: (text: string) => void;
  notifyError: (text: string) => void;
  notifyInfo: (text: string) => void;
  notifyWarning: (text: string) => void;
}

const useNotification = (): UseNotification => {
  const notify = useCallback((text: string | null | undefined, type: 'success' | 'error' | 'info' | 'warning') => {
    if (text != null) {
      Toast.show({
        type,
        text1: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize the type
        text2: text,
      });
    }
  }, []);

  const notifySuccess = useCallback((text: string) => notify(text, 'success'), [notify]);
  const notifyError = useCallback((text: string) => notify(text, 'error'), [notify]);
  const notifyInfo = useCallback((text: string) => notify(text, 'info'), [notify]);
  const notifyWarning = useCallback((text: string) => notify(text, 'warning'), [notify]);

  return {
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyWarning,
  };
};

export default useNotification;
