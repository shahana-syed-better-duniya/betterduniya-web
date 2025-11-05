/**
 * Pure utility functions for authentication cleanup
 * These functions don't use React hooks and accept required functions as parameters
 */

export type TokenGetters = {
  onGetAccessToken: () => Promise<string | null>;
  onGetRefreshToken: () => Promise<string | null>;
};

export type LogoutHandlers = {
  onClearTokens: () => Promise<void>;
  resetUserContext: () => Promise<void>;
};

/**
 * Force logout and cleanup when authentication fails
 * Call this when you get 401 errors or detect invalid auth state
 */
export const forceLogoutAndCleanup = async (handlers: LogoutHandlers): Promise<void> => {
  console.log("🧹 Force logout: Cleaning up authentication state...");
  
  try {
    // Clear all tokens
    await handlers.onClearTokens();
    console.log("✅ Tokens cleared");
    
    // Reset user context
    await handlers.resetUserContext();
    console.log("✅ User context reset");
    
    console.log("✅ Force logout completed - user should see login screen");
  } catch (error) {
    console.error("❌ Error during force logout:", error);
    throw error; // Re-throw so caller can handle if needed
  }
};

/**
 * Check if authentication state is consistent
 * Returns true if user context and tokens are in sync
 */
export const isAuthStateConsistent = async (params: TokenGetters & { userId?: string | null }): Promise<boolean> => {
  try {
    const hasUser = !!params.userId && params.userId.length > 0;
    const accessToken = await params.onGetAccessToken();
    const refreshToken = await params.onGetRefreshToken();
    const hasTokens = !!accessToken && !!refreshToken;
    
    console.log("🔍 Auth state check - hasUser:", hasUser, "hasTokens:", hasTokens);
    
    return hasUser === hasTokens;
  } catch (error) {
    console.error("Error checking auth state consistency:", error);
    return false;
  }
};