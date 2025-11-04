import useAuthTokens from "@/hooks/auth/use-auth-tokens";
import { useUserContext } from "@/utils/user/user-context";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const useLogoutTimer = () => {
  const router = useRouter();
  const {setUserContext} = useUserContext();
  const {onGetRefreshTokenExpiry, onClearTokens} = useAuthTokens();

  const onLogout = async () => {
    console.log("🚪 Auto-logout triggered - clearing tokens and user context");
    setUserContext({});
    await onClearTokens();
    router.navigate("/");
  }

  const setupLogoutTimer = async () => {
    const refreshTokenExpiry = await onGetRefreshTokenExpiry();
    console.log("⏰ Setting up logout timer, refresh token expiry:", refreshTokenExpiry);

    if (refreshTokenExpiry) {
      try {
        const expiryTime = new Date(refreshTokenExpiry);
        const now = new Date();
        console.log("⏰ Token expiry time:", expiryTime.toISOString());
        console.log("⏰ Current time:", now.toISOString());

        // Add 5-minute buffer to prevent premature logout
        const bufferTime = 5 * 60 * 1000; // 5 minutes in milliseconds
        const effectiveExpiryTime = expiryTime.getTime() - bufferTime;

        if (now.getTime() >= effectiveExpiryTime) {
          console.log("⏰ Token expired (with 5min buffer) - triggering logout");
          await onLogout();
        } else {
          const timeUntilExpiry = effectiveExpiryTime - now.getTime();
          const minutesLeft = Math.round(timeUntilExpiry / 1000 / 60);
          console.log("⏰ Token valid for", minutesLeft, "more minutes (including 5min buffer)");
          
          if (minutesLeft > 0) {
            const timerId = setTimeout(onLogout, timeUntilExpiry);
            return () => clearTimeout(timerId);
          }
        }
      } catch (error) {
        console.error("⏰ Error parsing refresh token expiry:", error);
        console.log("⏰ Skipping logout timer due to invalid expiry format");
      }
    } else {
      console.log("⏰ No refresh token expiry found - skipping logout timer");
    }
  };

  useEffect(() => {
    setupLogoutTimer();
  }, [setUserContext, setUserContext, router]);

}

export default useLogoutTimer;
