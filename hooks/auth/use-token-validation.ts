import { forceLogoutAndCleanup, isAuthStateConsistent } from '@/utils/auth/auth-cleanup';
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
        
        // First check if auth state is consistent using pure utility
        const isConsistent = await isAuthStateConsistent({
          onGetAccessToken,
          onGetRefreshToken,
          userId
        });

        if (!isConsistent) {
          console.log("⚠️ INCONSISTENT AUTH STATE detected during validation");
          console.log("⚠️ This usually happens when:");
          console.log("⚠️ 1. Tokens expired and were cleared");
          console.log("⚠️ 2. Storage was cleared externally");
          console.log("⚠️ 3. Platform storage mismatch");
          console.log("⚠️ → Forcing logout to clean state");
          
          await forceLogoutAndCleanup({
            onClearTokens,
            resetUserContext
          });
          return;
        }

        // Additional validation for token expiry if user is authenticated
        if (userId && userId.length > 0) {
          const refreshExpiry = await onGetRefreshTokenExpiry();
          
          if (refreshExpiry) {
            try {
              const expiryTime = new Date(refreshExpiry);
              const now = new Date();
              
              if (now >= expiryTime) {
                console.log("⚠️ Refresh token expired - clearing all auth data");
                await forceLogoutAndCleanup({
                  onClearTokens,
                  resetUserContext
                });
                return;
              }
            } catch (error) {
              console.error("⚠️ Invalid refresh token expiry format - clearing auth data");
              await forceLogoutAndCleanup({
                onClearTokens,
                resetUserContext
              });
              return;
            }
          }

          console.log("✅ Token validation passed - user authenticated with valid tokens");
        }
      } catch (error) {
        console.error("❌ Error during token validation:", error);
        // On validation error, clear everything to ensure clean state
        try {
          await forceLogoutAndCleanup({
            onClearTokens,
            resetUserContext
          });
        } catch (cleanupError) {
          console.error("❌ Error during cleanup after validation failure:", cleanupError);
        }
      }
    };

    validateTokens();
  }, [isLoaded, userId, onGetAccessToken, onGetRefreshToken, onGetRefreshTokenExpiry, onClearTokens, resetUserContext]);
};

export default useTokenValidation;