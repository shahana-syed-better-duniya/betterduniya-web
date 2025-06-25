import {styles} from "@/utils/auth/styles";
import {KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View} from "react-native";
import React from "react";
<<<<<<< HEAD:app/auth/screen-layout.tsx
import Feather from 'react-native-vector-icons/Feather';
import { Shadow } from 'react-native-shadow-2';
=======
import AppLogo from "@/components/layouts/AppLogo";
>>>>>>> b0f807f818e79cecc41536bff2da71b75014629e:components/auth/AuthScreenLayout.tsx

interface LayoutProps {
  children: React.ReactElement;
  containerHeight?: number;
}

<<<<<<< HEAD:app/auth/screen-layout.tsx
const ScreenLayout: React.FC<LayoutProps> = ({children, containerHeight}) => {
=======
const AuthScreenLayout: React.FC<LayoutProps> = ({children}) => {
>>>>>>> b0f807f818e79cecc41536bff2da71b75014629e:components/auth/AuthScreenLayout.tsx
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
              <AppLogo/>
            </View>
            <Text style={styles.title}>Better Duniya</Text>
          </View>
          <Shadow
          distance={20}                // slightly larger spread for softer edge
          offset={[0, 40]}              // more realistic downward shift
          startColor={'#00000025'}     // slightly darker but still subtle
          sides={{ top: false }}       // no top shadow — clean drop effect
          >
            <View style={{height: containerHeight, width: '100%', overflow: 'visible', borderRadius: 30}}>
              
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
