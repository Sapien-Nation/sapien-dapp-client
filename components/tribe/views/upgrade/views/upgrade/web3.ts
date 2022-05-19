import Safe, { SafeFactory, SafeAccountConfig } from '@gnosis.pm/safe-core-sdk';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';
import * as Sentry from '@sentry/nextjs';
import { ethers } from 'ethers';

export const createVault = async (
  owners: Array<string>,
  threshold: number
): Promise<string> => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const safeOwner = provider.getSigner(0);

    const ethAdapter = new EthersAdapter({
      ethers,
      signer: safeOwner,
    });
    const safeFactory = await SafeFactory.create({ ethAdapter });

    const safeAccountConfig: SafeAccountConfig = {
      owners,
      threshold,
    };

    const safeSdk: Safe = await safeFactory.deploySafe({ safeAccountConfig });
    return safeSdk.getAddress();
  } catch (err) {
    Sentry.captureMessage(err);
    return Promise.reject(err.message);
  }
};
