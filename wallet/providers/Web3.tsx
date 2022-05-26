import { Biconomy } from '@biconomy/mexa';
import * as Sentry from '@sentry/nextjs';
import _range from 'lodash/range';
import { BN } from 'ethereumjs-util';
import * as sigUtil from 'eth-sig-util';
import { createContext, useContext, useRef, useEffect, useState } from 'react';

// api
import {
  getGasPrice,
  getTokenMetadata,
  connectWallet,
  deposit,
  withdraw,
  getSentTxHistory,
  getReceivedTxHistory,
} from '../api';

// contracts
import { default as PassportContractAbi } from '../contracts/Passport.json';
import { default as PlatformContractAbi } from '../contracts/Platform.json';

// constants
import { ErrorTypes } from '../constants';

// hooks
import { useAuth } from 'context/user';
import { hooks as metaMaskHooks } from '../connectors/metaMask';

// types
import type { Token } from '../types';
import type { AbiItem } from 'web3-utils';
import type { Transaction } from 'tools/types/web3';

// web3
import Web3Library from 'web3';

//----------------------------------------------------------------------------------------------------------------------------------------------------
interface Web3 {
  isReady: boolean;
  walletAPI: {
    handleWithdraw: (
      toAddress: string,
      tokenId: number
    ) => Promise<{ type: ErrorTypes; hash: string }>;
    handleDeposit: () => Promise<string>;
    getWalletBalanceSPN: (address: string) => Promise<number>;
    getPassportBalance: (address: string) => Promise<number>;
    getUserTransactions: () => Promise<Array<Transaction>>;
    getWalletTokens: (address: string) => Promise<Array<Token>>;
  } | null;
  error: any | null;
}

interface Web3ProviderProps {
  children: React.ReactNode;
}

//----------------------------------------------------------------------------------------------------------------------------------------------------
const Web3Context = createContext<Web3>({
  isReady: false,
  walletAPI: null,
  error: null,
});

const debugWeb3 = Boolean(process.env.NEXT_PUBLIC_DEBUG_BICONOMY);

const { useAccounts } = metaMaskHooks;

