// api
import instance, { authInstance } from 'api';
import axios from 'axios';

// types
import { Token } from './types';

const gasStationUrl = process.env.NEXT_PUBLIC_GAS_STATION_URL;
export const connectWallet = () =>
  authInstance
    .post('/api/v3/wallet/connect')
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const getGasPrice = () =>
  axios
    .get(gasStationUrl)
    .then((response) => response.data?.fast)
    .catch((_err) => '50'); // default value

export const getTokenMetadata = (tokenId): Promise<Token> =>
  instance
    .get(`/api/v3/passport/metadata/${tokenId}`)
    .then((response) => response.data)
    .catch(({ response }) => Promise.reject(response.data.message));
