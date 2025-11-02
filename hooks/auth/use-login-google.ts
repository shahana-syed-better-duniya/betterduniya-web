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
    console.log('🚀 [Google Login] Starting Google Sign-In process...');
    
    try {
      // Configure Google Sign-In first
      console.log('⚙️  [Google Login] Step 1: Configuring Google Sign-In...');
      configureGoogleSignIn();
      console.log('✅ [Google Login] Configuration completed successfully');

      // Check if device supports Google Play Services
      console.log('🔍 [Google Login] Step 2: Checking Google Play Services...');
      await GoogleSignin.hasPlayServices();
      console.log('✅ [Google Login] Google Play Services available');

      // Sign in and get the ID token
      console.log('👤 [Google Login] Step 3: Starting GoogleSignin.signIn()...');
      const userInfo = await GoogleSignin.signIn();
      console.log('📋 [Google Login] GoogleSignin.signIn() completed');
      console.log('📋 [Google Login] UserInfo structure:', JSON.stringify(userInfo, null, 2));
      
      // Try different ways to extract the ID token based on different SDK versions
      const idToken = (userInfo as any).idToken || (userInfo as any).data?.idToken || (userInfo as any).user?.idToken;
      console.log('🔑 [Google Login] ID Token extracted:', idToken ? `Token received (${idToken.substring(0, 20)}...)` : 'NO TOKEN');

      if (!idToken) {
        console.error('❌ [Google Login] No ID token in userInfo object');
        throw new Error('No ID token received from Google');
      }

      // Send ID token to backend (this matches what backend expects)
      console.log('🌐 [Google Login] Step 4: Sending ID token to backend...');
      const body = { credential: idToken };
      console.log('📤 [Google Login] Request body:', JSON.stringify(body, null, 2));
      
      const response = await onRequest(userAuthApi.loginAccountByGoogle, [], body, false);
      console.log('📥 [Google Login] Backend response received:', JSON.stringify(response, null, 2));
      
      const loginResult = response.result;
      console.log('🔐 [Google Login] Login result:', loginResult ? 'Result received' : 'No result');

      if (loginResult && loginResult.accessToken && loginResult.accessToken.length > 0) {
        console.log('💾 [Google Login] Step 5: Saving login credentials...');
        await saveLoginResult(loginResult);
        console.log('✅ [Google Login] Credentials saved successfully');
        
        console.log('🏠 [Google Login] Step 6: Navigating to home screen...');
        router.replace('/(tabs)/home');
        console.log('✅ [Google Login] Navigation completed successfully');
      } else {
        console.log('⚠️  [Google Login] No valid login result from backend');
        throw new Error('No user found. Please register first with email/password.');
      }
    } catch (error: any) {
      console.error('❌ [Google Login] Error occurred:', error);
      console.error('❌ [Google Login] Error code:', error.code);
      console.error('❌ [Google Login] Error message:', error.message);
      console.error('❌ [Google Login] Full error object:', JSON.stringify(error, null, 2));
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('🚫 [Google Login] User cancelled sign-in');
        throw new Error('Sign in was cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('⏳ [Google Login] Sign-in already in progress');
        throw new Error('Sign in is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('📱 [Google Login] Google Play Services not available');
        throw new Error('Play services not available');
      } else {
        console.log('💥 [Google Login] Generic error occurred');
        throw new Error(error.message || 'Google sign-in failed');
      }
    }
  };

  return {
    onLogin,
  };
};

export default useLoginGoogle;
