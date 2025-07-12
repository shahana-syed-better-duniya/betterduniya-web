import {UserLoginSuccessInfo} from "@/interfaces/users/userLoginSuccessInfo";
import {useUserContext} from "@/utils/user/user-context";
import useAuthTokens from "@/hooks/auth/use-auth-tokens";

const useLoginSave = () => {
  const {setUserContext} = useUserContext();
  const {onSetAccessToken, onSetRefreshToken, onSetRefreshTokenExpiry} = useAuthTokens();

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
      await onSetAccessToken(userInfo.accessToken);
      await onSetRefreshToken(userInfo.refreshToken);
      await onSetRefreshTokenExpiry(userInfo.refreshTokenExpiry);
    }
  };
}


export default useLoginSave;
