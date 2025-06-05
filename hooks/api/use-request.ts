import { useCallback, useState } from 'react';
import requestInstance, {ApiRequest, RequestResult} from '../../api/request-instance';
import useNotification from '../interaction/use-notification';

const useRequest = <T>(): {
  isLoading: boolean;
  onRequest: (
    request: ApiRequest,
    args?: any,
    body?: any,
    isLogOk?: boolean
  ) => Promise<RequestResult<T>>;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const { notifySuccess, notifyError } = useNotification();

  const onRequest = useCallback(
    async (
      request: ApiRequest,
      args?: any,
      body?: any,
      isLogOk: boolean = true
    ): Promise<RequestResult<T>> => {
      setIsLoading(true);

      let response: RequestResult<T> | null = null;
      try {
        response = await requestInstance(request, args, body);

        const errorMessage =
          typeof response?.errorMessage === 'object' && 'response' in response?.errorMessage
            ? response.errorMessage.response?.data?.message
            : response?.errorMessage;
        if (errorMessage) {
          console.error(errorMessage);
        }
      } catch (error) {
        if (typeof error === 'string') {
          notifyError(error);
        } else if (error instanceof Error) {
          notifyError(error.message);
        } else {
          notifyError('An unknown error occurred');
          console.error(error);
        }
        setIsLoading(false);
        return { result: null, ok: false };
      }

      if (response && response.ok) {
        if (isLogOk && request.okMessage) {
          notifySuccess(request.okMessage);
        }
      } else {
        if (typeof response?.errorMessage === 'string') {
          notifyError(response?.errorMessage);
        } else {
          notifyError('An unknown error occurred');
          console.error(response?.errorMessage);
        }
      }

      setIsLoading(false);
      return response;
    },
    [notifyError, notifySuccess]
  );

  return {
    onRequest,
    isLoading,
  };
};

export default useRequest;