const Web3Provider = ({ children }: Web3ProviderProps) => {
  const { me } = useAuth();
  const [error, setError] = useState<Error | null>(null);
  const [contracts, setContracts] = useState<null | Record<string, any>>(null);
  const [biconomy, setBiconomy] = useState<any>(null);
  const WalletAPIRef = useRef(null);

  const account = useAccounts();
  const getMetamaskAddress = () => account[0];

  //----------------------------------------------------------------------------------------------------------------------------
  const config = {
    MAINNET_NETWORK_ID: Number(process.env.NEXT_PUBLIC_MAINNET_NETWORK_ID),
    POLY_NETWORK_ID: Number(process.env.NEXT_PUBLIC_POLY_NETWORK_ID),
    RPC_PROVIDER: process.env.NEXT_PUBLIC_RPC_PROVIDER,
    SPN_TOKEN_ADDRESS: process.env.NEXT_PUBLIC_SPN_TOKEN_ADDRESS,
    PASSPORT_CONTRACT_ADDRESS:
      process.env.NEXT_PUBLIC_PASSPORT_CONTRACT_ADDRESS,
    BICONOMY_API_KEY: process.env.NEXT_PUBLIC_WALLET_BICONOMY_API_KEY,
    EXPLORER_BASE_URL: process.env.NEXT_PUBLIC_EXPLORER_BASE_URL,
    GAS_STATION_URL: process.env.NEXT_PUBLIC_GAS_STATION_URL,
    GAS_LIMIT: 300000,
  };

  useEffect(() => {
    const initWeb3WithBiconomy = async () => {
      try {
        // await createVault(['0x29eB8e014D182dDAFB14602A8d297680D6584859', '0xf432638B93336D2537bBe07fF8BCdA541d244bc2', '0xD4a1453D1E9a6De301A85495227f8E74d51A3094'], 2);
        const biconomy = new Biconomy(
          new Web3Library.providers.HttpProvider(config.RPC_PROVIDER),
          {
            walletProvider: window.ethereum,
            apiKey: config.BICONOMY_API_KEY,
            debug: debugWeb3,
          }
        );
        setBiconomy(biconomy);

        biconomy.onEvent(biconomy.READY, async () => {
          if (debugWeb3) {
            console.log('@Biconomy/mexa ready, initializing Web3API');
          }

          const biconomyWeb3 = new Web3Library(biconomy);
          setContracts({
            passportContract: new biconomyWeb3.eth.Contract(
              PassportContractAbi as Array<AbiItem>,
              config.PASSPORT_CONTRACT_ADDRESS
            ),
            platformPassportDomainData: {
              name: 'Sapien Network',
              version: '1',
              verifyingContract: config.PASSPORT_CONTRACT_ADDRESS,
              salt: `0x${config.POLY_NETWORK_ID.toString(16).padStart(
                64,
                '0'
              )}`,
            },
            platformSPNContract: new biconomyWeb3.eth.Contract(
              PlatformContractAbi as AbiItem[],
              config.SPN_TOKEN_ADDRESS
            ),
            platformSPNDomainData: {
              name: 'Sapien Network',
              version: '1',
              verifyingContract: config.SPN_TOKEN_ADDRESS,
              salt: `0x${config.POLY_NETWORK_ID.toString(16).padStart(
                64,
                '0'
              )}`,
            },
          });

          setError(null);
          WalletAPIRef.current = biconomyWeb3;
        });

        biconomy.onEvent(biconomy.ERROR, (error, message) => {
          if (debugWeb3) {
            console.error('Error initializing @Biconomy/mexa', error, message);
          }

          Sentry.captureMessage(message);
          setError(error);
        });
      } catch (err) {
        setError(err);
      }
    };

    initWeb3WithBiconomy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWalletBalanceSPN = async () => {
    try {
      const balance = await contracts.platformSPNContract.methods
        .balanceOf(me.walletAddress)
        .call();

      return Number(balance);
    } catch (err) {
      Sentry.captureMessage(err);
      return Promise.reject(err);
    }
  };

  const getPassportBalance = async (address) => {
    try {
      const passportBalance = await contracts.passportContract.methods
        .balanceOf(address)
        .call();

      return Number(passportBalance);
    } catch (err) {
      Sentry.captureMessage(err);
      return Promise.reject(err);
    }
  };

  const getWalletTokens = async (address): Promise<Array<Token>> => {
    try {
      const balance = await getPassportBalance(address);

      if (balance === 0) {
        return [];
      }

      const getTokenData = async (token) => {
        try {
          const tokenId = await contracts.passportContract.methods
            .tokenOfOwnerByIndex(address, token)
            .call();

          const tokenMetadata = await getTokenMetadata(tokenId);

          return {
            id: tokenId,
            name: tokenMetadata.name,
            image: tokenMetadata.image,
          };
        } catch (err) {
          Sentry.captureMessage(err);
          return {
            id: null,
            name: `Token ${token} FAILED `,
            image: null,
          };
        }
      };

      // we do balance + 1 because we need an array like balance = 3 = [0,1,2]
      const tokensPromises = await Promise.allSettled(
        _range(0, balance).map(getTokenData)
      );

      return [
        ...tokensPromises
          .filter((result) => result.status === 'fulfilled')
          .map((result) => (result as any).value),
        ...tokensPromises
          .filter((result) => result.status === 'rejected')
          .map((result) => (result as any).reason),
      ];
    } catch (err) {
      Sentry.captureMessage(err);
      return Promise.reject(err);
    }
  };
  const handleWithdraw = async (
    to: string,
    tokenId: number
  ): Promise<{ type: ErrorTypes; hash: string }> => {
    try {
      const tokenAddress = await contracts.passportContract.methods
        .ownerOf(tokenId)
        .call();

      const { walletAddress } = me;

      if (tokenAddress === walletAddress) {
        const { key } = await connectWallet();
        const gasPrice = await getGasPrice(config.GAS_LIMIT / 4);

        const signedTx =
          await WalletAPIRef.current.eth.accounts.signTransaction(
            {
              from: walletAddress,
              gasPrice: Web3Library.utils
                .toWei(new BN(gasPrice), 'gwei')
                .toNumber(),
              gasLimit: config.GAS_LIMIT,
              to: config.PASSPORT_CONTRACT_ADDRESS,
              value: '0x0',
              data: contracts.passportContract.methods
                .safeTransferFrom(walletAddress, to, tokenId)
                .encodeABI(),
            },
            `0x${key}`
          );

        const forwardData = await biconomy.getForwardRequestAndMessageToSign(
          signedTx.rawTransaction
        );

        const signature = sigUtil.signTypedMessage(
          Buffer.from(key, 'hex'),
          { data: forwardData.eip712Format },
          'V4'
        );

        // Get the transaction Hash using the Event Emitter returned
        const data = await WalletAPIRef.current.eth.sendSignedTransaction({
          signature: signature,
          forwardRequest: forwardData.request,
          rawTransaction: signedTx.rawTransaction,
          signatureType: biconomy.EIP712_SIGN,
        });

        if (data === null) {
          // @see https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#eth-gettransactionreceipt-return 'null if no receipt was found:'
          return Promise.reject('Receipt Address was found.');
        }

        if (data.error) {
          return { hash: data.transactionHash, type: ErrorTypes.Fail };
        }

        await withdraw(tokenId);
        return { hash: data.transactionHash, type: ErrorTypes.Success };
      }
      return Promise.reject('Token does not belong to this wallet.');
    } catch (err) {
      Sentry.captureMessage(err);
      return Promise.reject(err.message);
    }
  };

  const handleDeposit = async (): Promise<string> => {
    try {
      const metamaskAddress = getMetamaskAddress();
      const tokens = await getWalletTokens(metamaskAddress);

      const gasPrice = await getGasPrice();

      const tokenId = tokens[0].id;
      const data = await contracts.passportContract.methods
        .safeTransferFrom(metamaskAddress, me.walletAddress, tokenId)
        .send({
          from: metamaskAddress,
          signatureType: biconomy.EIP712_SIGN,
          gasPrice: Web3Library.utils
            .toWei(new BN(gasPrice), 'gwei')
            .toNumber(),
          gasLimit: config.GAS_LIMIT,
        });

      if (data === null || data === undefined)
        return Promise.reject('Unknow error');

      await deposit(tokenId);
      return data.transactionHash;
    } catch (err) {
      Sentry.captureMessage(err);
      return Promise.reject(err);
    }
  };

  const getUserTransactions = async (): Promise<Array<Transaction>> => {
    try {
      const sentHistory = await getSentTxHistory(me.walletAddress);
      const receivedHistory = await getReceivedTxHistory(me.walletAddress);

      return [
        ...(sentHistory.data.err ? [] : sentHistory.data.result.transfers),
        ...(receivedHistory.data.err
          ? []
          : receivedHistory.data.result.transfers),
      ];
    } catch (err) {
      Sentry.captureMessage(err);
      return Promise.resolve([]);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        isReady: WalletAPIRef.current !== null,
        error: error,
        walletAPI: {
          handleWithdraw,
          handleDeposit,
          getWalletBalanceSPN,
          getWalletTokens,
          getUserTransactions,
          getPassportBalance,
        },
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

function useWeb3() {
  const context = useContext(Web3Context);

  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}

export { Web3Provider, useWeb3 };
