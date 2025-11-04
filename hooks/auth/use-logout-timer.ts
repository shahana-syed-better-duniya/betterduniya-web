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
      const expiryTime = new Date(refreshTokenExpiry);
      const now = new Date();
      console.log("⏰ Token expiry time:", expiryTime.toISOString());
      console.log("⏰ Current time:", now.toISOString());

      if (now >= expiryTime) {
        console.log("⏰ Token already expired - triggering logout");
        await onLogout();
      } else {
        const timeUntilExpiry = expiryTime.getTime() - now.getTime();
        console.log("⏰ Token valid for", Math.round(timeUntilExpiry / 1000 / 60), "more minutes");
        const timerId = setTimeout(onLogout, timeUntilExpiry);
        return () => clearTimeout(timerId);
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
