export type RootStackParamList = {
  'auth/verify-email-screen': { email: string };
  'auth/verify-success-screen': { email: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {
    }
  }
}
