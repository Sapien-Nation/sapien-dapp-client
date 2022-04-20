import { Network } from '@ethersproject/networks';
import * as Sentry from '@sentry/nextjs';
import _range from 'lodash/range';
import { ethers } from 'ethers';
import { BN } from 'ethereumjs-util';
import { createContext, useContext, useEffect, useState } from 'react';

// contracts
import { default as PassportContractAbi } from '../contracts/Passport.json';
import { default as PlatformContractAbi } from '../contracts/Platform.json';
import { Contract } from '@ethersproject/contracts';

// api
import { getGasPrice, connectWallet, getTokenMetadata } from '../api';

// hooks
import { useAuth } from 'context/user';
import { hooks as metaMaskHooks } from '../connectors/metaMask';

// types
import type { Token } from '../types';
import type { AbiItem } from 'web3-utils';

// web3
import Web3Library from 'web3';

//----------------------------------------------------------------------------------------------------------------------------------------------------
interface Web3Error {
  message: string;
  code: number;
}

interface Web3 {
  isWeb3Ready: boolean;
  walletAPI: {
    handleWithdraw: (toAddress: string, tokenId: number) => Promise<string>;
    handleDeposit: () => Promise<string>;
    getWalletBalanceSPN: (address: string) => Promise<number>;
    getPassportBalance: (address: string) => Promise<number>;
    getWalletTokens: (address: string) => Promise<Array<Token>>;
  } | null;
  web3Error: Web3Error | null;
}

interface WalletConfig {
  MAINNET_NETWORK_ID: number;
  POLY_NETWORK_ID: number;
  RPC_PROVIDER: string;
  SPN_TOKEN_ADDRESS: string;
  BADGE_STORE_ADDRESS: string;
  PASSPORT_CONTRACT_ADDRESS: string;
  BICONOMY_API_KEY: string;
  EXPLORER_BASE_URL: string;
  GAS_STATION_URL: string;
  GAS_LIMIT: number;
}

interface Web3ProviderProps {
  children: React.ReactNode;
}

//----------------------------------------------------------------------------------------------------------------------------------------------------
const Web3Context = createContext<Web3>({
  isWeb3Ready: false,
  walletAPI: null,
  web3Error: null,
});

const walletIsMainnet = process.env.NEXT_PUBLIC_WALLET_IS_MAINNET;
const walletBiconomyApiKey = process.env.NEXT_PUBLIC_WALLET_BICONOMY_API_KEY;

const { useAccounts, useProvider } = metaMaskHooks;

