import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';
import React from "react";
import {UserProvider} from "@/utils/user/user-provider";
import {ProductReviewProvider} from "@/utils/products/product-review-provider";
import Stacks from "@/app/stacks";

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
          <Stacks/>
        </ThemeProvider>
      </ProductReviewProvider>
    </UserProvider>

  );
}
