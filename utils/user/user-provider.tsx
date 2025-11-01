import { clearUserContextFromStorage, loadUserContextFromStorage, saveUserContextToStorage } from '@/utils/auth/storage';
import { createContext, ReactNode, useEffect, useState } from 'react';

// ----------------------------
// Interface for user state
// ----------------------------
export interface UserContextType {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  userRole: string;
  profileImageUri: string;

  // Function to update user context partially
  setUserContext: (data: Partial<UserContextType>) => void;

  // Function to reset context (logout)
  resetUserContext: () => void;

  // Flag indicating if persisted data is loaded
  isLoaded: boolean;
}

// ----------------------------
// Create React Context
// ----------------------------
export const UserContext = createContext<UserContextType | null>(null);

// ----------------------------
// Context Provider
// Wrap your app in this to provide global user state
// ----------------------------
export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Local state for user data
  const [state, setState] = useState<Omit<UserContextType, 'setUserContext' | 'resetUserContext' | 'isLoaded'>>({
    userId: '',
    username: '',
    firstName: '',
    lastName: '',
    bio: '',
    userRole: '',
    profileImageUri: '',
  });

  // Flag to indicate when persisted data is loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // ----------------------------
  // Load persisted user data from AsyncStorage on app start
  // ----------------------------
  useEffect(() => {
    (async () => {
      try {
        await loadUserContextFromStorage(setState);
      } catch (err) {
        console.warn('Failed to restore user context:', err);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  // ----------------------------
  // Update user context and persist
  // ----------------------------
  const setUserContext = async (data: Partial<UserContextType>) => {
    const newState = { ...state, ...data };
    setState(newState);
    await saveUserContextToStorage(newState);
  };

  // ----------------------------
  // Reset user context and clear storage
  // ----------------------------
  const resetUserContext = async () => {
    const emptyState = {
      userId: '',
      username: '',
      firstName: '',
      lastName: '',
      bio: '',
      userRole: '',
      profileImageUri: '',
    };
    setState(emptyState);
    await clearUserContextFromStorage();
  };

  // ----------------------------
  // Provide context to children
  // ----------------------------
  return (
    <UserContext.Provider
      value={{
        ...state,
        setUserContext,
        resetUserContext,
        isLoaded,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
