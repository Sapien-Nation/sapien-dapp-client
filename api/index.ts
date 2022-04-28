/* istanbul ignore file */
import axios from 'axios';

export enum Envs {
  Local = 'LOCAL',
  Sandbox = 'SANDBOX',
  QAT = 'QAT',
  POC = 'POC',
}

const nodeEnv = process.env.NEXT_PUBLIC_ENV;
export const env = nodeEnv;
export const socketURL = process.env.NEXT_PUBLIC_SOCKET_URL;

/*
 ***
 ***  Instances
 ***
 */
export const localInstance = axios.create();

const instance = axios.create({
  baseURL: '',
  withCredentials: true,
});

export const authInstance = axios.create({
  baseURL: '',
  withCredentials: true,
});

/*
 ***
 ***  Interceptors
 ***
 */
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

/*
 ***
 ***  Fetchers
 ***
 */
export const fetcher = (url: string) => {
  return instance
    .get(url)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
};

export const authFetcher = (url = '/user-api/me') =>
  authInstance
    .get(url)
    .then(({ data }) => data)
    .catch((response) => Promise.reject(response.data.message));

export default instance;
