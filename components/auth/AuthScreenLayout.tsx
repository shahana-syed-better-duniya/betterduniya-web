import AppLogo from "@/components/layouts/AppLogo";
import { styles } from "@/utils/auth/styles";
import React from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Shadow } from 'react-native-shadow-2';

interface LayoutProps {
  children: React.ReactElement;
  containerHeight?: number;
}

const AuthScreenLayout: React.FC<LayoutProps> = ({children}) => {
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        enabled={true}
      >
        <ScrollView
          contentContainerStyle={{...styles.scrollContent, flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          automaticallyAdjustKeyboardInsets={true}
        >
          <View style={styles.logoSection}>
            <View style={styles.logoCircle}>
              <AppLogo/>
            </View>
            <Text style={styles.title}>better duniya</Text>
          </View>
          <Shadow
          distance={20}                // slightly larger spread for softer edge
          offset={[0, 40]}              // more realistic downward shift
          startColor={'#00000025'}     // slightly darker but still subtle
          sides={{ top: false }}       // no top shadow — clean drop effect
          >
            <View style={{height: '100%', width: '100%', overflow: 'visible', borderRadius: 30}}>
              
              <View style={styles.card}>
                {children}
              </View>
            </View>

          </Shadow>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default AuthScreenLayout;
