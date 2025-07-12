import * as SecureStore from 'expo-secure-store';
import {Platform} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isMobile = Platform.OS !== 'web';
const getItemAsync = isMobile ? SecureStore.getItemAsync : AsyncStorage.getItem;
const setItemAsync = isMobile ? SecureStore.setItemAsync : AsyncStorage.setItem;
const removeItemAsync = isMobile ? SecureStore.deleteItemAsync : AsyncStorage.removeItem;


const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const REFRESH_TOKEN_EXPIRY_KEY = 'refreshTokenExpiry';

const useAuthTokens = () => {
  const onGetAccessToken = async () => {
    return await getItemAsync(ACCESS_TOKEN_KEY)
  }

  const onGetRefreshToken = async () => {
    return await getItemAsync(REFRESH_TOKEN_KEY);
  };

  const onGetRefreshTokenExpiry = async () => {
    return await getItemAsync(REFRESH_TOKEN_EXPIRY_KEY);
  };

  const onSetAccessToken = async (accessToken: string) => {
    await setItemAsync(ACCESS_TOKEN_KEY, accessToken);
  }

  const onSetRefreshToken = async (refreshToken: string) => {
    await setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
  }

  const onSetRefreshTokenExpiry = async (refreshTokenExpiry: string) => {
    await setItemAsync(REFRESH_TOKEN_EXPIRY_KEY, refreshTokenExpiry);
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
