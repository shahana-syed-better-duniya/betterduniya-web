import {Redirect} from 'expo-router';
import React from "react";
import {Alert, Linking} from "react-native";

Linking.addEventListener('url', (event) => {
  Alert.alert('Deep link triggered:', event.url);
});
export default function Index() {
  return <Redirect href="/(auth)/main"/>;
}
