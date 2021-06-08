import axios from 'axios';
import { mutate } from 'swr';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_AUTH_URL = process.env.NEXT_PUBLIC_API_AUTH_URL;

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const authInstance = axios.create({
  baseURL: API_AUTH_URL,
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
