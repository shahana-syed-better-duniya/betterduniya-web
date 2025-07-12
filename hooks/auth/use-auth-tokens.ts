import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = 'accessToken';

const useAuthTokens = () => {
  const onSaveToken = async (accessToken: string) => {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  const onGetAccessToken = async()=>{
    await AsyncStorage.getItem(ACCESS_TOKEN_KEY)
  }

  return {onSaveToken, onGetAccessToken}
}

export default useAuthTokens;
