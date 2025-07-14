import React, {useEffect} from "react";
import {KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {styles} from "@/utils/auth/styles";
import AppLogo from "@/components/layouts/AppLogo";
import {SplashScreen, Stack} from "expo-router";
import {AppConfigs} from "@/constants/app-configs";
import {useFonts} from "expo-font";
import {Jura_400Regular} from "@expo-google-fonts/jura";

const Layout = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.logoSection}>
          <View style={styles.logoCircle}>
            <AppLogo/>
          </View>
          <Text style={styles.appTitle}>{AppConfigs.APP_NAME}</Text>
        </View>
        <Stack initialRouteName="main/index">
          <Stack.Screen name="main/index" options={{headerShown: false}}/>
          <Stack.Screen name="main/email" options={{headerShown: false}}/>
          <Stack.Screen name="forget" options={{headerShown: false}}/>
          <Stack.Screen name="verify/success" options={{headerShown: false}}/>
        </Stack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Layout;
