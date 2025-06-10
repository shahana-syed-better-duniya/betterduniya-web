import axios, {AxiosInstance} from 'axios';
import Config from 'react-native-config';

const backendUrl: string = 'https://localhost:7029'//Config.BACKEND_URL ?? 'https://duniya-gwfjh3h9h5e4eran.canadacentral-01.azurewebsites.net';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: backendUrl,
  timeout: 5 * 60 * 10 * 1000, // 5 minutes in milliseconds
});

export default axiosInstance;
