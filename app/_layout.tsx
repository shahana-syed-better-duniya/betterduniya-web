import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';
import React from "react";
import {UserProvider} from "@/utils/user/user-provider";
import {ProductReviewProvider} from "@/utils/products/product-review-provider";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <UserProvider>
      <ProductReviewProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="+not-found"/>
            <Stack.Screen
              name="/auth/verify-email-screen"
              options={{title: "Verify Email", headerShown: false}}
            />
            <Stack.Screen
              name="/auth/verify-success-screen"
              options={{title: "Verify Email", headerShown: false}}
            />
          </Stack>
          <StatusBar style="auto"/>
        </ThemeProvider>
      </ProductReviewProvider>
    </UserProvider>

  );
}
