import {useNavigation} from "expo-router";
import useRequest from "@/hooks/api/use-request";
import {userApi} from "@/api/user/user";
import {Alert} from "react-native";

const useRegistrationVerify = () => {
  const navigation = useNavigation();
  const {onRequest, isLoading} = useRequest<boolean>();

  const onVerify = async (email: string, code: string) => {
    const response = await onRequest(userApi.verifyAccount, [email, code], null, false);
    if (response.result) {
      navigation.navigate("auth/verify-success-screen", {email});
    } else {
      Alert.alert('verification failed');
    }
  };

  return {onVerify, isLoading}
}

export default useRegistrationVerify;
