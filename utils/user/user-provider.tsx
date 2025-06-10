import React, {ReactNode, useCallback, useMemo, useState} from 'react';
import {UserContext, UserContextType} from './user-context';

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [contextValue, setContextValue] = useState<Omit<UserContextType, 'setUserContext'>>({
    userId: localStorage.getItem('userId') || '',
    username: localStorage.getItem('username') || '',
    personalName: localStorage.getItem('personalName') || '',
    userRole: localStorage.getItem('userRole') || '',
  });

  const setUserContext = useCallback((data: Partial<UserContextType>) => {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          localStorage.setItem(key, value as string);
        }
      });
      setContextValue((prev) => ({...prev, ...data}));
    }
  }, []);

  const value = useMemo(
    () => ({...contextValue, setUserContext}),
    [contextValue, setUserContext]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
