/**
 * axiosInstance.ts
 *
 * This file sets up a single Axios instance for all API calls.
 * Features:
 * 1. HTTPS enforced via `baseURL`
 * 2. JWT token automatically attached to requests
 * 3. Timeout configured for long-running requests
 * 4. Easy to import in requestMethods or anywhere in the frontend
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// ----------------------------
// Production URL of the backend API
// Always use HTTPS to ensure secure communication
// ----------------------------
const prodUrl = 'https://betterduniya-api-cveaghhdc0a8hdbu.canadacentral-01.azurewebsites.net/';
export const backendUrl: string = prodUrl;

const isMobile = Platform.OS !== 'web';
const getItemAsync = isMobile ? SecureStore.getItemAsync : AsyncStorage.getItem;

// ----------------------------
// Create Axios instance with default configuration
// ----------------------------
const axiosInstance: AxiosInstance = axios.create({
  baseURL: backendUrl.endsWith('/') ? backendUrl : backendUrl + '/',
  timeout: 5 * 60 * 10 * 1000, // 5 minutes in milliseconds
  headers: {
    "Content-Type": "application/json", // default for JSON APIs
  },
});

// ----------------------------
// Request Interceptor
// This runs before every request is sent
// If an accessToken is stored, it attaches it automatically
// ----------------------------
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
        const token: string | null = await getItemAsync("accessToken"); // get JWT from storage (SecureStore on mobile)

        // Only attach token when it's a non-empty string (mobile app uses SecureStore)
        if (typeof token === 'string' && token.length > 0) {
          config.headers.Authorization = `Bearer ${token}`; // attach token
        } else {
          // No token available; proceed without Authorization header
        }

        return config;
    } catch (error) {
      console.warn("Error fetching access token for request:", error);
      return config; // send request anyway, token optional
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ----------------------------
// Optional: Response Interceptor
// Could be used to handle token expiry, 401 errors, etc.
// ----------------------------
axiosInstance.interceptors.response.use(
  (response) => response, // return successful responses as-is
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized request - token may be invalid/expired");
      // Optionally: redirect to login, clear token, etc.
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
