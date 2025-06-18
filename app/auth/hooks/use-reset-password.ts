import {useNavigation} from "expo-router";
import useRequest from "@/hooks/api/use-request";
import {userApi} from "@/api/user/user";
import {Alert} from "react-native";
import ForgetPasswordInfo from "@/interfaces/users/forgetPasswordInfo";
import {UserLoginSuccessInfo} from "@/interfaces/users/userLoginSuccessInfo";
import {useUserContext} from "@/utils/user/user-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useResetPassword = () => {
  const navigation = useNavigation();
  const {onRequest, isLoading} = useRequest<UserLoginSuccessInfo>();
  const {setUserContext} = useUserContext();

  const onResetPassword = async (email: string, code: string, password: string) => {
    const body: ForgetPasswordInfo = {
      code,
      email,
      password,
    };
    const response = await onRequest(userApi.resetPassword, [], body, false);
    const userInfo = response.result;
    if (userInfo != null) {
      setUserContext({
        userId: userInfo.userId,
        username: userInfo.userName,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        userRole: userInfo.userRole
      });
      await AsyncStorage.setItem('token', userInfo.accessToken);
      navigation.navigate("auth/verify-success-screen", {email});
    } else {
      Alert.alert('verification failed');
    }
  };

  return {onResetPassword, isLoading}
}

export default useResetPassword;
