import useAuthTokens from "@/hooks/auth/use-auth-tokens";
import {backendUrl} from "@/api/axioInstance";

const useAuthTokenRefresh = () => {
  const {onGetRefreshToken, onSetAccessToken} = useAuthTokens();

  const onRefreshToken = async () => {
    try {
      const refreshToken = await onGetRefreshToken(); // Get the refresh token

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await fetch(`${backendUrl}/user/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({refreshToken}),
      });

      if (response.ok) {
        const data = await response.json();
        const newAccessToken = data.accessToken;
        await onSetAccessToken(newAccessToken);

        return newAccessToken;
      } else {
        console.error("Failed to refresh access token", await response.json());
        return null;
      }
    } catch (error) {
      console.error("Refresh token request failed", error);
      return null;
    }
  }

  return {onRefreshToken};
};

export default useAuthTokenRefresh;
