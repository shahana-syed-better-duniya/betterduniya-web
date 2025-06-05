import axios, {AxiosInstance} from 'axios';
import Config from 'react-native-config';

const backendUrl: string = Config.BACKEND_URL ?? 'https://localhost:7029';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: backendUrl,
  timeout: 5 * 60 * 10 * 1000, // 5 minutes in milliseconds
});

export default axiosInstance;
