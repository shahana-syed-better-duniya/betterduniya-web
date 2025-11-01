import useAuthTokens from "@/hooks/auth/use-auth-tokens";
import { useUserContext } from "@/utils/user/user-context";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const useLogoutTimer = () => {
  const router = useRouter();
  const {setUserContext} = useUserContext();
  const {onGetRefreshTokenExpiry, onClearTokens} = useAuthTokens();

  const onLogout = async () => {
    setUserContext({});
    await onClearTokens();
    router.navigate("/");
  }

  const setupLogoutTimer = async () => {
    const refreshTokenExpiry = await onGetRefreshTokenExpiry();

    if (refreshTokenExpiry) {
      const expiryTime = new Date(refreshTokenExpiry);
      const now = new Date();

      if (now >= expiryTime) {
        await onLogout();
      } else {
        const timeUntilExpiry = expiryTime.getTime() - now.getTime();
  const timerId = setTimeout(onLogout, timeUntilExpiry);
  // timer scheduled; no debug logging
  return () => clearTimeout(timerId);
      }
    }
  };

  useEffect(() => {
    setupLogoutTimer();
  }, [setUserContext, setUserContext, router]);

}

export default useLogoutTimer;
