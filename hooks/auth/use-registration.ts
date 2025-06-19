import {userApi} from "@/api/user/user";
import {useRouter} from "expo-router";
import useRequest from "@/hooks/api/use-request";
import {RegistrationResult} from "@/interfaces/users/registrationResult";
import {Alert} from "react-native";

const useRegistration = () => {
  const router = useRouter();
  const {onRequest, isLoading} = useRequest<RegistrationResult>();

  const onSignUp = async (email: string, username: string, password: string, firstName: string, lastName: string) => {
    const body = {
      email,
      username,
      password,
      firstName,
      lastName,
    }
    try {
      const response = await onRequest(userApi.registerAccount, [], body, false);
      if (response.result?.isRegistered) {
        router.navigate(`/(auth)/main/email?email=${email}`);
      } else {
        // Handle validation errors from the backend
        if (!response.result?.isEmailValid) {
          Alert.alert("Invalid email format.");
        } else if (response.result?.isEmailDuplicated) {
          Alert.alert("This email is already registered.");
        } else {
          Alert.alert("Registration failed. Please check your details.");
        }
      }
    } catch (error) {
      console.error("Sign-up failed:", error);
      Alert.alert("An error occurred. Please try again later.");
    }
  };


  return {
    onSignUp,
    isLoading,
  }
}

export default useRegistration;
