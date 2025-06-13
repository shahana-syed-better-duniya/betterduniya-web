import { ApiRequest } from '../../api/request-instance';
import useInit from './use-init';
import useObjectAsync, {Callback, UseObjectAsyncReturn} from "@/hooks/base/use-object-async";

const useInitObject = <T extends object | any[]>(
  api: ApiRequest,
  params: any[] = [],
  callback?: Callback<T>
): UseObjectAsyncReturn<T> => {
  const { isLoading, valueHook, onUpdate } = useObjectAsync<T>(api, params, callback);
  useInit(onUpdate);
  return {
    isLoading,
    valueHook,
    onUpdate,
  };
};

export default useInitObject;
