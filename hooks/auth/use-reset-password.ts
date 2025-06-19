import {useNavigation} from "expo-router";
import useRequest from "@/hooks/api/use-request";
import {userApi} from "@/api/user/user";
import {Alert} from "react-native";
import ForgetPasswordInfo from "@/interfaces/users/forgetPasswordInfo";
import {UserLoginSuccessInfo} from "@/interfaces/users/userLoginSuccessInfo";
import {useUserContext} from "@/utils/user/user-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useLoginSave from "@/hooks/auth/use-login-save";

const useResetPassword = () => {
  const navigation = useNavigation();
  const {onRequest, isLoading} = useRequest<UserLoginSuccessInfo>();
  const saveLoginResult = useLoginSave();

  const onResetPassword = async (email: string, code: string, password: string) => {
    const body: ForgetPasswordInfo = {
      code,
      email,
      password,
    };
    const response = await onRequest(userApi.resetPassword, [], body, false);
    const userInfo = response.result;
    if (userInfo != null) {
      await saveLoginResult(userInfo);
      navigation.navigate("auth/verify-success-screen", {email});
    } else {
      Alert.alert('verification failed');
    }
  };

  return {onResetPassword, isLoading}
}

export default useResetPassword;
