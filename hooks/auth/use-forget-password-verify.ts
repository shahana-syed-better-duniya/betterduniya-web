import {useRouter} from "expo-router";
import useRequest from "@/hooks/api/use-request";
import {userApi} from "@/api/user/user";
import {Alert} from "react-native";

const useForgetPasswordVerify = () => {
  const router = useRouter();
  const {onRequest, isLoading} = useRequest<boolean>();

  const onVerify = async (email: string, code: string) => {
    const response = await onRequest(userApi.verifyForgetPassword, [email, code], null, false);
    if (response.result) {
      router.navigate(`/(auth)/forget/reset?email=${email}&code=${code}`);
    } else {
      Alert.alert('verification failed');
    }
  };

  return {onVerify, isLoading}
}

export default useForgetPasswordVerify;
