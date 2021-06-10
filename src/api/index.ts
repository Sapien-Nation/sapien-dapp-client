import axios from 'axios';
import { mutate } from 'swr';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_AUTH_URL = process.env.NEXT_PUBLIC_API_AUTH_URL;
console.info(`API_URL: ${API_URL}`);
console.info(`API_AUTH_URL: ${API_AUTH_URL}`);

const instance = axios.create({
  baseURL: 'http://backend.sandbox.spn33-sandbox.tooling-sapien.network/',
  withCredentials: true,
});

export const authInstance = axios.create({
  baseURL: 'http://auth.sandbox.spn33-sandbox.tooling-sapien.network/',
  withCredentials: true,
});

instance.interceptors.response.use(undefined, async (error) => {
  if (error.response.status === 401) {
    await authInstance.post('/api/v3/user/me');
    mutate('/api/users/me');
  }
  return Promise.reject(error);
});

export default instance;
