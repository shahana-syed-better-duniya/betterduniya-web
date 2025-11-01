import { useUserContext } from '@/utils/user/user-context';
import { Redirect } from 'expo-router';
import React from "react";
import { ActivityIndicator, Linking, View } from "react-native";

Linking.addEventListener('url', (event) => {
  // Alert.alert('Deep link triggered:', event.url);
});

export default function Index() {
  const { isLoaded, userId } = useUserContext();

  if (!isLoaded) {
    // Show loading spinner while context is being restored
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Redirect based on whether user is logged in
  return <Redirect href={userId ? '/(tabs)/home' : '/(auth)/main'} />;
}
