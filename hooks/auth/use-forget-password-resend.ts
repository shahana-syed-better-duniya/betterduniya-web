import {useRouter} from "expo-router";
import useRequest from "@/hooks/api/use-request";
import {userApi} from "@/api/user/userAuth";

const useForgetPasswordResend = () => {
  const router = useRouter();
  const {onRequest, isLoading} = useRequest();

  const onForgetPassword = async (email: string) => {
    await onRequest(userApi.forgetPassword, [email], null, false);
    router.navigate(`/(auth)/forget/verify?email=${email}`);
  };

  return {onForgetPassword, isLoading}
}

export default useForgetPasswordResend;
