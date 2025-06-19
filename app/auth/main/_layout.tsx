import {Stack} from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="login"/>
      <Stack.Screen name="signup"/>
    </Stack>
  )
}

export default Layout;
