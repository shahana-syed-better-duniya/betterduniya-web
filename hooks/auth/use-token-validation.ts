import { useUserContext } from '@/utils/user/user-context';
import { useEffect } from 'react';
import useAuthTokens from './use-auth-tokens';

/**
 * Hook to validate tokens on app startup and clear invalid/expired tokens
 */
const useTokenValidation = () => {
  const { onGetAccessToken, onGetRefreshToken, onGetRefreshTokenExpiry, onClearTokens } = useAuthTokens();
  const { userId, resetUserContext, isLoaded } = useUserContext();

  useEffect(() => {
    if (!isLoaded) return;

    const validateTokens = async () => {
      try {
        console.log("🔐 Starting token validation on app startup...");
        
        const accessToken = await onGetAccessToken();
        const refreshToken = await onGetRefreshToken();
        const refreshExpiry = await onGetRefreshTokenExpiry();

        // Check if user context indicates logged in but no tokens exist
        if (userId && userId.length > 0) {
          if (!accessToken || !refreshToken) {
            console.log("⚠️ INCONSISTENT AUTH STATE: User context exists but tokens missing");
            console.log("⚠️ This usually happens when:");
            console.log("⚠️ 1. Tokens expired and were cleared");
            console.log("⚠️ 2. Storage was cleared externally");
            console.log("⚠️ 3. Platform storage mismatch");
            console.log("⚠️ → Clearing user state to force re-login");
            await resetUserContext();
            await onClearTokens();
            return;
          }

          // Check if refresh token is expired
          if (refreshExpiry) {
            try {
              const expiryTime = new Date(refreshExpiry);
              const now = new Date();
              
              if (now >= expiryTime) {
                console.log("⚠️ Refresh token expired - clearing all auth data");
                await resetUserContext();
                await onClearTokens();
                return;
              }
            } catch (error) {
              console.error("⚠️ Invalid refresh token expiry format - clearing auth data");
              await resetUserContext();
              await onClearTokens();
              return;
            }
          }

          console.log("✅ Token validation passed - user authenticated with valid tokens");
        } else {
          // No user context but tokens exist - clean up orphaned tokens
          if (accessToken || refreshToken || refreshExpiry) {
            console.log("🧹 No user context but tokens exist - cleaning up orphaned tokens");
            await onClearTokens();
          }
        }
      } catch (error) {
        console.error("❌ Error during token validation:", error);
        // On validation error, clear everything to ensure clean state
        await resetUserContext();
        await onClearTokens();
      }
    };

    validateTokens();
  }, [isLoaded, userId]);
};

export default useTokenValidation;