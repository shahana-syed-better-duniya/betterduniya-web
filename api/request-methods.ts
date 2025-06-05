import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const requestMethods = {
  delete: (
    connection: AxiosInstance,
    url: string,
    config: AxiosRequestConfig,
    body?: unknown
  ): Promise<AxiosResponse> => connection.delete(url, { data: body, ...config }),

  get: (
    connection: AxiosInstance,
    url: string,
    config: AxiosRequestConfig
  ): Promise<AxiosResponse> => connection.get(url, config),

  post: (
    connection: AxiosInstance,
    url: string,
    config: AxiosRequestConfig,
    body?: unknown
  ): Promise<AxiosResponse> => connection.post(url, body, config),

  put: (
    connection: AxiosInstance,
    url: string,
    config: AxiosRequestConfig,
    body?: unknown
  ): Promise<AxiosResponse> => connection.put(url, body, config),

  postForm: (
    connection: AxiosInstance,
    url: string,
    config: AxiosRequestConfig,
    body: any
  ): Promise<AxiosResponse> => {
    const header = {
      'Content-Type': `multipart/form-data; boundary=${body._boundary}`,
      ...config?.headers, // Ensure headers are properly merged
    };
    return connection.post(url, body, { ...config, headers: header });
  },
};

export default requestMethods;
