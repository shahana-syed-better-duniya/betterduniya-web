import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {Alert} from "react-native";
import axiosInstance from "@/api/axioInstance";

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

const getRequestConfig = (request: ApiRequest): AxiosRequestConfig => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.log(`Invalid token: ${token}`);
  }

  const responseType = request?.isBlob ? { responseType: 'blob' as const } : {};
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...responseType,
  };
};

const getResponseErrorMessage = (error: any): string => {
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

const requestInstance = async <T>(
  request: ApiRequest,
  args: any[],
  body?: any
): Promise<RequestResult<T>> => {
  const config = getRequestConfig(request);
  const { method, path } = request;

  const completePath = path(...args);
  if (completePath.includes('undefined')) {
    Alert.alert(`Path argument undefined: ${completePath}\nargs=[${args}]`);
  }

  try {
    const response = await method(axiosInstance, completePath, config, body);
    const json = await response.data;
    return { result: json, ok: true, errors: [] };
  } catch (error) {
    console.error('Request failed', error);
    const errorMessage = getResponseErrorMessage(error);
    return { result: null, ok: false, error, errorMessage };
  }
};

export default requestInstance;
