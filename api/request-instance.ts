import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {Alert} from "react-native";
import axiosInstance, {backendUrl} from "@/api/axioInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {productApi} from "@/api/product/product";

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

const getRequestConfig = async (request: ApiRequest): Promise<AxiosRequestConfig> => {
  const token = await AsyncStorage.getItem('token')
  if (!token) {
    console.log(`Invalid token: ${token}`);
  }

  const responseType = request?.isBlob ? {responseType: 'blob' as const} : {};
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
  const config = await getRequestConfig(request);
  const {method, path} = request;

  const completePath = path(...args);
  if (completePath.includes('undefined')) {
    Alert.alert(`Path argument undefined: ${completePath}\nargs=[${args}]`);
  } else if (completePath.includes(productApi.createReview.path())) {
    // bugs in axios when using post form, must fetch manually
    const url = backendUrl + completePath;
    await fetch(url, {
      method: 'POST',
      body,
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      },
    });
    try {
      return {result: null, ok: true, errors: []};
    } catch (error) {
      console.error('Request failed', error);
      const errorMessage = getResponseErrorMessage(error);
      return {result: null, ok: false, error, errorMessage};
    }
  }

  try {
    const response = await method(axiosInstance, completePath, config, body);
    const json = await response.data;
    return {result: json, ok: true, errors: []};
  } catch (error) {
    console.error('Request failed', error);
    const errorMessage = getResponseErrorMessage(error);
    return {result: null, ok: false, error, errorMessage};
  }
};

export default requestInstance;
