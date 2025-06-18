import React, { useState, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/app/auth/utils/styles";
import SignUpPanel from "@/app/auth/signup-panel";
import LogInPanel from "@/app/auth/login-panel";
import ScreenLayout from "@/app/auth/screen-layout";

export default function LoginScreen() {
  const [activeTab, setActiveTab] = useState("login");
  const slideAnim = useRef(new Animated.Value(0)).current; // Animation value

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);

    // Animate the sliding effect
    Animated.timing(slideAnim, {
      toValue: tab === "login" ? 0 : 1, // 0 for login, 1 for signup
      duration: 300, // Duration of animation in ms
      useNativeDriver: false,
    }).start();
  };

  // Interpolate animated value to calculate sliding position
  const slidePosition = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "50%"], // Adjust percentages based on button width
  });

  return (
    <ScreenLayout>
      <>
        <View style={styles.tabRow}>
          <Animated.View
            style={[
              stylesForSlide.slidingBackground,
              { left: slidePosition },
            ]}
          />
          <TouchableOpacity
            style={styles.tabBtn}
            onPress={() => handleTabPress("login")}
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
            style={styles.tabBtn}
            onPress={() => handleTabPress("signup")}
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
        {activeTab === "login" ? <LogInPanel /> : <SignUpPanel />}
      </>
    </ScreenLayout>
  );
}

export const stylesForSlide = {
  tabRow: {
    flexDirection: "row",
    position: "relative",
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    overflow: "hidden",
    marginVertical: 20,
    width: "90%",
    alignSelf: "center",
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    zIndex: 1,
  },
  tabText: {
    fontSize: 16,
    color: "#888",
  },
  tabTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  slidingBackground: {
    position: "absolute",
    backgroundColor: "#fdb900",
    width: "50%",
    height: "100%",
    borderRadius: 25,
    zIndex: 0,
  },
};
