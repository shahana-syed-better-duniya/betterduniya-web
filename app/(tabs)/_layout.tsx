import {Tabs} from 'expo-router';
import React from 'react';
import {Image, Platform} from 'react-native';
import {HapticTab} from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import Feather from 'react-native-vector-icons/Feather';

const AVATAR_URL = "https://randomuser.me/api/portraits/men/32.jpg";

export default function TabLayout() {
  const activeColor = "#222";
  const inactiveColor = "#B8B8B8";

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
          shadowColor: '#e7e7e7',
          shadowRadius: 15,
          elevation: 15,
          height: 68,
          ...Platform.select({
            ios: {position: 'absolute'},
            default: {},
          }),
        },
      }}
    >
      <Tabs.Screen
        name="home"
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
        name="feed"

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
        name="review"
        options={{
          title: "",
          tabBarIcon: ({color, focused, size}) => (
              <Image
              source={require("../../assets/images/arrowicon.png")}
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
        name="product"
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
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({focused}) => (
            <Image
              source={require("../../assets/images/profile-default.png")}
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
