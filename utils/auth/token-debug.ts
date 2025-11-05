/**
 * Pure utility functions for debugging authentication state
 * These functions don't use React hooks and accept required functions/values as parameters
 */

export type AuthDebugParams = {
  onGetAccessToken: () => Promise<string | null>;
  onGetRefreshToken: () => Promise<string | null>;
  onGetRefreshTokenExpiry: () => Promise<string | null>;
  userId?: string | null;
  username?: string;
  isLoaded: boolean;
};

/**
 * Debug authentication state with provided values
 * Call this function to log current auth status to console
 */
export const debugAuthStateWith = async (params: AuthDebugParams): Promise<void> => {
  console.log("🔧 ========== AUTHENTICATION DEBUG ==========");
  
  try {
    // Check user context
    console.log("🔧 [USER CONTEXT]");
    console.log("🔧 - isLoaded:", params.isLoaded);
    console.log("🔧 - userId:", params.userId);
    console.log("🔧 - username:", params.username);
    console.log("🔧 - Has userId:", !!params.userId && params.userId.length > 0);
    
    // Check stored tokens
    console.log("🔧 [STORED TOKENS]");
    const accessToken = await params.onGetAccessToken();
    const refreshToken = await params.onGetRefreshToken();
    const refreshExpiry = await params.onGetRefreshTokenExpiry();
    
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
    const shouldBeAuthenticated = !!params.userId && params.userId.length > 0;
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