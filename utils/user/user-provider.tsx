import React, {ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import {UserContext, UserContextType} from './user-context';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [contextValue, setContextValue] = useState<Omit<UserContextType, 'setUserContext'>>({
    userId: '',
    username: '',
    firstName: '',
    lastName: '',
    userRole: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const userId = (await AsyncStorage.getItem('userId')) || '';
      const username = (await AsyncStorage.getItem('username')) || '';
      const firstName = (await AsyncStorage.getItem('firstName')) || '';
      const lastName = (await AsyncStorage.getItem('lastName')) || '';
      const userRole = (await AsyncStorage.getItem('userRole')) || '';

      setContextValue({
        userId,
        username,
        firstName,
        lastName,
        userRole,
      });
    };

    fetchData();
  }, []);

  // Update AsyncStorage and context value when `setUserContext` is called
  const setUserContext = useCallback(async (data: Partial<UserContextType>) => {
    if (data) {
      await Promise.all(
        Object.entries(data).map(async ([key, value]) => {
          if (value !== undefined) {
            await AsyncStorage.setItem(key, value as string);
          }
        })
      );

      setContextValue((prev) => ({ ...prev, ...data }));
    }
  }, []);

  const value = useMemo(() => ({ ...contextValue, setUserContext }), [contextValue, setUserContext]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
