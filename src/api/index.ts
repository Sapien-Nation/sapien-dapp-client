import axios from 'axios';
import { mutate } from 'swr';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_AUTH_URL = process.env.NEXT_PUBLIC_API_AUTH_URL;

const instance = axios.create({
  baseURL: API_URL,
});

export const authInstance = axios.create({
  baseURL: API_AUTH_URL,
  withCredentials: true,
});

instance.interceptors.response.use(undefined, async (error) => {
  if (error.response.status === 401) {
    await axios.post('/api/users/logout');
    mutate('/api/users/me');
  }
  return Promise.reject(error);
});

export default instance;
