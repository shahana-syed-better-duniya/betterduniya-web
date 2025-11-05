import useAuthTokens from "@/hooks/auth/use-auth-tokens";
import {backendUrl} from "@/api/axioInstance";

const useAuthTokenRefresh = () => {
  const {onGetRefreshToken, onSetAccessToken, onSetRefreshToken, onSetRefreshTokenExpiry} = useAuthTokens();

  const onRefreshToken = async () => {
    try {
      console.log("🔄 Starting token refresh process...");
      const refreshToken = await onGetRefreshToken(); // Get the refresh token

      if (!refreshToken) {
        console.error("❌ No refresh token available for refresh");
        throw new Error("No refresh token available");
      }

      console.log("🔄 Found refresh token, making request...");
      const response = await fetch(`${backendUrl}/user/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({RefreshToken: refreshToken}),
      });

      console.log("🔄 Refresh response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("🔄 Refresh response keys:", Object.keys(data));
        
        if (!data.accessToken) {
          console.error("❌ No access token in refresh response");
          return null;
        }

        const newAccessToken = data.accessToken;
        await onSetAccessToken(newAccessToken);
        console.log("✅ New access token saved");

        // Update refresh token and expiry if provided
        if (data.refreshToken) {
          await onSetRefreshToken(data.refreshToken);
          console.log("✅ New refresh token saved");
          
          if (data.refreshTokenExpiry) {
            await onSetRefreshTokenExpiry(data.refreshTokenExpiry);
            console.log("✅ New refresh token expiry saved");
          }
        } else {
          console.warn("⚠️ No new refresh token provided in response");
        }

        return newAccessToken;
      } else {
        const errorData = await response.json();
        console.error("❌ Failed to refresh access token:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        return null;
      }
    } catch (error) {
      console.error("❌ Refresh token request failed:", error);
      return null;
    }
  }

  return {onRefreshToken};
};

export default useAuthTokenRefresh;
