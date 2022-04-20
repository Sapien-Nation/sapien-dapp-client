// api
import instance, { authInstance } from 'api';
import axios from 'axios';

// types
import { Token } from './types';

export const connectWallet = () =>
  authInstance
    .post('/api/v3/wallet/connect')
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const fetchTokenData = (url: string) =>
  axios
    .get(url)
    .then((response) => response.data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const getGasPrice = (gasStationUrl) =>
  axios
    .get(gasStationUrl)
    .then((response) => response.data?.fast)
    .catch((_err) => '50'); // default value

export const getTokenMetadata = (token): Promise<Token> =>
  instance
    .get(`/api/v3/passport/metadata/${token}`)
    .then((response) => response.data)
    .catch(({ response }) => Promise.reject(response.data.message));
