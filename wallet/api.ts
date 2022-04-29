import axios from 'axios';
import _isObject from 'lodash/isObject';

// api
import instance from 'api';

// types
import { Token, Transaction } from './types';

const gasStationUrl = process.env.NEXT_PUBLIC_GAS_STATION_URL;
const polygonAPIUrl = process.env.NEXT_PUBLIC_POLYGON_API_URL;
const polygonscanAPIKey = process.env.POLYGONSCAN_KEY;
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
    .catch(({ response }) => Promise.reject(response.data.message));
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

export const getTxHistory = (address, page, offset, sort) =>
  axios
    .get(
      `${polygonAPIUrl}?module=account&
    action=txlist&
    address=${address}&
    startblock=0&
    endblock=99999999&
    page=${page}&
    offset=${offset}&
    sort=${sort}&
    apikey=${polygonscanAPIKey}
  `
    )
    .then((response) => {
      /*response.data : {
      "status": "1",
      "message": "OK",  // "No transactions found" when account has no transactions yet
      "result": Array<Transaction>
    }*/
      return response.data.result.map((tx: Transaction) => {
        transactionHash: tx.hash;
      });
    })
    .catch(({ response }) => Promise.reject(response.data.message));
