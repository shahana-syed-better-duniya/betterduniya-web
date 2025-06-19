import {useNavigation} from "expo-router";
import useRequest from "@/hooks/api/use-request";
import {userApi} from "@/api/user/user";
import {Alert} from "react-native";

const useForgetPasswordVerify = () => {
  const navigation = useNavigation();
  const {onRequest, isLoading} = useRequest<boolean>();

  const onVerify = async (email: string, code: string) => {
    const response = await onRequest(userApi.verifyForgetPassword, [email, code], null, false);
    if (response.result) {
      navigation.navigate("auth/forget-password-reset-screen", {email, code});
    } else {
      Alert.alert('verification failed');
    }
  };

  return {onVerify, isLoading}
}

export default useForgetPasswordVerify;
