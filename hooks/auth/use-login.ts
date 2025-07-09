import useRequest from "@/hooks/api/use-request";
import {UserLoginSuccessInfo} from "@/interfaces/users/userLoginSuccessInfo";
import {userAuthApi} from "@/api/user/userAuth";

const useLogin = () => {
  const {onRequest, isLoading} = useRequest<UserLoginSuccessInfo>()

  const onLogin = async (email: string, password: string) => {
    const body = {
      email,
      password,
    };
    const response = await onRequest(userAuthApi.loginAccount, [], body, false);
    return response.result;
  };

  return {
    isLoading,
    onLogin,
  }
}

export default useLogin;
