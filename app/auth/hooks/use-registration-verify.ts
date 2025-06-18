import {useNavigation} from "expo-router";
import useRequest from "@/hooks/api/use-request";
import {userApi} from "@/api/user/user";
import {Alert} from "react-native";
import {UserLoginSuccessInfo} from "@/interfaces/users/userLoginSuccessInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useUserContext} from "@/utils/user/user-context";

const useRegistrationVerify = () => {
  const navigation = useNavigation();
  const {onRequest, isLoading} = useRequest<UserLoginSuccessInfo>();
  const {setUserContext} = useUserContext();

  const onVerify = async (email: string, code: string) => {
    const response = await onRequest(userApi.verifyAccount, [email, code], null, false);
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

  return {onVerify, isLoading}
}

export default useRegistrationVerify;
