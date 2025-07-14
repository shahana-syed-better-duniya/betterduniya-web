import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {UserProvider} from "@/utils/user/user-provider";
import {ProductReviewProvider} from "@/utils/products/product-review-provider";
import useLogoutTimer from "@/hooks/auth/use-logout-timer";

const LayoutScreens = ()=> {
  useLogoutTimer();
  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{headerShown: false}}/>
      <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
      <Stack.Screen name="+not-found"/>
    </Stack>
  )
}

const Layout = () => {
  return (
    <UserProvider>
      <ProductReviewProvider>
        <LayoutScreens/>
        <StatusBar style="auto"/>
      </ProductReviewProvider>
    </UserProvider>
  )
}

export default Layout;
