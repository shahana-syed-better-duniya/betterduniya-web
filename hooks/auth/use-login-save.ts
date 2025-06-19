import {UserLoginSuccessInfo} from "@/interfaces/users/userLoginSuccessInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useUserContext} from "@/utils/user/user-context";

const useLoginSave = () => {
  const {setUserContext} = useUserContext();

  return async (userInfo: UserLoginSuccessInfo) => {
    if (userInfo != null) {
      setUserContext({
        userId: userInfo.userId,
        username: userInfo.userName,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        userRole: userInfo.userRole
      });
      await AsyncStorage.setItem('token', userInfo.accessToken);
    }
  };
}


export default useLoginSave;
