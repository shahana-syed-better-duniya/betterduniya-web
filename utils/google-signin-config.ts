import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: '365559828766-e3ebe5cujt9r4s7vb6o2v1rfbuojgs4v.apps.googleusercontent.com',
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