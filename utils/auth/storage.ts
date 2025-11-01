import AsyncStorage from '@react-native-async-storage/async-storage';

// ----------------------------
// Storage keys
// ----------------------------
export const USER_STORAGE_KEY = 'userContext';

// ----------------------------
// Load persisted user context from storage
// ----------------------------
export const loadUserContextFromStorage = async (setUserContext: any) => {
  try {
    const storedData = await AsyncStorage.getItem(USER_STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserContext(parsedData);
    }
  } catch (err) {
    console.warn("Failed to load persisted user context:", err);
  }
};

// ----------------------------
// Save user context to storage
// ----------------------------
export const saveUserContextToStorage = async (data: any) => {
  try {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn("Failed to persist user context:", err);
  }
};

// ----------------------------
// Clear user context from storage
// ----------------------------
export const clearUserContextFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  } catch (err) {
    console.warn("Failed to clear user context from storage:", err);
  }
};