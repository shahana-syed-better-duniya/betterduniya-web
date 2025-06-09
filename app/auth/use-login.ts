import useRequest from "@/hooks/api/use-request";
import {UserLoginSuccessInfo} from "@/interfaces/users/userLoginSuccessInfo";
import useString from "@/hooks/primitive/use-string";
import {userApi} from "@/api/user/user";

const useLogin = () => {
  const {onRequest, isLoading} = useRequest<UserLoginSuccessInfo>()

  const onLogin = async (email: string, password: string) => {
    const body = {
      email,
      password,
    };
    const response = await onRequest(userApi.loginAccount, [], body, false);
    return response.result;
  };

  return {
    isLoading,
    onLogin,
  }
}

export default useLogin;
