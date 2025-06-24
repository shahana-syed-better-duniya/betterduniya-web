import {authorize} from "react-native-app-auth";
import {oauthConfig} from "@/constants/oauth";
import useRequest from "@/hooks/api/use-request";
import {userApi} from "@/api/user/user";
import {UserLoginSuccessInfo} from "@/interfaces/users/userLoginSuccessInfo";
import useLoginSave from "@/hooks/auth/use-login-save";


const useLoginGoogle = () => {
  const {onRequest} = useRequest<UserLoginSuccessInfo>();

  const onSave = useLoginSave();

  const onLogin = async () => {
    try {
      const result = await authorize(oauthConfig);
      const body = {credential: result.idToken};
      const response = await onRequest(userApi.loginAccountByGoogle, [], body, false)
      if (response.result) {
        await onSave(response.result);
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
