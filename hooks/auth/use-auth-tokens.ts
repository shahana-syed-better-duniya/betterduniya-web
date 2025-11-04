import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import { Platform } from "react-native";

// Enhanced storage functions with better error handling and validation
const getItemAsync = async (key: string): Promise<string | null> => {
  try {
    console.log(`📱 [${Platform.OS}] Attempting to get item:`, key);
    const result = Platform.OS !== 'web' 
      ? await SecureStore.getItemAsync(key) 
      : await AsyncStorage.getItem(key);
    console.log(`📱 [${Platform.OS}] Get result for ${key}:`, result ? `Found (${result.length} chars)` : 'Not found');
    return result;
  } catch (error) {
    console.error(`❌ Error getting ${key} from storage:`, error);
    return null;
  }
};

const setItemAsync = async (key: string, value: string): Promise<void> => {
  try {
    console.log(`💾 [${Platform.OS}] Attempting to set item:`, key, `(${value.length} chars)`);
    if (Platform.OS !== 'web') {
      await SecureStore.setItemAsync(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
    console.log(`✅ [${Platform.OS}] Successfully stored ${key}`);
    
    // Immediate verification
    const verification = await getItemAsync(key);
    console.log(`🔍 [${Platform.OS}] Verification for ${key}:`, verification ? 'SUCCESS' : 'FAILED');
  } catch (error) {
    console.error(`❌ Error setting ${key} in storage:`, error);
    throw error;
  }
};

const removeItemAsync = async (key: string): Promise<void> => {
  try {
    if (Platform.OS !== 'web') {
      await SecureStore.deleteItemAsync(key);
    } else {
      await AsyncStorage.removeItem(key);
    }
    console.log(`🗑️ [${Platform.OS}] Successfully removed ${key}`);
  } catch (error) {
    console.error(`❌ Error removing ${key} from storage:`, error);
    throw error;
  }
};

// Use consistent prefixed keys to avoid conflicts
const ACCESS_TOKEN_KEY = 'bd_access_token';
const REFRESH_TOKEN_KEY = 'bd_refresh_token';
const REFRESH_TOKEN_EXPIRY_KEY = 'bd_refresh_token_expiry';

const useAuthTokens = () => {
  const onGetAccessToken = async () => {
    const token = await getItemAsync(ACCESS_TOKEN_KEY);
    console.log("🔍 onGetAccessToken result:", !!token ? `Found (${token?.length} chars)` : 'Not found');
    return token;
  }

  const onGetRefreshToken = async () => {
    const token = await getItemAsync(REFRESH_TOKEN_KEY);
    console.log("🔍 onGetRefreshToken result:", !!token ? `Found (${token?.length} chars)` : 'Not found');
    return token;
  };

  const onGetRefreshTokenExpiry = async () => {
    const expiry = await getItemAsync(REFRESH_TOKEN_EXPIRY_KEY);
    console.log("🔍 onGetRefreshTokenExpiry result:", expiry || 'Not found');
    return expiry;
  };

  const onSetAccessToken = async (accessToken: string) => {
    if (!accessToken || typeof accessToken !== 'string') {
      throw new Error('Invalid access token provided');
    }
    console.log("💾 onSetAccessToken: Starting save process...");
    await setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    console.log("✅ onSetAccessToken: Save completed successfully");
  }

  const onSetRefreshToken = async (refreshToken: string) => {
    if (!refreshToken || typeof refreshToken !== 'string') {
      throw new Error('Invalid refresh token provided');
    }
    console.log("💾 onSetRefreshToken: Starting save process...");
    await setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
    console.log("✅ onSetRefreshToken: Save completed successfully");
  }

  const onSetRefreshTokenExpiry = async (refreshTokenExpiry: string) => {
    if (!refreshTokenExpiry || typeof refreshTokenExpiry !== 'string') {
      throw new Error('Invalid refresh token expiry provided');
    }
    console.log("💾 onSetRefreshTokenExpiry: Starting save process...");
    await setItemAsync(REFRESH_TOKEN_EXPIRY_KEY, refreshTokenExpiry);
    console.log("✅ onSetRefreshTokenExpiry: Save completed successfully");
  };

  const onClearTokens = async () => {
    console.log("🗑️ onClearTokens: Starting token cleanup...");
    try {
      await Promise.all([
        removeItemAsync(ACCESS_TOKEN_KEY),
        removeItemAsync(REFRESH_TOKEN_KEY),
        removeItemAsync(REFRESH_TOKEN_EXPIRY_KEY)
      ]);
      console.log("✅ onClearTokens: All tokens cleared successfully");
    } catch (error) {
      console.error("❌ onClearTokens: Error clearing tokens:", error);
      throw error;
    }
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
