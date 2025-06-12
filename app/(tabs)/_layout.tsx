import {Tabs} from 'expo-router';
import React from 'react';
import {Image, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {HapticTab} from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {useColorScheme} from '@/hooks/useColorScheme';

// Avatar URL for profile tab (replace with your user's avatar if needed)
const AVATAR_URL = "https://randomuser.me/api/portraits/men/32.jpg";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Icon color mapping (based on screenshot)
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
          backgroundColor: "#F5F5F5",
          borderTopWidth: 0,
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
          title: "Home",
          tabBarIcon: ({color, focused, size}) => (
            <Icon name="home-outline" size={28} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="feed-screen"
        options={{
          title: "Feeds",
          tabBarIcon: ({color, focused, size}) => (
            <Icon name="rss-outline" size={28} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="review-screen"
        options={{
          title: "Review",
          tabBarIcon: ({color, focused, size}) => (
            <Icon
              name="arrow-up-outline"
              size={28}
              color={color}
              style={{transform: [{rotate: "15deg"}]}} // Optional: slant arrow
            />
          ),
        }}
      />
      <Tabs.Screen
        name="product-screen"
        options={{
          title: "Product",
          tabBarIcon: ({color, focused, size}) => (
            <Icon name="star-outline" size={28} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="profile-screen"
        options={{
          title: "Profile",
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
