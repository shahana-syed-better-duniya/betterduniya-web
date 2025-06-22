import {authorize} from "react-native-app-auth";
import {Alert} from "react-native";

const GOOGLE_OAUTH_APP_GUID = '365559828766-e3ebe5cujt9r4s7vb6o2v1rfbuojgs4v';
const config = {
  issuer: 'https://accounts.google.com',
  clientId: `${GOOGLE_OAUTH_APP_GUID}.apps.googleusercontent.com`,
  redirectUrl: `com.googleusercontent.apps.${GOOGLE_OAUTH_APP_GUID}:/oauth2redirect/google`,
  scopes: ['openid', 'profile'],
};

const useLoginGoogle = () => {
  const onLogin = async () => {
    try {
      const result = await authorize(config);
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
