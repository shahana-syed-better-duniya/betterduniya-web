import {Tabs} from 'expo-router';
import React from 'react';
import {Image, Platform} from 'react-native';

import {HapticTab} from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';

import {Ionicons} from "@expo/vector-icons";


// Avatar URL for profile tab (replace with your user's avatar if needed)
const AVATAR_URL = "https://randomuser.me/api/portraits/men/32.jpg";


export default function TabLayout() {
  const activeColor = "#222"; // strong black for active
  const inactiveColor = "#B8B8B8"; // gray for inactive

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: "#F7F7FA",
          borderTopColor: "#F2F0FF",
          borderTopWidth: 1,
          height: 64,
          ...Platform.select({
            ios: {position: 'absolute'},
            default: {},
          }),
        },
      }}
    >
      <Tabs.Screen
        name="home-screen"
        options={{
          title: "",
          tabBarIcon: ({color, focused, size}) => (
            <Image
              source={require("../../assets/images/homeicon.png")}
              style={{
                width: size,
                height: size,
                tintColor: focused ? color : "#888", // Optional: Tint if it's a monochrome icon
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="feed-screen"
        options={{
          title: "",
          tabBarIcon: ({color, focused, size}) => (
            <Image
              source={require("../../assets/images/networkicon.png")}
              style={{
                width: size,
                height: size,
                tintColor: focused ? color : "#888", // Optional: Tint if it's a monochrome icon
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="review-screen"
        options={{
          title: "",
          tabBarIcon: ({color, focused, size}) => (
            <Ionicons name="arrow-up-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="product-screen"
        options={{
          title: "",
          tabBarIcon: ({color, focused, size}) => (
            <Image
              source={require("../../assets/images/staricon.png")}
              style={{
                width: size,
                height: size,
                tintColor: focused ? color : "#888", // Optional: Tint if it's a monochrome icon
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile-screen"
        options={{
          title: "",
          tabBarIcon: ({focused}) => (
            <Image
              source={{uri: AVATAR_URL}}
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                borderWidth: focused ? 2 : 0,
                borderColor: focused ? "#FFC107" : "#fff",
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
