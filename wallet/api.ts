import _isObject from 'lodash/isObject';

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

export const getGasPrice = (fallbackGasPrice = 7500) =>
  axios
    .get(gasStationUrl)
    .then((response) => {
      if (response?.data?.fast) {
        if (_isObject(response.data.fast)) {
          return response.data.fast.maxFee;
        }
        return response.data.fast;
      }
      return fallbackGasPrice;
    })
    .catch((_err) => fallbackGasPrice);

export const getTokenMetadata = (tokenId): Promise<Token> =>
  instance
    .get(`/api/v3/passport/metadata/${tokenId}`)
    .then((response) => response.data)
    .catch(({ response }) => Promise.reject(response.data.message));
