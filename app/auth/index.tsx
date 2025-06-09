import React, {useState} from "react";
import {Text, TouchableOpacity, View,} from "react-native";
import {styles} from "@/app/auth/utils/styles";
import SignUpPanel from "@/app/auth/signup-panel";
import LogInPanel from "@/app/auth/login-panel";
import ScreenLayout from "@/app/auth/screen-layout";

export default function LoginScreen() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <ScreenLayout>
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
