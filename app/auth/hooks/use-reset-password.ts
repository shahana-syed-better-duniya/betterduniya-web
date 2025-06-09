import {useNavigation} from "expo-router";
import useRequest from "@/hooks/api/use-request";
import {userApi} from "@/api/user/user";
import {Alert} from "react-native";
import ForgetPasswordInfo from "@/interfaces/users/forgetPasswordInfo";

const useResetPassword = () => {
  const navigation = useNavigation();
  const {onRequest, isLoading} = useRequest<ForgetPasswordInfo>();

  const onResetPassword = async (email: string, code: string, password: string) => {
    const body: ForgetPasswordInfo = {
      code,
      email,
      password,
    };
    const response = await onRequest(userApi.resetPassword, [], body, false);
    if (response.result) {
      navigation.navigate("auth/verify-success-screen", {email});
    } else {
      Alert.alert('Reset password failed');
    }
  };

  return {onResetPassword, isLoading}
}

export default useResetPassword;
