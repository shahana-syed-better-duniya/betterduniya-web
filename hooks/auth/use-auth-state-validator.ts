import { forceLogoutAndCleanup, isAuthStateConsistent } from "@/utils/auth/auth-cleanup";
import { useUserContext } from "@/utils/user/user-context";
import { useEffect } from "react";

/**
 * Hook to automatically detect and fix inconsistent authentication states
 * Use this in components that require authentication
 */
export const useAuthStateValidator = () => {
  const { isLoaded } = useUserContext();

  useEffect(() => {
    if (!isLoaded) return;

    const validateAndFix = async () => {
      try {
        const isConsistent = await isAuthStateConsistent();
        if (!isConsistent) {
          console.log("🔧 Detected inconsistent auth state - auto-fixing...");
          await forceLogoutAndCleanup();
        }
      } catch (error) {
        console.error("Error validating auth state:", error);
      }
    };

    validateAndFix();
  }, [isLoaded]);
};

export default useAuthStateValidator;