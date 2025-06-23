import {Redirect} from 'expo-router';
import React from "react";
import {Linking} from "react-native";

Linking.addEventListener('url', (event) => {
  console.log('Deep link triggered:', event.url);
});
export default function Index() {
  return <Redirect href="/(auth)/main"/>;
}
