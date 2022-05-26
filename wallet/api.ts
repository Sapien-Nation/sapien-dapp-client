import axios from 'axios';
import _isObject from 'lodash/isObject';
import * as Sentry from '@sentry/nextjs';

// api
import instance from 'api';

// types
import { Token } from './types';

//----------------------------------------------------------------------
const gasStationUrl = process.env.NEXT_PUBLIC_GAS_STATION_URL;
const alchemyAPIUrl = process.env.NEXT_PUBLIC_ALCHEMYSCAN_URL;
const alchemyAPIKey = process.env.NEXT_PUBLIC_ALCHEMYSCAN_KEY;

const alchemyAPIKeyURL = `${alchemyAPIUrl}/${alchemyAPIKey}`;

const getAlchemyTXhistoryPOSTParams = ({ options = {}, params = {} } = {}) => ({
  jsonrpc: '2.0',
  id: 0,
  method: 'alchemy_getAssetTransfers',
  params: {
    fromBlock: '0x0',
    toBlock: 'latest',
    excludeZeroValue: false,
    category: ['external'],
    ...params,
  },
  ...options,
});

//----------------------------------------------------------------------
export const connectWallet = () => {
  const tokens = window.localStorage.getItem('tokens');
  const { token } = JSON.parse(tokens);

  return axios
    .get('/api/torus/connect', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data)
    .catch((error) => {
      Sentry.captureException(error);
      return Promise.reject(error?.response?.data?.message ?? 'Error');
    });
};

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
    .get(`/core-api/passport/metadata/${tokenId}`)
    .then((response) => response.data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const getSentTxHistory = (address) =>
  axios
    .post(
      alchemyAPIKeyURL,
      getAlchemyTXhistoryPOSTParams({ params: { fromAddress: address } }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => response)
    .catch(({ response }) => Promise.reject(response.data.message));

export const getReceivedTxHistory = (address) =>
  axios
    .post(
      alchemyAPIKeyURL,
      getAlchemyTXhistoryPOSTParams({ params: { toAddress: address } }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => response)
    .catch(({ response }) => Promise.reject(response.data.message));

export const deposit = (tokenId): Promise<Token> =>
  instance
    .post(`/api/v3/wallet/deposit/${tokenId}`)
    .then((response) => response.data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const withdraw = (tokenId): Promise<Token> =>
  instance
    .post(`/api/v3/wallet/withdraw/${tokenId}`)
    .then((response) => response.data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const signPassport = (tokenId): Promise<Token> =>
  instance
    .post(`/core-api/passport/${tokenId}/sign`)
    .then((response) => response.data)
    .catch(({ response }) => Promise.reject(response.data.message));
