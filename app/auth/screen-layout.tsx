import {styles} from "@/app/auth/utils/styles";
import {Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View} from "react-native";
import React from "react";
import Feather from 'react-native-vector-icons/Feather';
import { Shadow } from 'react-native-shadow-2';

interface LayoutProps {
  children: React.ReactElement;
  containerHeight?: number;
}

const ScreenLayout: React.FC<LayoutProps> = ({children, containerHeight}) => {
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
              <Feather name="arrow-up-right" size={70} color="#FFC107" />
            </View>
            <Text style={styles.title}>better duniya</Text>
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

export default ScreenLayout;
