import { useContext } from 'react';
import { UserContext, UserContextType } from './user-provider';

// ----------------------------
// Custom hook to access UserContext
// Throws error if used outside provider
// ----------------------------
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};

// Re-export type for convenience
export type { UserContextType };
