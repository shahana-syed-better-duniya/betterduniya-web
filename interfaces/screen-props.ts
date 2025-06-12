import {ProductReviewSummary} from "@/interfaces/products/productReviewSummary";

export type RootStackParamList = {
  'auth/verify-email-screen': { email: string };
  'auth/verify-success-screen': { email: string };
  'auth/forget-password-screen': undefined;
  'auth/forget-password-verify-screen': { email: string };
  'auth/forget-password-reset-screen': { email: string, code: string };
  'auth/login-screen': undefined;
  '/(tabs)/home-screen': undefined;
  'home/feed-screen': { summary: ProductReviewSummary };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {
    }
  }
}
