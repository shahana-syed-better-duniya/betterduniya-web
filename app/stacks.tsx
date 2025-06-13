import {useUserContext} from "@/utils/user/user-context";
import {Stack} from "expo-router";
import React from "react";
import {StatusBar} from "expo-status-bar";

const Stacks = () => {
  const {userId} = useUserContext();
  if (userId.length === 0) {
    return (
      <Stack>
        <Stack.Screen name="auth/index" options={{ headerShown: false }} />
      </Stack>
    )
  }
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        <Stack.Screen name="+not-found"/>
        <Stack.Screen
          name="auth/verify-email-screen" options={{ headerShown: false }}
        />
        <Stack.Screen
          name="auth/verify-success-screen" options={{ headerShown: false }}
        />
        <Stack.Screen name="auth/index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto"/>
    </>
  )
}

export default Stacks;
