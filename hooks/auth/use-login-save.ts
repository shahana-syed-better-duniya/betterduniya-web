/*
 * Responsibilities:
 * 1. Save user info into in-memory context (UserContext)
 * 2. Persist user info to AsyncStorage so app can restore login after restart
 * 3. Save JWT accessToken, refreshToken, and refreshTokenExpiry
 */

import useAuthTokens from "@/hooks/auth/use-auth-tokens";
import { UserLoginSuccessInfo } from "@/interfaces/users/userLoginSuccessInfo";
import { saveUserContextToStorage } from "@/utils/auth/storage";
import { useUserContext } from "@/utils/user/user-context";

const useLoginSave = () => {
  const { setUserContext } = useUserContext();
  const { onSetAccessToken, onSetRefreshToken, onSetRefreshTokenExpiry, onGetAccessToken } = useAuthTokens();

  return async (userInfo: UserLoginSuccessInfo) => {
    if (!userInfo) return;

    // ----------------------------
    // 1. Prepare user context data
    // ----------------------------
    const contextData = {
      userId: userInfo.userId,
      username: userInfo.userName.toLowerCase(), // convert to lowercase to match UserContextType
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      bio: userInfo.bio,
      userRole: userInfo.userRole,
      profileImageUri: userInfo.profileImageUri,
    };

    // ----------------------------
    // 2. Update in-memory user context
    // ----------------------------
    setUserContext(contextData);

    // ----------------------------
    // 3. Persist user context in AsyncStorage
    // ----------------------------
    await saveUserContextToStorage(contextData);

    // ----------------------------
    // 4. Save JWT tokens to storage
    // ----------------------------
    try {
      // Diagnostic: show keys and simple presence for mobile response
      // Diagnostic logs removed for production safety.

      if ((userInfo as any).accessToken) {
        // Coerce to string so SecureStore always gets a string
  const tokenToSave = String((userInfo as any).accessToken);
  await onSetAccessToken(tokenToSave);
      }

      if ((userInfo as any).refreshToken) {
  await onSetRefreshToken(String((userInfo as any).refreshToken));
      }

      if ((userInfo as any).refreshTokenExpiry) {
  await onSetRefreshTokenExpiry(String((userInfo as any).refreshTokenExpiry));
      }

      // Verify storage
      // Storage verification removed from logs for privacy.
    } catch (err) {
      console.warn("Failed to save auth tokens:", err);
    }
  };
};


export default useLoginSave;
