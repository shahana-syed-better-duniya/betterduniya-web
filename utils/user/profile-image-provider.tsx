import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileContext = React.createContext({});

const ProfileImageProvider = ({children}) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>(null);

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

export {ProfileImageProvider, ProfileContext};
