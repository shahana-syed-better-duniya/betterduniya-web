import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const useGetProfileImage = () => {
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const uri = await AsyncStorage.getItem('profileImageUri');
        setProfileImageUri(uri);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfileImage();
  }, []);

  return { profileImageUri, loading, error };
};

export default useGetProfileImage;
