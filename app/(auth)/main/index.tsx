import React, {useRef, useState} from "react";
import {Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Signup from "@/app/(auth)/main/signup";
import Login from "@/app/(auth)/main/login";
import {THEMES} from "@/constants/themes";

export default function LoginScreen() {
  const [activeTab, setActiveTab] = useState("login");
  const slideAnim = useRef(new Animated.Value(0)).current; // Animation value

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    Animated.timing(slideAnim, {
      toValue: tab === "login" ? 0 : 1, // 0 for login, 1 for signup
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Interpolate animated value to calculate sliding position
  const slidePosition = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "50%"], // Adjust percentages based on button width
  });

  return (
    <View style={stylesLocal.card}>
      <View style={stylesLocal.tabRow}>
        <Animated.View
          style={[
            stylesForSlide.slidingBackground,
            {left: slidePosition},
          ]}
        />
        <TouchableOpacity
          style={stylesLocal.tabBtn}
          onPress={() => handleTabPress("login")}
        >
          <Text
            style={[
              stylesLocal.tabText,
              activeTab === "login" && stylesLocal.tabTextActive,
            ]}
          >
            Log In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={stylesLocal.tabBtn}
          onPress={() => handleTabPress("signup")}
        >
          <Text
            style={[
              stylesLocal.tabText,
              activeTab === "signup" && stylesLocal.tabTextActive,
            ]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      {activeTab === "login" ? <Login/> : <Signup/>}
    </View>
  );
}

const {width, height} = Dimensions.get("window");
const CARD_WIDTH = Math.min(width * 0.92, 420);

const stylesLocal = StyleSheet.create({
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 30,
  },
  tabRow: {
    flexDirection: "row",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    width: "100%",
    justifyContent: "center",
    marginBottom: 26,
  },
  tabTextActive: {
    color: "#fff",
  },
  tabText: {
    fontSize: 16,
    fontWeight: 700,
    color: THEMES.PRIMARY,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 28,
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 6,
    minHeight: 340,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 8}, // more height to push shadow down only
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5, // slightly higher for thicker shadow on Android
  }
})

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
    backgroundColor: THEMES.PRIMARY,
    width: "50%",
    height: "100%",
    borderRadius: 25,
    zIndex: 0,
  },
};
