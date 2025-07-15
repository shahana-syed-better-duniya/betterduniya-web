// app/(pages)/settings.tsx
import {useNavigation} from 'expo-router';
import {useLayoutEffect} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import useLogout from "@/hooks/auth/use-logout";

export default function SettingsScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Settings', // change this to whatever you want
      headerStyle: {
        backgroundColor: '#f0f0f0',
      },
      headerTintColor: '#222',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  const {onLogout} = useLogout();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
        <Icon name={'log-out-outline'} size={height * 0.02} color="white" style={{marginRight: 6}}/>
        <Text style={{color: 'white', fontSize: height * 0.015}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutBtn: {
    padding: height * 0.015,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: height * 0.02,
    backgroundColor: '#ff255b',
    width: '90%',
    borderRadius: 20,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 4},
    elevation: 3,
  },
});
