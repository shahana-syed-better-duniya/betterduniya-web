import { useCallback } from 'react';
import useObject, {UseObjectReturn} from "@/hooks/primitive/use-object";
import {ApiRequest} from "@/api/request-instance";
import useRequest from "@/hooks/api/use-request";

export type Callback<T> = (result: T | null) => void;

export interface UseObjectAsyncReturn<T> {
  isLoading: boolean;
  valueHook: UseObjectReturn<T>;
  onUpdate: () => Promise<void>;
}

const useObjectAsync = <T extends object>(
  api: ApiRequest,
  params?: any,
  callback?: Callback<T>
): UseObjectAsyncReturn<T> => {
  const { onRequest, isLoading } = useRequest();
  const object = useObject<T>(null);

  const onGetObject = useCallback(async () => {
    console.log(api)
    const response = await onRequest(api, params, null, false);

    const result = (response?.result as T) ?? null;
    object.onChangeValue(result);

    if (callback) {
      callback(result);
    }
  }, [object, onRequest, api, params, callback]);

  return {
    isLoading,
    valueHook: object,
    onUpdate: onGetObject,
  };
};

export default useObjectAsync;
