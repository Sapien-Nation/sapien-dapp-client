import axios from 'axios';

export const localInstance = axios.create();

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_AUTH_URL,
});

export const tokensInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_TOKENS_URL,
});

export const notificationInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_NOTIFICATION_URL,
  baseURL: 'https://notif-sandbox.sapien.network/',
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

notificationInstance.interceptors.request.use((config) => {
  const tokens = window.localStorage.getItem('tokens');
  if (tokens) {
    const { token } = JSON.parse(tokens);
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, undefined);

export default instance;

export enum Envs {
  Local = 'LOCAL',
  Sandbox = 'SANDBOX',
  QAT = 'QAT',
  POC = 'POC',
}

const nodeEnv = process.env.NEXT_PUBLIC_ENV;
export const env = nodeEnv;
export const socketURL = process.env.NEXT_PUBLIC_SOCKET_URL;
export const walletIsMainnet = process.env.NEXT_PUBLIC_WALLET_IS_MAINNET;
export const walleBiconomyApiKey =
  process.env.NEXT_PUBLIC_WALLET_BICONOMY_API_KEY;
export const walletVerifier = process.env.NEXT_PUBLIC_WALLET_VERIFIER;
export const walletSubVerifier = process.env.NEXT_PUBLIC_WALLET_SUB_VERIFIER;
