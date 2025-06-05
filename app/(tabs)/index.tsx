import React, {useState} from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useString from "@/hooks/primitive/use-string";
import {styles} from "@/app/auth/styles";
import SignUpPanel from "@/app/auth/signup-panel";
import LogInPanel from "@/app/auth/login-panel";
import useRequest from "@/hooks/api/use-request";
import {userApi} from "@/api/user/user";

export default function LoginScreen() {
  const {onRequest} = useRequest();
  const [activeTab, setActiveTab] = useState("login");

  // Log In fields
  const loginUsername = useString("");
  const loginPassword = useString("");

  // Sign Up fields
  const signupUsername = useString("");
  const signupEmail = useString("");
  const signupPassword = useString("");
  const signupConfirmPassword = useString("");

  const onLogin = () => {
  };
  const onForgotPassword = () => {
  };
  const onSignUp = async (username: string, email: string, password: string) => {
    const body = {
      email,
      username,
      password,
    }
    await onRequest(userApi.registerAccount, [], body, false);
  };
  const onSocialPress = (provider: string) => {
  };

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
          {/* Logo and Title */}
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
            <View style={styles.tabRow}>
              <TouchableOpacity
                style={[
                  styles.tabBtn,
                  activeTab === "login" && styles.tabBtnActive,
                ]}
                onPress={() => setActiveTab("login")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "login" && styles.tabTextActive,
                  ]}
                >
                  Log In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabBtn,
                  activeTab === "signup" && styles.tabBtnActive,
                ]}
                onPress={() => setActiveTab("signup")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "signup" && styles.tabTextActive,
                  ]}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            {activeTab === "login" ? (
              <LogInPanel
                onForgotPassword={onForgotPassword}
                onLogin={onLogin}
                onSocialPress={onSocialPress}
                username={loginUsername}
                password={loginPassword}
              />
            ) : (
              <SignUpPanel
                onSignUp={onSignUp}
                username={signupUsername}
                email={signupEmail}
                password={signupPassword}
                confirmPassword={signupConfirmPassword}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
