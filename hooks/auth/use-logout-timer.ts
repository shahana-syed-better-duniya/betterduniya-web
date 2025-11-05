import useAuthTokens from "@/hooks/auth/use-auth-tokens";
import { useUserContext } from "@/utils/user/user-context";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";

const useLogoutTimer = () => {
  const router = useRouter();
  const { setUserContext } = useUserContext();
  const { onGetRefreshTokenExpiry, onClearTokens } = useAuthTokens();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onLogout = async () => {
    console.log("🚪 Auto-logout triggered - clearing tokens and user context");
    
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    try {
      await onClearTokens();
      setUserContext({
        userId: '',
        username: '',
        firstName: '',
        lastName: '',
        bio: '',
        userRole: '',
        profileImageUri: '',
      });
      router.replace("/");
    } catch (error) {
      console.error("🚪 Error during auto-logout:", error);
    }
  }

  const setupLogoutTimer = async () => {
    // Clear any existing timer first
    if (timerRef.current) {
      console.log("⏰ Clearing existing logout timer");
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    try {
      const refreshTokenExpiry = await onGetRefreshTokenExpiry();
      console.log("⏰ Setting up logout timer, refresh token expiry:", refreshTokenExpiry);

      // Defensive guard: skip if no expiry
      if (!refreshTokenExpiry) {
        console.info("⏰ No refresh token expiry - skipping logout timer");
        return;
      }

      // Defensive guard: validate expiry format
      const expiryMs = Date.parse(refreshTokenExpiry);
      if (Number.isNaN(expiryMs)) {
        console.warn("⏰ Invalid expiry format:", refreshTokenExpiry, "- skipping logout timer");
        return;
      }

      const expiryTime = new Date(expiryMs);
      const now = new Date();
      console.log("⏰ Token expiry time:", expiryTime.toISOString());
      console.log("⏰ Current time:", now.toISOString());

      // Add 5-minute buffer to prevent premature logout
      const bufferTime = 5 * 60 * 1000; // 5 minutes in milliseconds
      const effectiveExpiryTime = expiryTime.getTime() - bufferTime;

      if (now.getTime() >= effectiveExpiryTime) {
        console.log("⏰ Token expired (with 5min buffer) - triggering immediate logout");
        await onLogout();
        return;
      }

      const timeUntilExpiry = effectiveExpiryTime - now.getTime();
      const minutesLeft = Math.round(timeUntilExpiry / 1000 / 60);
      
      // Defensive guard: only schedule if time is reasonable (max 24 hours)
      const maxTimerMs = 24 * 60 * 60 * 1000; // 24 hours
      if (timeUntilExpiry > maxTimerMs) {
        console.warn("⏰ Expiry time too far in future (", minutesLeft, "minutes) - skipping timer");
        return;
      }

      if (minutesLeft > 0) {
        console.log("⏰ Token valid for", minutesLeft, "more minutes (including 5min buffer) - scheduling logout");
        timerRef.current = setTimeout(() => {
          console.log("⏰ Logout timer fired");
          onLogout();
        }, timeUntilExpiry);
      }
    } catch (error) {
      console.error("⏰ Error setting up logout timer:", error);
    }
  };

  useEffect(() => {
    setupLogoutTimer();

    // Cleanup function to clear timer on unmount
    return () => {
      if (timerRef.current) {
        console.log("⏰ Cleaning up logout timer on unmount");
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []); // Empty dependency array to run once on mount

  // Return cleanup function for manual timer reset if needed
  return {
    resetTimer: setupLogoutTimer,
    clearTimer: () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  };
}

export default useLogoutTimer;
