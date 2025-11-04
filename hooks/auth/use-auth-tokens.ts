import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import { Platform } from "react-native";

// Dynamic platform checking functions
const getItemAsync = (key: string) => {
  return Platform.OS !== 'web' ? SecureStore.getItemAsync(key) : AsyncStorage.getItem(key);
};

const setItemAsync = (key: string, value: string) => {
  return Platform.OS !== 'web' ? SecureStore.setItemAsync(key, value) : AsyncStorage.setItem(key, value);
};

const removeItemAsync = (key: string) => {
  return Platform.OS !== 'web' ? SecureStore.deleteItemAsync(key) : AsyncStorage.removeItem(key);
};


const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const REFRESH_TOKEN_EXPIRY_KEY = 'refreshTokenExpiry';

const useAuthTokens = () => {
  const onGetAccessToken = async () => {
    try {
      const token = await getItemAsync(ACCESS_TOKEN_KEY);
      console.log("🔍 Retrieved access token:", !!token ? `Found (${token.length} chars)` : 'Not found');
      return token;
    } catch (error) {
      console.error("❌ Error retrieving access token:", error);
      return null;
    }
  }

  const onGetRefreshToken = async () => {
    return await getItemAsync(REFRESH_TOKEN_KEY);
  };

  const onGetRefreshTokenExpiry = async () => {
    return await getItemAsync(REFRESH_TOKEN_EXPIRY_KEY);
  };

  const onSetAccessToken = async (accessToken: string) => {
    console.log("📱 Platform:", Platform.OS);
    console.log("💾 Attempting to save access token to storage...");
    try {
      await setItemAsync(ACCESS_TOKEN_KEY, String(accessToken));
      console.log("✅ Access token saved to", Platform.OS === 'web' ? 'AsyncStorage (localStorage)' : 'SecureStore');
    } catch (error) {
      console.error("❌ Error saving access token:", error);
      throw error;
    }
  }

  const onSetRefreshToken = async (refreshToken: string) => {
    await setItemAsync(REFRESH_TOKEN_KEY, String(refreshToken));
  }

  const onSetRefreshTokenExpiry = async (refreshTokenExpiry: string) => {
    await setItemAsync(REFRESH_TOKEN_EXPIRY_KEY, String(refreshTokenExpiry));
  };

  const onClearTokens = async () => {
    await removeItemAsync(ACCESS_TOKEN_KEY);
    await removeItemAsync(REFRESH_TOKEN_KEY);
    await removeItemAsync(REFRESH_TOKEN_EXPIRY_KEY);
  };

  return {
    onGetAccessToken,
    onGetRefreshToken,
    onGetRefreshTokenExpiry,
    onSetAccessToken,
    onSetRefreshToken,
    onSetRefreshTokenExpiry,
    onClearTokens
  }
}

export default useAuthTokens;
