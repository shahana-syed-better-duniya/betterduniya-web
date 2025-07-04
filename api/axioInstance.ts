import axios, {AxiosInstance} from 'axios';

const prodUrl = 'https://betterduniya.azurewebsites.net';
const localUrl = 'https://localhost:7029';

export const backendUrl: string = prodUrl;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: backendUrl,
  timeout: 5 * 60 * 10 * 1000, // 5 minutes in milliseconds
});

export default axiosInstance;
