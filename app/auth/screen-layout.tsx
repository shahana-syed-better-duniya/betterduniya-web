import {styles} from "@/app/auth/utils/styles";
import {Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View} from "react-native";
import React from "react";

interface LayoutProps {
  children: React.ReactElement;
}

const ScreenLayout: React.FC<LayoutProps> = ({children}) => {
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
              <Image
                source={require("@/assets/images/duniya.png")}
                style={styles.logoImage}
              />
            </View>
            <Text style={styles.title}>Better Duniya</Text>
          </View>
          <View style={styles.card}>
            {children}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ScreenLayout;
