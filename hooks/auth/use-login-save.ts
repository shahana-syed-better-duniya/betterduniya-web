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
    try {
      await saveUserContextToStorage(contextData);
    } catch (err) {
      console.warn("Failed to save user context to storage:", err);
    }

    // ----------------------------
    // 4. Save JWT tokens to storage
    // ----------------------------
    try {
      console.log("🔐 Starting token save process...");
      console.log("🔐 User info keys:", Object.keys(userInfo));

      if ((userInfo as any).accessToken) {
        // Coerce to string so SecureStore always gets a string
        const tokenToSave = String((userInfo as any).accessToken);
        console.log("🔐 Saving access token... (length:", tokenToSave.length, ")");
        await onSetAccessToken(tokenToSave);
        console.log("✅ Access token saved successfully");
      } else {
        console.warn("⚠️ No access token found in userInfo");
      }

      if ((userInfo as any).refreshToken) {
        console.log("🔐 Saving refresh token...");
        await onSetRefreshToken(String((userInfo as any).refreshToken));
        console.log("✅ Refresh token saved successfully");
      }

      if ((userInfo as any).refreshTokenExpiry) {
        console.log("🔐 Saving refresh token expiry...");
        await onSetRefreshTokenExpiry(String((userInfo as any).refreshTokenExpiry));
        console.log("✅ Refresh token expiry saved successfully");
      }

      // Verify storage by reading back
      const savedToken = await onGetAccessToken();
      console.log("🔍 Verification - saved token exists:", !!savedToken);
      console.log("🔍 Verification - token length:", savedToken?.length || 0);
    } catch (err) {
      console.error("❌ Failed to save auth tokens:", err);
    }
  };
};


export default useLoginSave;
