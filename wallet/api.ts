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
    order: 'desc',
    withMetadata: true,
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
    .catch(({ response }) => {
      return Promise.reject(response.data.message);
    });
};

export const getGasPrice = (fallbackGasPrice = 7500) =>
  axios
    .get(gasStationUrl)
    .then((response) => {
      if (response?.data?.fast) {
        // mumbai
        if (_isObject(response.data.fast)) {
          return response.data.fast.maxFee;
        }

        // rinkeby
        if (_isObject(response.data.result)) {
          return response.data.result.SafeGasPrice;
        }

        // polygon
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

export const getSentTxHistory = (address, category = null) =>
  axios
    .post(
      alchemyAPIKeyURL,
      getAlchemyTXhistoryPOSTParams({ params: { fromAddress: address, category: category ? category : ['external'] } }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => response)
    .catch(({ response }) => Promise.reject(response.data.message));

export const getReceivedTxHistory = (address, category = null) =>
  axios
    .post(
      alchemyAPIKeyURL,
      getAlchemyTXhistoryPOSTParams({ params: { toAddress: address, category: category ? category : ['external'] } }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => response)
    .catch(({ response }) => Promise.reject(response.data.message));

/**
 * retrieve a transaction history of user
 * @param address user address
 * @returns {
 *  erc20: {sent: [...], received: [...]},
 *  erc721: {sent, received},
 *  erc1155: {sent, received},
 * }
 */
export const getUserTxHistory = async (address) => {
  try {
    const [erc20, erc721, erc1155] = await Promise.all(
      ['erc20', 'erc721', 'erc1155'].map(async cate => {
        const sent = await getSentTxHistory(address, [cate]);
        const received = await getReceivedTxHistory(address, [cate]);
        return {
          sent: sent.data.err ? [] : sent.data.result.transfers,
          received: received.data.err ? [] : received.data.result.transfers
        };
      })
    )
    return { erc20, erc721, erc1155 };
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export const getGnosisSafeTxHistory = async (address) => {
  try {
    const txns = await getReceivedTxHistory(address);
    return txns.data.err ? [] : txns.data.result.transfers;
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export const deposit = ({ tokenId, txHash }): Promise<Token> =>
  instance
    .post(`/core-api/wallet/deposit/${tokenId}`, { txHash })
    .then((response) => response.data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const withdraw = ({ tokenId, txHash }): Promise<Token> =>
  instance
    .post(`/core-api/wallet/withdraw/${tokenId}`, { txHash })
    .then((response) => response.data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const transferFT = ({ to, token, amount }) =>
  instance
    .post(`/core-api/wallet/transferFT`, { to, token, amount })
    .then((response) => response.data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const signPassport = (tokenId): Promise<Token> =>
  instance
    .post(`/core-api/passport/${tokenId}/sign`)
    .then((response) => response.data)
    .catch(({ response }) => Promise.reject(response.data.message));