const Web3Provider = ({ children }: Web3ProviderProps) => {
  const { me } = useAuth();

  const account = useAccounts();
  const getMetamaskAddress = () => account[0];
  const metamaskProvider = useProvider();

  //----------------------------------------------------------------------------------------------------------------------------
  const config: WalletConfig = (() => {
    if (walletIsMainnet === 'true') {
      return {
        MAINNET_NETWORK_ID: 1,
        POLY_NETWORK_ID: 137,
        RPC_PROVIDER: 'https://polygon-rpc.com/',
        SPN_TOKEN_ADDRESS: '0x3Cd92Be3Be24daf6D03c46863f868F82D74905bA', // Mainnet SPN
        BADGE_STORE_ADDRESS: '0x2ee22E2fFBd1f2450A6879D34172341da31726be',
        PASSPORT_CONTRACT_ADDRESS: '0x8E2aAf7aCdCFD363d65C86856e9CBeF1EcB238a4', // TODO set when deployed
        BICONOMY_API_KEY: walletBiconomyApiKey,
        EXPLORER_BASE_URL: 'https://polygonscan.com/tx/',
        GAS_STATION_URL: 'https://gasstation-mainnet.matic.network/',
        GAS_LIMIT: 300000,
      };
    }

    return {
      MAINNET_NETWORK_ID: 5,
      POLY_NETWORK_ID: 80001,
      RPC_PROVIDER: 'https://rpc-mumbai.matic.today/',
      SPN_TOKEN_ADDRESS: '0x2d280CeF1B0Ab6E78a700824Ebe368C2E1B00BEd', // Mumbai SPN
      BADGE_STORE_ADDRESS: '0x59cD3d76cC9EA4f626629337664A3CbD78F48474',
      PASSPORT_CONTRACT_ADDRESS: '0xF58c8Fbb8fE6F49E536D4df3A684626261d01a87',
      BICONOMY_API_KEY: walletBiconomyApiKey,
      EXPLORER_BASE_URL: 'https://mumbai.polygonscan.com/tx/',
      GAS_STATION_URL: 'https://gasstation-mumbai.matic.today/',
      GAS_LIMIT: 30000,
    };
  })();

  const polygonNetwork: Network = {
    name: 'matic',
    chainId: config.POLY_NETWORK_ID,
    _defaultProvider: (providers) =>
      new providers.JsonRpcProvider(config.RPC_PROVIDER),
  };

  const ethersProvider = ethers.getDefaultProvider(polygonNetwork);

  const Web3API = new Web3Library(config.RPC_PROVIDER);
  const contracts = {
    passportContract: new Web3API.eth.Contract(
      PassportContractAbi as Array<AbiItem>,
      config.PASSPORT_CONTRACT_ADDRESS
    ),
    platformSPNContract: new Web3API.eth.Contract(
      PlatformContractAbi as AbiItem[],
      config.SPN_TOKEN_ADDRESS
    ),
    platformSPNDomainData: {
      name: 'Sapien Network',
      version: '1',
      verifyingContract: config.SPN_TOKEN_ADDRESS,
      salt: `0x${config.POLY_NETWORK_ID.toString(16).padStart(64, '0')}`,
    },
  };

  const getWalletBalanceSPN = async () => {
    try {
      const balance = await contracts.platformSPNContract.methods
        .balanceOf(me.walletAddress)
        .call();

      return Number(balance);
    } catch (err) {
      Sentry.captureException(err);
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
      Sentry.captureException(err);
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
          Sentry.captureException(err);
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
      Sentry.captureException(err);
      return Promise.reject(err);
    }
  };
  const handleWithdraw = async (
    toAddress: string,
    tokenId: number
  ): Promise<string> => {
    try {
      // TODO call wallet API connect to get torus private key
      const { privKey } = await connectWallet();

      const signer = new ethers.Wallet(privKey, ethersProvider);

      const contract = await new Contract(
        config.PASSPORT_CONTRACT_ADDRESS,
        PassportContractAbi,
        signer
      );

      const gasPrice = await getGasPrice(config.GAS_STATION_URL);

      const tx = await contract.transferFrom(
        me.walletAddress,
        toAddress,
        tokenId,
        {
          gasPrice: Web3Library.utils
            .toWei(new BN(gasPrice), 'gwei')
            .toNumber(),
          gasLimit: config.GAS_LIMIT,
        }
      );

      return tx.hash;
    } catch (err) {
      Sentry.captureException(err);
      return Promise.reject(err.message);
    }
  };

  const handleDeposit = async (): Promise<string> => {
    try {
      const metamaskAddress = getMetamaskAddress();
      const tokens = await getWalletTokens(metamaskAddress);

      const signer = await metamaskProvider.getSigner();

      const contract = await new Contract(
        config.PASSPORT_CONTRACT_ADDRESS,
        PassportContractAbi,
        signer
      );

      const tx = await contract.transferFrom(
        metamaskAddress,
        me.walletAddress,
        tokens[0].id
      );

      return tx.hash;
    } catch (err) {
      Sentry.captureException(err);
      return Promise.reject(err);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        isWeb3Ready: true,
        web3Error: null,
        walletAPI: {
          handleWithdraw,
          handleDeposit,
          getWalletBalanceSPN,
          getWalletTokens,
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
