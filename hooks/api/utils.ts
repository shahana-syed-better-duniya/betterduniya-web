import { ApiRequest } from "@/api/request-instance";
import useAuthTokens from "@/hooks/auth/use-auth-tokens";
import { AxiosRequestConfig } from "axios";

export const useRequestConfig = async (request: ApiRequest): Promise<AxiosRequestConfig> => {
  const {onGetAccessToken} = useAuthTokens();
  const token = await onGetAccessToken();
  if (token == null) {
    // Silent log for missing token on web - this is normal for first-time users
    console.debug(`No access token available`);
  }

  const responseType = request?.isBlob ? {responseType: 'blob' as const} : {};
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...responseType,
  };
};

export const getResponseErrorMessage = (error: any): string => {
  switch (error?.response?.status) {
    case 400:
      return error?.response?.data?.message;
    case 401:
      return 'Do not have user permission, please login to your account';
    case 404:
      return 'Requested resource is not found on the server';
    case 405:
      return 'Request method is not allowed on the server';
    case 413:
      return 'Payload is too large';
    case 415:
      return 'Unsupported media type. Please check the upload format.';
    case 500:
      return 'Internal server error, please contact us to report the error.';
    default:
      console.error(error);
      return 'An unexpected error occurred';
  }
};
