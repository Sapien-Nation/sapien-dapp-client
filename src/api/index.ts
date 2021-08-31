import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const tokensInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_TOKENS_URL,
});

export const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_AUTH_URL,
});

export const notificationInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NOTIFICATION_URL,
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

notificationInstance.interceptors.request.use((config) => {
  const tokens = window.localStorage.getItem('tokens');
  if (tokens) {
    const { token } = JSON.parse(tokens);
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, undefined);
notificationInstance.interceptors.response.use(undefined, async (error) => {
  if (error.response?.status === 401) {
    // mutate('/api/v3/user/me', null, false);
    // window.location.reload();
    // return;
  }
  return Promise.reject(error);
});

export default instance;
