import {useRouter} from "expo-router";
import useRequest from "@/hooks/api/use-request";
import {userAuthApi} from "@/api/user/userAuth";
import {Alert} from "react-native";
import {UserLoginSuccessInfo} from "@/interfaces/users/userLoginSuccessInfo";
import useLoginSave from "@/hooks/auth/use-login-save";

const useRegistrationVerify = () => {
  const router = useRouter();
  const {onRequest, isLoading} = useRequest<UserLoginSuccessInfo>();

  const saveLoginResult = useLoginSave();

  const onVerify = async (email: string, code: string) => {
    const response = await onRequest(userAuthApi.verifyAccount, [email, code], null, false);
    const userInfo = response.result;
    if (userInfo != null && userInfo?.accessToken.length > 0) {
      await saveLoginResult(userInfo);
      router.navigate("/(auth)/verify/success");
    } else {
      Alert.alert('verification failed');
    }
  };

  const onResend = async (email: string, _: string) => {
    await onRequest(userAuthApi.resendVerify, [email], null, false);
  };

  return {onVerify, onResend, isLoading}
}

export default useRegistrationVerify;
