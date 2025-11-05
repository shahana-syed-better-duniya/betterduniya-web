import useAuthTokens from "@/hooks/auth/use-auth-tokens";
import { useUserContext } from "@/utils/user/user-context";

/**
 * Force logout and cleanup when authentication fails
 * Call this when you get 401 errors or detect invalid auth state
 */
export const forceLogoutAndCleanup = async () => {
  console.log("🧹 Force logout: Cleaning up authentication state...");
  
  try {
    const { onClearTokens } = useAuthTokens();
    const { resetUserContext } = useUserContext();
    
    // Clear all tokens
    await onClearTokens();
    console.log("✅ Tokens cleared");
    
    // Reset user context
    await resetUserContext();
    console.log("✅ User context reset");
    
    console.log("✅ Force logout completed - user should see login screen");
  } catch (error) {
    console.error("❌ Error during force logout:", error);
  }
};

/**
 * Check if authentication state is consistent
 * Returns true if user context and tokens are in sync
 */
export const isAuthStateConsistent = async (): Promise<boolean> => {
  try {
    const { onGetAccessToken, onGetRefreshToken } = useAuthTokens();
    const { userId } = useUserContext();
    
    const hasUser = !!userId && userId.length > 0;
    const accessToken = await onGetAccessToken();
    const refreshToken = await onGetRefreshToken();
    const hasTokens = !!accessToken && !!refreshToken;
    
    return hasUser === hasTokens;
  } catch (error) {
    console.error("Error checking auth state consistency:", error);
    return false;
  }
};