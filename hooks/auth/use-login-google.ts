import { userAuthApi } from "@/api/user/userAuth";
import useRequest from "@/hooks/api/use-request";
import useLoginSave from "@/hooks/auth/use-login-save";
import { UserLoginSuccessInfo } from "@/interfaces/users/userLoginSuccessInfo";
import { oauthConfig } from "@/constants/oauth";
import { router } from "expo-router";
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const useLoginGoogle = () => {
  const {onRequest} = useRequest<UserLoginSuccessInfo>();
  const saveLoginResult = useLoginSave();

  const onLogin = async () => {
    console.log('🚀 [Google Login] Starting browser-based Google Sign-In...');
    
    try {
      console.log('⚙️  [Google Login] Step 1: Setting up OAuth request...');
      console.log('🔧 [Google Login] Client ID:', oauthConfig.clientId);
      console.log('🔧 [Google Login] Redirect URL:', oauthConfig.redirectUrl);
      
      const request = new AuthSession.AuthRequest({
        clientId: oauthConfig.clientId,
        scopes: oauthConfig.scopes,
        redirectUri: oauthConfig.redirectUrl,
        responseType: AuthSession.ResponseType.IdToken,
        extraParams: {},
      });

      console.log('🌐 [Google Login] Step 2: Opening browser for authentication...');
      const result = await request.promptAsync({
        authorizationEndpoint: oauthConfig.authorizationEndpoint,
      });

      console.log('📋 [Google Login] Auth result type:', result.type);
      console.log('📋 [Google Login] Auth result:', JSON.stringify(result, null, 2));

      if (result.type === 'success') {
        console.log('✅ [Google Login] Authentication successful');
        
        // Extract ID token from the result
        const idToken = result.params.id_token;
        console.log('🔑 [Google Login] ID Token extracted:', idToken ? `Token received (${idToken.substring(0, 20)}...)` : 'NO TOKEN');

        if (!idToken) {
          console.error('❌ [Google Login] No ID token in auth result');
          throw new Error('No ID token received from Google');
        }

        // Send ID token to backend
        console.log('🌐 [Google Login] Step 3: Sending ID token to backend...');
        const body = { credential: idToken };
        console.log('📤 [Google Login] Request body:', JSON.stringify(body, null, 2));
        
        const response = await onRequest(userAuthApi.loginAccountByGoogle, [], body, false);
        console.log('📥 [Google Login] Backend response received:', JSON.stringify(response, null, 2));
        
        const loginResult = response.result;
        console.log('🔐 [Google Login] Login result:', loginResult ? 'Result received' : 'No result');

        if (loginResult && loginResult.accessToken && loginResult.accessToken.length > 0) {
          console.log('💾 [Google Login] Step 4: Saving login credentials...');
          await saveLoginResult(loginResult);
          console.log('✅ [Google Login] Credentials saved successfully');
          
          console.log('🏠 [Google Login] Step 5: Navigating to home screen...');
          router.replace('/(tabs)/home');
          console.log('✅ [Google Login] Navigation completed successfully');
        } else {
          console.log('⚠️  [Google Login] No valid login result from backend');
          throw new Error('No user found. Please register first with email/password.');
        }
      } else if (result.type === 'cancel') {
        console.log('🚫 [Google Login] User cancelled authentication');
        throw new Error('Authentication was cancelled');
      } else {
        console.log('❌ [Google Login] Authentication failed');
        console.log('📋 [Google Login] Result:', JSON.stringify(result, null, 2));
        throw new Error('Authentication failed');
      }
    } catch (error: any) {
      console.error('❌ [Google Login] Error occurred:', error);
      console.error('❌ [Google Login] Error message:', error.message);
      console.error('❌ [Google Login] Full error object:', JSON.stringify(error, null, 2));
      
      throw new Error(error.message || 'Google sign-in failed');
    }
  };

  return {
    onLogin,
  };
};

export default useLoginGoogle;
