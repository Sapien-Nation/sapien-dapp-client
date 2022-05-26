import Safe, { SafeFactory, EthSignSignature } from '@gnosis.pm/safe-core-sdk';
import SafeServiceClient, {
  SafeMultisigTransactionResponse,
} from '@gnosis.pm/safe-service-client';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';
import * as Sentry from '@sentry/nextjs';
import { ethers } from 'ethers';

// api
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
    return Promise.reject(typeof err === 'string' ? err : err.message);
  }
};

export const createVault = async ({
  owners,
  threshold,
}: {
  owners: Array<string>;
  threshold: number;
  senderAddress: string;
}): Promise<string> => {
  try {
    const ethAdapter = await getEthAdapter();
    const SafeFactorySDK = await SafeFactory.create({ ethAdapter });

    const safeSdk: Safe = await SafeFactorySDK.deploySafe({
      safeAccountConfig: {
        owners,
        threshold,
      },
    });

    return safeSdk.getAddress();
  } catch (err) {
    return Promise.reject(err);
  }
};

export const proposingTransaction = async ({
  safeAddress,
  senderAddress,
}: {
  safeAddress: string;
  senderAddress: string;
}): Promise<boolean> => {
  try {
    const ethAdapter = await getEthAdapter();

    const SafeServiceClientSDK = new SafeServiceClient({
      txServiceUrl,
      ethAdapter,
    });
    const SafeSDK = await Safe.create({
      ethAdapter,
      safeAddress,
    });

    const safeTransaction = await SafeSDK.createTransaction({
      to: '0x<address>',
      data: '0x<data>',
      value: '<eth_value_in_wei>',
    });
    const safeTxHash = await SafeSDK.getTransactionHash(safeTransaction);
    await SafeServiceClientSDK.proposeTransaction({
      safeAddress,
      safeTransaction,
      safeTxHash,
      senderAddress, // safe owner proposing the transaction: upgrader's sapien wallet address
      // origin  // Optional string that allows to provide more information about the app proposing the transaction.
    });

    return true;
  } catch (err) {
    Sentry.captureMessage(err);
    return Promise.reject(err.message);
  }
};

export const signTransaction = async (
  safeAddress: string,
  safeTxHash: string
): Promise<boolean> => {
  try {
    const ethAdapter = await getEthAdapter();
    const SafeSDK = await Safe.create({
      ethAdapter,
      safeAddress,
    });
    const SafeServiceClientSDK = new SafeServiceClient({
      txServiceUrl,
      ethAdapter,
    });

    const signature = await SafeSDK.signTransactionHash(safeTxHash);
    await SafeServiceClientSDK.confirmTransaction(safeTxHash, signature.data);

    return true;
  } catch (err) {
    Sentry.captureMessage(err);
    return Promise.reject(err.message);
  }
};

// check the status if pending transaction is executable or not
export const isTransactionExecutable = (
  safeThreshold: number,
  transaction: SafeMultisigTransactionResponse
) => transaction.confirmations.length >= safeThreshold;

export const NoTransactionID = 'NO_TRANSACTION_RESPONSE';
export const executeTransaction = async (
  safeAddress: string,
  safeTxHash: string
): Promise<string> => {
  try {
    const ethAdapter = await getEthAdapter();

    const SafeServiceClientSDK = new SafeServiceClient({
      txServiceUrl,
      ethAdapter,
    });
    const SafeSDK = await Safe.create({
      ethAdapter,
      safeAddress,
    });

    const transaction = await SafeServiceClientSDK.getTransaction(safeTxHash);
    const safeTransaction = await SafeSDK.createTransaction({
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
    });

    transaction.confirmations.forEach((confirmation) => {
      const signature = new EthSignSignature(
        confirmation.owner,
        confirmation.signature
      );
      safeTransaction.addSignature(signature);
    });

    const executeTxResponse = await SafeSDK.executeTransaction(safeTransaction);

    if (executeTxResponse?.transactionResponse) {
      const receipt = await executeTxResponse.transactionResponse.wait();
      return receipt.transactionHash;
    }

    return NoTransactionID;
  } catch (err) {
    Sentry.captureMessage(err);
    return Promise.reject(err.message);
  }
};
