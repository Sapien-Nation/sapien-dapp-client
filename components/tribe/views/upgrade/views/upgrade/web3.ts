import Safe, {
  SafeFactory,
  SafeAccountConfig,
  EthSignSignature,
} from '@gnosis.pm/safe-core-sdk';
import {
  SafeTransactionDataPartial,
  SafeTransactionData,
} from '@gnosis.pm/safe-core-sdk-types';
import SafeServiceClient, {
  SafeMultisigTransactionResponse,
} from '@gnosis.pm/safe-service-client';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';
import * as Sentry from '@sentry/nextjs';
import { ethers } from 'ethers';
import { connectWallet } from 'wallet/api';

const txServiceUrl = process.env.NEXT_PUBLIC_SAFESERVICE_URL;
const provider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_RPC_PROVIDER
);

const getEthAdapter = async () => {
  try {
    const { key } = await connectWallet();
    const safeOwner = new ethers.Wallet(`0x${key}`, provider);

    return new EthersAdapter({
      ethers,
      signer: safeOwner,
    });
  } catch (err) {
    return Promise.reject(err.message);
  }
};

export const createVault = async ({
  owners,
  threshold,
  senderAddress,
}: {
  owners: Array<string>;
  threshold: number;
  senderAddress: string;
}): Promise<string> => {
  try {
    const ethAdapter = await getEthAdapter();
    const safeFactory = await SafeFactory.create({ ethAdapter });

    const safeAccountConfig: SafeAccountConfig = {
      owners,
      threshold,
    };

    const safeSdk: Safe = await safeFactory.deploySafe({ safeAccountConfig });
    const safeAddress = safeSdk.getAddress();

    // // get transaction hash
    // const to = '0x<address>';
    // const data = '0x<data>';
    // const value = '<eth_value_in_wei>';
    // const transaction: SafeTransactionDataPartial = {
    //   to,
    //   data,
    //   value
    // }
    // const safeTransaction = await safeSdk.createTransaction(transaction)
    // const safeTxHash = await safeSdk.getTransactionHash(safeTransaction)
    // const safeService = new SafeServiceClient({txServiceUrl, ethAdapter})
    // await safeService.proposeTransaction({
    //   safeAddress,
    //   safeTransaction,
    //   safeTxHash,
    //   senderAddress, // safe owner proposing the transaction: upgrader's sapien wallet address
    //   // origin  // Optional string that allows to provide more information about the app proposing the transaction.
    // })
    return safeAddress;
  } catch (err) {
    Sentry.captureMessage(err);
    return Promise.reject(err.message);
  }
};

export const signTransaction = async (
  safeAddress: string,
  safeTxHash: string
): Promise<string> => {
  try {
    const ethAdapter = await getEthAdapter();
    const safeSdk = await Safe.create({ ethAdapter, safeAddress });
    let signature = await safeSdk.signTransactionHash(safeTxHash);
    const safeService = new SafeServiceClient({ txServiceUrl, ethAdapter });
    await safeService.confirmTransaction(safeTxHash, signature.data);
    return 'Success';
  } catch (err) {
    Sentry.captureMessage(err);
    return Promise.reject(err.message);
  }
};

// check the status if pending transaction is executable or not
export const isTransactionExecutable = (
  safeThreshold: number,
  transaction: SafeMultisigTransactionResponse
) => {
  try {
    return transaction.confirmations.length >= safeThreshold;
  } catch (err) {
    Sentry.captureMessage(err);
    return Promise.reject(err.message);
  }
};

export const executeTransaction = async (
  safeAddress: string,
  safeTxHash: string
): Promise<string> => {
  try {
    const ethAdapter = await getEthAdapter();
    const safeSdk = await Safe.create({ ethAdapter, safeAddress });
    const safeService = new SafeServiceClient({ txServiceUrl, ethAdapter });
    const transaction = await safeService.getTransaction(safeTxHash);
    const safeTransactionData: SafeTransactionData = {
      to: transaction.to,
      value: transaction.value,
      data: transaction.data,
      operation: transaction.operation,
      safeTxGas: transaction.safeTxGas,
      baseGas: transaction.baseGas,
      gasPrice: parseInt(transaction.gasPrice), // need to be changed
      gasToken: transaction.gasToken,
      refundReceiver: transaction.refundReceiver,
      nonce: transaction.nonce,
    };
    const safeTransaction = await safeSdk.createTransaction(
      safeTransactionData
    );
    transaction.confirmations.forEach((confirmation) => {
      const signature = new EthSignSignature(
        confirmation.owner,
        confirmation.signature
      );
      safeTransaction.addSignature(signature);
    });

    const executeTxResponse = await safeSdk.executeTransaction(safeTransaction);
    const receipt =
      executeTxResponse.transactionResponse &&
      (await executeTxResponse.transactionResponse.wait());
    return receipt.transactionHash;
  } catch (err) {
    Sentry.captureMessage(err);
    return Promise.reject(err.message);
  }
};
