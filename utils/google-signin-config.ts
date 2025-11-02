import { oauthConfig } from '@/constants/oauth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  console.log('🔧 [Google Config] Starting Google Sign-In configuration...');
  console.log('🔧 [Google Config] Client ID:', oauthConfig.clientId);
  
  const config = {
    webClientId: oauthConfig.clientId,
    offlineAccess: false,
    hostedDomain: '',
    forceCodeForRefreshToken: true,
    accountName: '',
  };
  
  console.log('🔧 [Google Config] Configuration object:', JSON.stringify(config, null, 2));
  
  GoogleSignin.configure(config);
  console.log('✅ [Google Config] GoogleSignin.configure() completed');
};

export const isGoogleSignInConfigured = async (): Promise<boolean> => {
  try {
    await GoogleSignin.hasPlayServices();
    return true;
  } catch (error) {
    return false;
  }
};