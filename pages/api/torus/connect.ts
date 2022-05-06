import axios from 'axios';
import * as Sentry from '@sentry/nextjs';
import { createDecipheriv } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

const walletInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_AUTH_URL,
  withCredentials: true,
});

export const decrypt = (value) => {
  const key = Buffer.from(process.env.CRYPTO_KEY, 'hex');
  const iv = Buffer.from(value.substr(0, 32), 'hex');
  const decipher = createDecipheriv('aes-256-cbc', key, iv);
  const buffer = decipher.update(value.substr(32), 'hex');
  return Buffer.concat([buffer, decipher.final()]).toString();
};

const connectWallet = async (headers) =>
  walletInstance
    .post(
      `${process.env.NEXT_PUBLIC_API_AUTH_URL}/wallet-api/connect`,
      {},
      {
        withCredentials: true,
        headers,
      }
    )
    .then(({ data }) => data)
    .catch((error) => {
      Sentry.captureException(error);
      return Promise.reject(error?.response?.data?.message ?? 'Error');
    });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const data = await connectWallet(req.headers);
      if (data.key) {
        return res.status(200).json({ key: decrypt(data.key) });
      }

      return res.status(401).json({ message: 'No Wallet Key' });
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  }

  return res.status(404).json({ message: 'Not Found' });
}
