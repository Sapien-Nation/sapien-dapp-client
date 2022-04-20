// api
import { authInstance } from 'api';
import axios from 'axios';

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
