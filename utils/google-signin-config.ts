import { oauthConfig } from '@/constants/oauth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: oauthConfig.clientId,
    offlineAccess: false,
    hostedDomain: '',
    forceCodeForRefreshToken: true,
    accountName: '',
  });
};

export const isGoogleSignInConfigured = async (): Promise<boolean> => {
  try {
    await GoogleSignin.hasPlayServices();
    return true;
  } catch (error) {
    return false;
  }
};