import AppLogo from "@/components/layouts/AppLogo";
import { AppConfigs } from "@/constants/app-configs";
import { styles } from "@/utils/auth/styles";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Layout = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default Layout;
