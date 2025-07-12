import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {Alert} from "react-native";
import axiosInstance, {backendUrl} from "@/api/axioInstance";
import {getResponseErrorMessage, useRequestConfig} from "@/hooks/api/utils";
import useRequestCustom from "@/hooks/api/use-request-custom";
import useAuthTokenRefresh from "@/hooks/auth/use-auth-token-refresh";


export interface ApiRequest {
  isBlob?: boolean;
  method: (
    instance: AxiosInstance,
    path: string,
    config: AxiosRequestConfig,
    body?: unknown
  ) => Promise<AxiosResponse>;
  path: (...args: any[]) => string;
  okMessage: string;
  isRequestCustom?: boolean;
}

export interface RequestResult<T> {
  result: T | null;
  ok: boolean;
  errors?: string[];
  error?: unknown;
  errorMessage?:
    | string
    | {
    response: {
      data?: {
        message?: string;
      };
    };
  };
}


const requestInstance = async <T>(
  request: ApiRequest,
  args: any[],
  body?: any
): Promise<RequestResult<T>> => {
  const {onRequestCustom} = useRequestCustom();
  const {method, path} = request;
  const {onRefreshToken} = useAuthTokenRefresh();

  const completePath = path(...args);
  if (completePath.includes('undefined')) {
    Alert.alert(`Path argument undefined: ${completePath}\nargs=[${args}]`);
  } else if (request.isRequestCustom) {
    const url = backendUrl + completePath;
    return await onRequestCustom(url, body)
  }

  try {
    const config = await useRequestConfig(request);
    const response = await method(axiosInstance, completePath, config, body);
    const json = await response.data;
    return {result: json, ok: true, errors: []};
  } catch (error) {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      console.warn("Access token expired. Attempting to refresh...");

      const newAccessToken = await onRefreshToken();
      if (newAccessToken) {
        // Retry the original request with the new access token
        try {
          const config = await useRequestConfig(request);
          if (config.headers != null) {
            config.headers.Authorization = `Bearer ${newAccessToken}`; // Add the refreshed token
          }

          const retryResponse = await method(
            axiosInstance,
            completePath,
            config,
            body
          );
          const retryJson = await retryResponse.data;

          return {result: retryJson, ok: true, errors: []};
        } catch (retryError) {
          console.error("Retry failed", retryError);
          return {
            result: null,
            ok: false,
            error: retryError,
            errorMessage: getResponseErrorMessage(retryError),
          };
        }
      } else {
        console.error("Failed to refresh token. User must reauthenticate.");
        return {
          result: null,
          ok: false,
          error,
          errorMessage: "Session expired. Please log in again.",
        };
      }
    }

    console.error('Request failed', error);
    const errorMessage = getResponseErrorMessage(error);
    return {result: null, ok: false, error, errorMessage};
  }
}

export default requestInstance;


