import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_AUTH_URL = process.env.NEXT_PUBLIC_API_AUTH_URL;

const instance = axios.create({
  baseURL:
    API_URL || 'http://backend.sandbox.spn33-sandbox.tooling-sapien.network/',
});

export const authInstance = axios.create({
  baseURL:
    API_AUTH_URL || 'http://auth.sandbox.spn33-sandbox.tooling-sapien.network/',
});

authInstance.interceptors.request.use((config) => {
  const tokens = window.localStorage.getItem('tokens');
  if (tokens) {
    const { token } = JSON.parse(tokens);
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, undefined);
authInstance.interceptors.response.use(undefined, async (error) => {
  if (error.response?.status === 401) {
    // mutate('/api/v3/user/me', null, false);
    // window.location.reload();
    // return;
  }
  return Promise.reject(error);
});

instance.interceptors.request.use((config) => {
  const tokens = window.localStorage.getItem('tokens');
  if (tokens) {
    const { token } = JSON.parse(tokens);
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, undefined);
instance.interceptors.response.use(undefined, async (error) => {
  if (error.response?.status === 401) {
    // mutate('/api/v3/user/me', null, false);
    // window.location.reload();
    // return;
  }
  return Promise.reject(error);
});

export default instance;
