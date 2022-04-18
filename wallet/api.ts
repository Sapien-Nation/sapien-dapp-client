// api
import { authInstance } from 'api';
import axios from 'axios';

export const connectWallet = () =>
  authInstance
    .get('/api/v3/wallet/connect')
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const getTokenData = (url: string) =>
  authInstance
    .get(url)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const getGasPrice = (gasStationUrl) =>
  axios
    .get(gasStationUrl)
    .then((response) => response.data?.fast)
    .catch((_err) => '50'); // default value
