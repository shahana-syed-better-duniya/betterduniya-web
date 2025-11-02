import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { ReactNode, useEffect, useState } from 'react';

const ProfileContext = React.createContext({});

const ProfileImageProvider = ({children}: {children: ReactNode}) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileImageUrl = async () => {
      try {
        const storedUrl = await AsyncStorage.getItem('profileImageUrl');
        if (storedUrl) {
          setProfileImageUrl(storedUrl);
        }
      } catch (e) {
        console.error('Error loading profile image URL:', e);
      }
    };
    loadProfileImageUrl();
  }, []);

  const updateProfileImageUrl = async (url: string) => {
    try {
      await AsyncStorage.setItem('profileImageUrl', url);
      setProfileImageUrl(url);
    } catch (e) {
      console.error('Error updating profile image URL:', e);
    }
  };

  return (
    <ProfileContext.Provider value={{profileImageUrl, updateProfileImageUrl}}>
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileImageProvider };

