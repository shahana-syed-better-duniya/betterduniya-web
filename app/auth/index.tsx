import LogInPanel from "@/app/(auth)/main/login";
import SignUpPanel from "@/app/(auth)/main/signup";
import ScreenLayout from "@/components/auth/AuthScreenLayout";
import { styles } from "@/utils/auth/styles";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, } from "react-native";

export default function LoginScreen() {
  const [activeTab, setActiveTab] = useState("login");
    const containerHeight = activeTab === "login" ? 420 : 550;  // example heights

  return (
    <ScreenLayout containerHeight={containerHeight}>
      <>
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
          <LogInPanel/>
        ) : (
          <SignUpPanel/>
        )}
      </>
    </ScreenLayout>
  );
}
