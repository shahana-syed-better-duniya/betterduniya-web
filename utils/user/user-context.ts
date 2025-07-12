import {createContext, useContext} from 'react';

export interface UserContextType {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  userRole: string;
  profileImageUri: string;
  setUserContext: (data: Partial<UserContextType>) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }

  return context;
};
