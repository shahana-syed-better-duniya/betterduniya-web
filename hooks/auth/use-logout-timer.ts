import {useEffect} from "react";
import {useUserContext} from "@/utils/user/user-context";
import useAuthTokens from "@/hooks/auth/use-auth-tokens";
import {useRouter} from "expo-router";

const useLogoutTimer = () => {
  const router = useRouter();
  const {setUserContext} = useUserContext();
  const {onGetRefreshTokenExpiry, onClearTokens} = useAuthTokens();

  const onLogout = async () => {
    console.log("logging out");
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
        const timeUntilExpiry = expiryTime - now;
        const timerId = setTimeout(onLogout, timeUntilExpiry);
        console.log("Timer Set for:", timeUntilExpiry, "ms");
        return () => clearTimeout(timerId);
      }
    }
  };

  useEffect(() => {
    setupLogoutTimer();
  }, [setUserContext, setUserContext, router]);

}

export default useLogoutTimer;
