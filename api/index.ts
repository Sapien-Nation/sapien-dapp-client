import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_AUTH_URL,
});

instance.interceptors.request.use((config) => {
  const tokens = window.localStorage.getItem('tokens');
  if (tokens) {
    const { token } = JSON.parse(tokens);
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, undefined);

authInstance.interceptors.request.use((config) => {
  const tokens = window.localStorage.getItem('tokens');
  if (tokens) {
    const { token } = JSON.parse(tokens);
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, undefined);

export default instance;
