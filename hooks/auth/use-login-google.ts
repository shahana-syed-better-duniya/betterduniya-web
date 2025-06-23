import {authorize} from "react-native-app-auth";
import {Alert} from "react-native";
import {oauthConfig} from "@/constants/oauth";


const useLoginGoogle = () => {
  const onLogin = async () => {
    try {
      const result = await authorize(oauthConfig);
      console.log(result.accessToken);
      Alert.alert(result.accessToken);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    onLogin
  }
}

export default useLoginGoogle;
