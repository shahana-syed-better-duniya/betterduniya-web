import {authorize} from "react-native-app-auth";
import {oauthConfig} from "@/constants/oauth";
import useRequest from "@/hooks/api/use-request";
import {userApi} from "@/api/user/userAuth";
import {UserLoginSuccessInfo} from "@/interfaces/users/userLoginSuccessInfo";
import useLoginSave from "@/hooks/auth/use-login-save";
import {router} from "expo-router";


const useLoginGoogle = () => {
  const {onRequest} = useRequest<UserLoginSuccessInfo>();

  const saveLoginResult = useLoginSave();

  const onLogin = async () => {
    try {
      const result = await authorize(oauthConfig);
      const body = {credential: result.idToken};
      const response = await onRequest(userApi.loginAccountByGoogle, [], body, false)
      const userInfo = response.result;
      if (userInfo) {
        await saveLoginResult(userInfo);
        if (userInfo.accessToken.length > 0) {
          router.replace('/(tabs)/home')
        }
      } else {
        console.error('UserLoginSuccessInfo is null');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    onLogin
  }
}

export default useLoginGoogle;
