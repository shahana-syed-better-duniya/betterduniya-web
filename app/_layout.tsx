import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {UserProvider} from "@/utils/user/user-provider";
import {ProductReviewProvider} from "@/utils/products/product-review-provider";

const Layout = () => {
  return (
    <UserProvider>
      <ProductReviewProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{headerShown: false}}/>
          <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
          <Stack.Screen name="+not-found"/>
        </Stack>
        <StatusBar style="auto"/>
      </ProductReviewProvider>
    </UserProvider>
  )
}

export default Layout;
