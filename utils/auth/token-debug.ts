import useAuthTokens from "@/hooks/auth/use-auth-tokens";
import { useUserContext } from "@/utils/user/user-context";

/**
 * Utility to debug authentication state
 * Call this function to log current auth status to console
 */
export const debugAuthState = async () => {
  console.log("🔧 ========== AUTHENTICATION DEBUG ==========");
  
  try {
    const { onGetAccessToken, onGetRefreshToken, onGetRefreshTokenExpiry } = useAuthTokens();
    const { userId, username, isLoaded } = useUserContext();
    
    // Check user context
    console.log("🔧 [USER CONTEXT]");
    console.log("🔧 - isLoaded:", isLoaded);
    console.log("🔧 - userId:", userId);
    console.log("🔧 - username:", username);
    console.log("🔧 - Has userId:", !!userId && userId.length > 0);
    
    // Check stored tokens
    console.log("🔧 [STORED TOKENS]");
    const accessToken = await onGetAccessToken();
    const refreshToken = await onGetRefreshToken();
    const refreshExpiry = await onGetRefreshTokenExpiry();
    
    console.log("🔧 - Access Token:", accessToken ? `Present (${accessToken.length} chars)` : "Missing");
    console.log("🔧 - Refresh Token:", refreshToken ? `Present (${refreshToken.length} chars)` : "Missing");
    console.log("🔧 - Refresh Expiry:", refreshExpiry || "Missing");
    
    // Check token expiry if available
    if (refreshExpiry) {
      try {
        const expiryDate = new Date(refreshExpiry);
        const now = new Date();
        const isExpired = now >= expiryDate;
        console.log("🔧 - Refresh Token Expired:", isExpired);
        console.log("🔧 - Time until expiry:", isExpired ? "Already expired" : `${Math.round((expiryDate.getTime() - now.getTime()) / 1000 / 60)} minutes`);
      } catch (error) {
        console.log("🔧 - Refresh Token Expiry Format Error:", error);
      }
    }
    
    // Overall auth status
    const shouldBeAuthenticated = !!userId && userId.length > 0;
    const hasValidTokens = !!accessToken && !!refreshToken;
    
    console.log("🔧 [AUTHENTICATION STATUS]");
    console.log("🔧 - Should be authenticated (user context):", shouldBeAuthenticated);
    console.log("🔧 - Has valid tokens:", hasValidTokens);
    console.log("🔧 - Auth state consistent:", shouldBeAuthenticated === hasValidTokens);
    
    if (shouldBeAuthenticated && !hasValidTokens) {
      console.log("🔧 ⚠️ INCONSISTENT STATE: User context says logged in but no tokens found!");
    }
    
    if (!shouldBeAuthenticated && hasValidTokens) {
      console.log("🔧 ⚠️ INCONSISTENT STATE: Tokens exist but user context says not logged in!");
    }
    
  } catch (error) {
    console.error("🔧 ❌ Error during auth debug:", error);
  }
  
  console.log("🔧 ========== END DEBUG ==========");
};