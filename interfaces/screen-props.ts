export type RootStackParamList = {
  'auth/verify-email-screen': { email: string };
  'auth/verify-success-screen': { email: string };
  'auth/forget-password-screen': undefined;
  'auth/forget-password-verify-screen': { email: string };
  'auth/forget-password-reset-screen': { email: string, code: string };
  'home/feed-screen': undefined;
  '/(tabs)/home-screen': undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {
    }
  }
}
