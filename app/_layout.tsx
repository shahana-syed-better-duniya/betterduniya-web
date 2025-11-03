import useLogoutTimer from "@/hooks/auth/use-logout-timer";
import { configureGoogleSignIn } from "@/utils/google-signin-config";
import { ProductReviewProvider } from "@/utils/products/product-review-provider";
import { UserProvider } from "@/utils/user/user-provider";
import { Jura_400Regular, useFonts } from '@expo-google-fonts/jura';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

// ----------------------------
// Screens inside Stack
// ----------------------------
const LayoutScreens = () => {
  // Start logout timer (auto logout after inactivity)
  useLogoutTimer();

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

// ----------------------------
// Main Layout wrapped with Providers
// ----------------------------
const Layout = () => {
  // Load fonts
  let [fontsLoaded] = useFonts({
    Jura_400Regular,
  });

  // Configure Google Sign-In on app start
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    // Provide global user state
    <UserProvider>
      {/* Provide product review context */}
      <ProductReviewProvider>
        {/* Stack Screens */}
        <LayoutScreens />
        {/* Status bar for the app */}
        <StatusBar style="auto" />
      </ProductReviewProvider>
    </UserProvider>
  );
};

export default Layout;
