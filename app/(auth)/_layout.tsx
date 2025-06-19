import React from "react";
import {KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {styles} from "@/utils/auth/styles";
import BetterDuniyaLogo from "@/components/layouts/BetterDuniyaLogo";
import {Stack} from "expo-router";

const Layout = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoSection}>
            <View style={styles.logoCircle}>
              <BetterDuniyaLogo/>
            </View>
            <Text style={styles.title}>Better Duniya</Text>
          </View>
          <Stack>
            <Stack.Screen name="main" options={{headerShown: false}}/>
            <Stack.Screen name="forget" options={{headerShown: false}}/>
            <Stack.Screen name="verify" options={{headerShown: false}}/>
          </Stack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Layout;


const stylesLocal = StyleSheet.create({
  card: {
    margin: 20,
  }
})
