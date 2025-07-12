import {UserLoginSuccessInfo} from "@/interfaces/users/userLoginSuccessInfo";
import {useUserContext} from "@/utils/user/user-context";
import useAuthTokens from "@/hooks/auth/use-auth-tokens";

const useLoginSave = () => {
  const {setUserContext} = useUserContext();
  const {onSaveToken} = useAuthTokens();

  return async (userInfo: UserLoginSuccessInfo) => {
    if (userInfo != null) {
      setUserContext({
        userId: userInfo.userId,
        username: userInfo.userName,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        bio: userInfo.bio,
        userRole: userInfo.userRole,
        profileImageUri: userInfo.profileImageUri,
      });
      await onSaveToken(userInfo.accessToken);
    }
  };
}


export default useLoginSave;
