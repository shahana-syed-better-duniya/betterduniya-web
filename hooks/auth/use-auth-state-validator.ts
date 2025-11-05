import useAuthTokens from "@/hooks/auth/use-auth-tokens";
import { forceLogoutAndCleanup, isAuthStateConsistent } from "@/utils/auth/auth-cleanup";
import { useUserContext } from "@/utils/user/user-context";
import { useEffect } from "react";

/**
 * Hook to automatically detect and fix inconsistent authentication states
 * Use this in components that require authentication
 */
export const useAuthStateValidator = () => {
  const { isLoaded, userId, resetUserContext } = useUserContext();
  const { onGetAccessToken, onGetRefreshToken, onClearTokens } = useAuthTokens();

  useEffect(() => {
    if (!isLoaded) return;

    const validateAndFix = async () => {
      try {
        const isConsistent = await isAuthStateConsistent({
          onGetAccessToken,
          onGetRefreshToken,
          userId
        });
        
        if (!isConsistent) {
          console.log("🔧 Detected inconsistent auth state - auto-fixing...");
          await forceLogoutAndCleanup({
            onClearTokens,
            resetUserContext
          });
        }
      } catch (error) {
        console.error("Error validating auth state:", error);
      }
    };

    validateAndFix();
  }, [isLoaded, userId, onGetAccessToken, onGetRefreshToken, onClearTokens, resetUserContext]);
};

export default useAuthStateValidator;