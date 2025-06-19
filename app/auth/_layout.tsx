import React from "react";
import {KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View} from "react-native";
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
          <View style={styles.card}>
            <Stack>
              <Stack.Screen name="main"/>
              <Stack.Screen name="forget"/>
              <Stack.Screen name="verify"/>
            </Stack>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Layout;
