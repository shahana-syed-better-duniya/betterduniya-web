export type RootStackParamList = {
  'auth/verify-email-screen': { email: string };
  'auth/verify-success-screen': { email: string };
  'home/feed-screen': undefined;
  '/(tabs)/home-screen': undefined; // <-- add this!
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
