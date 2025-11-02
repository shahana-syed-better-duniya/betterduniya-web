import { userAuthApi } from "@/api/user/userAuth";
import { oauthConfig } from "@/constants/oauth";
import useRequest from "@/hooks/api/use-request";
import useLoginSave from "@/hooks/auth/use-login-save";
import { UserLoginSuccessInfo } from "@/interfaces/users/userLoginSuccessInfo";
import { makeRedirectUri } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { router } from "expo-router";


const useLoginGoogle = () => {
  const {onRequest} = useRequest<UserLoginSuccessInfo>();
  const saveLoginResult = useLoginSave();

  const redirectUri = makeRedirectUri({
    scheme: oauthConfig.scheme,
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: oauthConfig.clientId,
    redirectUri,
    scopes: oauthConfig.scopes,
    responseType:'code'
  },);

  const onLogin = async () => {
    try {
      const result = await promptAsync();
      if (result.type === 'success') {
        const code = result.params.code;

        // Exchange the authorization code for an access token or ID token
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `code=${code}&client_id=${oauthConfig.clientId}&redirect_uri=${redirectUri}&grant_type=authorization_code&code_verifier=${request?.codeVerifier}`,
        });

        const tokenResponseJson = await tokenResponse.json();
        const body = {credential: tokenResponseJson.id_token};

        const response = await onRequest(userAuthApi.loginAccountByGoogle, [], body, false);
        const userInfo = response.result;
        if (userInfo) {
          await saveLoginResult(userInfo);
          if (userInfo.accessToken.length > 0) {
            router.replace('/(tabs)/home');
          }
        } else {
          console.error('UserLoginSuccessInfo is null');
        }
      } else {
        console.log('Authentication failed or cancelled');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return {
    onLogin,
    request,
    response,
  };
};

export default useLoginGoogle;
