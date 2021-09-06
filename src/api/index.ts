import axios from 'axios';

enum Envs {
  Local = 'LOCAL',
  Sandbox = 'SANDBOX',
  QAT = 'QAT',
  POC = 'POC',
}

const nodeEnv = process.env.NEXT_PUBLIC_ENV;

const getVariables = () => {
  switch (nodeEnv) {
    case Envs.Local: {
      return {
        NEXT_PUBLIC_RELEASE_NAME: process.env.NEXT_PUBLIC_API_URL_LOCAL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL_LOCAL,
        NEXT_PUBLIC_API_AUTH_URL: process.env.NEXT_PUBLIC_API_AUTH_URL_LOCAL,
        NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL_LOCAL,
        NEXT_PUBLIC_API_TOKENS_URL:
          process.env.NEXT_PUBLIC_API_TOKENS_URL_LOCAL,
        NEXT_PUBLIC_NOTIFICATION_URL:
          process.env.NEXT_PUBLIC_NOTIFICATION_URL_LOCAL,
        NEXT_PUBLIC_WALLET_IS_MAINNET:
          process.env.NEXT_PUBLIC_WALLET_IS_MAINNET_LOCAL,
        NEXT_PUBLIC_WALLET_BICONOMY_API_KEY:
          process.env.NEXT_PUBLIC_WALLET_BICONOMY_API_KEY_LOCAL,
      };
      break;
    }
    case Envs.Sandbox: {
      return {
        NEXT_PUBLIC_RELEASE_NAME: process.env.NEXT_PUBLIC_API_URL_SANDBOX,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL_SANDBOX,
        NEXT_PUBLIC_API_AUTH_URL: process.env.NEXT_PUBLIC_API_AUTH_URL_SANDBOX,
        NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL_SANDBOX,
        NEXT_PUBLIC_API_TOKENS_URL:
          process.env.NEXT_PUBLIC_API_TOKENS_URL_SANDBOX,
        NEXT_PUBLIC_NOTIFICATION_URL:
          process.env.NEXT_PUBLIC_NOTIFICATION_URL_SANDBOX,
        NEXT_PUBLIC_WALLET_IS_MAINNET:
          process.env.NEXT_PUBLIC_WALLET_IS_MAINNET_SANDBOX,
        NEXT_PUBLIC_WALLET_BICONOMY_API_KEY:
          process.env.NEXT_PUBLIC_WALLET_BICONOMY_API_KEY_SANDBOX,
      };
      break;
    }
    case Envs.QAT: {
      return {
        NEXT_PUBLIC_RELEASE_NAME: process.env.NEXT_PUBLIC_API_URL_QAT,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL_QAT,
        NEXT_PUBLIC_API_AUTH_URL: process.env.NEXT_PUBLIC_API_AUTH_URL_QAT,
        NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL_QAT,
        NEXT_PUBLIC_API_TOKENS_URL: process.env.NEXT_PUBLIC_API_TOKENS_URL_QAT,
        NEXT_PUBLIC_NOTIFICATION_URL:
          process.env.NEXT_PUBLIC_NOTIFICATION_URL_QAT,
        NEXT_PUBLIC_WALLET_IS_MAINNET:
          process.env.NEXT_PUBLIC_WALLET_IS_MAINNET_QAT,
        NEXT_PUBLIC_WALLET_BICONOMY_API_KEY:
          process.env.NEXT_PUBLIC_WALLET_BICONOMY_API_KEY_QAT,
      };
      break;
    }
    case Envs.POC: {
      return {
        NEXT_PUBLIC_RELEASE_NAME: process.env.NEXT_PUBLIC_API_URL_POC,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL_POC,
        NEXT_PUBLIC_API_AUTH_URL: process.env.NEXT_PUBLIC_API_AUTH_URL_POC,
        NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL_POC,
        NEXT_PUBLIC_API_TOKENS_URL: process.env.NEXT_PUBLIC_API_TOKENS_URL_POC,
        NEXT_PUBLIC_NOTIFICATION_URL:
          process.env.NEXT_PUBLIC_NOTIFICATION_URL_POC,
        NEXT_PUBLIC_WALLET_IS_MAINNET:
          process.env.NEXT_PUBLIC_WALLET_IS_MAINNET_POC,
        NEXT_PUBLIC_WALLET_BICONOMY_API_KEY:
          process.env.NEXT_PUBLIC_WALLET_BICONOMY_API_KEY_POC,
      };
      break;
    }
    default:
      return {};
  }
};

const {
  NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_API_AUTH_URL,
  NEXT_PUBLIC_API_TOKENS_URL,
  NEXT_PUBLIC_NOTIFICATION_URL,
  NEXT_PUBLIC_SOCKET_URL,
  NEXT_PUBLIC_WALLET_IS_MAINNET,
  NEXT_PUBLIC_WALLET_BICONOMY_API_KEY,
} = getVariables();

export const socketURL = NEXT_PUBLIC_SOCKET_URL;
export const walletIsMainnet = NEXT_PUBLIC_WALLET_IS_MAINNET;
export const walleBiconomyApiKey = NEXT_PUBLIC_WALLET_BICONOMY_API_KEY;

const instance = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
});

export const tokensInstance = axios.create({
  baseURL: NEXT_PUBLIC_API_TOKENS_URL,
});

export const authInstance = axios.create({
  baseURL: NEXT_PUBLIC_API_AUTH_URL,
});

export const notificationInstance = axios.create({
  baseURL: NEXT_PUBLIC_NOTIFICATION_URL,
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
