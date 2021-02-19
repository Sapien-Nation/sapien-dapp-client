/* istanbul ignore file */
import axios from 'axios';
import { mutate } from 'swr';

const { NEXT_PUBLIC_API_URL: API_URL } = process.env;

const instance = axios.create({
  baseURL: API_URL
});

instance.interceptors.response.use(undefined, async (error) => {
  if (error.response.status === 401) {
    await axios.post('/api/users/logout');
    mutate('/api/users/me');
  }
  return Promise.reject(error);
});

export default instance;
