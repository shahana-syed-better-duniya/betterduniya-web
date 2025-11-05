/**
 * Enhanced Axios instance with automatic token refresh
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Import the base instance
import axiosInstance, { backendUrl } from './axioInstance';

const isMobile = Platform.OS !== 'web';
const getItemAsync = isMobile ? SecureStore.getItemAsync : AsyncStorage.getItem;
const setItemAsync = isMobile ? SecureStore.setItemAsync : AsyncStorage.setItem;

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  
  failedQueue = [];
};

// Enhanced response interceptor with automatic token refresh
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("🌐 [Axios] ✅ Request successful:", response.config.url, "Status:", response.status);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.log("🌐 [Axios] ❌ Request failed:", error.config?.url);
    console.log("🌐 [Axios] ❌ Status:", error.response?.status);

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("🔄 [Axios] 401 detected - attempting token refresh...");

      if (isRefreshing) {
        console.log("🔄 [Axios] Refresh already in progress - queuing request");
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axiosInstance(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getItemAsync("bd_refresh_token");
        
        if (!refreshToken) {
          console.error("🔄 [Axios] No refresh token available");
          processQueue(error, null);
          // Redirect to login or clear auth state
          return Promise.reject(error);
        }

        const refreshResponse = await fetch(`${backendUrl}/user/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({RefreshToken: refreshToken}),
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          const newAccessToken = data.accessToken;

          // Save new tokens
          await setItemAsync("bd_access_token", newAccessToken);
          if (data.refreshToken) {
            await setItemAsync("bd_refresh_token", data.refreshToken);
          }
          if (data.refreshTokenExpiry) {
            await setItemAsync("bd_refresh_token_expiry", data.refreshTokenExpiry);
          }

          console.log("🔄 [Axios] ✅ Token refresh successful");
          
          // Update the failed request with new token
          originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
          
          processQueue(null, newAccessToken);
          isRefreshing = false;
          
          // Retry the original request
          return axiosInstance(originalRequest);
        } else {
          console.error("🔄 [Axios] ❌ Token refresh failed");
          processQueue(error, null);
          isRefreshing = false;
          // Clear auth state and redirect to login
          return Promise.reject(error);
        }
      } catch (refreshError) {
        console.error("🔄 [Axios] ❌ Token refresh error:", refreshError);
        processQueue(refreshError, null);
        isRefreshing = false;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;