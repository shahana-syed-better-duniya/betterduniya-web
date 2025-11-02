// This file is no longer used - we switched to browser-based OAuth with expo-auth-session
// The native Google Sign-In SDK was causing DEVELOPER_ERROR issues with SHA-1 fingerprints

export const configureGoogleSignIn = () => {
  console.log('⚠️  [Google Config] This function is deprecated - using browser OAuth instead');
};

export const isGoogleSignInConfigured = async (): Promise<boolean> => {
  console.log('⚠️  [Google Config] This function is deprecated - using browser OAuth instead');
  return true;
};