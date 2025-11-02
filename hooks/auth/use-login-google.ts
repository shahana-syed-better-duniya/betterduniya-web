import { userAuthApi } from "@/api/user/userAuth";
import useRequest from "@/hooks/api/use-request";
import useLoginSave from "@/hooks/auth/use-login-save";
import { UserLoginSuccessInfo } from "@/interfaces/users/userLoginSuccessInfo";
import { configureGoogleSignIn } from "@/utils/google-signin-config";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { router } from "expo-router";


const useLoginGoogle = () => {
  const {onRequest} = useRequest<UserLoginSuccessInfo>();
  const saveLoginResult = useLoginSave();

  const onLogin = async () => {
    try {
      // Configure Google Sign-In first
      configureGoogleSignIn();

      // Check if device supports Google Play Services
      await GoogleSignin.hasPlayServices();

      // Sign in and get the ID token
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;

      if (!idToken) {
        throw new Error('No ID token received from Google');
      }

      // Send ID token to backend (this matches what backend expects)
      const body = { credential: idToken };
      const response = await onRequest(userAuthApi.loginAccountByGoogle, [], body, false);
      const loginResult = response.result;

      if (loginResult && loginResult.accessToken.length > 0) {
        await saveLoginResult(loginResult);
        router.replace('/(tabs)/home');
      } else {
        throw new Error('No user found. Please register first with email/password.');
      }
    } catch (error: any) {
      console.error('Google login error:', error);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw new Error('Sign in was cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        throw new Error('Sign in is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new Error('Play services not available');
      } else {
        throw new Error(error.message || 'Google sign-in failed');
      }
    }
  };

  return {
    onLogin,
  };
};

export default useLoginGoogle;
