import * as Sentry from '@sentry/nextjs';
import { createContext, useContext, useState } from 'react';

// api
import { getTokenData } from 'wallet/api';

// contracts
import { default as PassportContractAbi } from '../contracts/Passport.json';
import { default as PlatformContractAbi } from '../contracts/Platform.json';
import { Contract } from '@ethersproject/contracts';

// hooks
import { useAuth } from 'context/user';
import { hooks as metaMaskHooks } from '../connectors/metaMask';

// types
import type { Passport, TXDetails, WTXDetails } from '../types';
import type { AbiItem } from 'web3-utils';
import { Web3Provider as Web3ProviderType } from '@ethersproject/providers';

// web3
import Web3Library from 'web3';

//----------------------------------------------------------------------------------------------------------------------------------------------------
interface Web3 {
  isWeb3Ready: boolean;
  walletAPI: {
    handleWithdraw: (toAddress: string, tokenId: number) => Promise<WTXDetails>;
    handleDeposit: () => Promise<TXDetails>;
    getWalletBalanceSPN: () => Promise<number>;
    getPassportBalance: () => Promise<number>;
    getWalletTokens: () => Promise<Array<Passport>>;
  } | null;
  web3Error: Error | null;
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
  const [error, setError] = useState<null | Error>(null);

  const { me } = useAuth();
  const account = useAccounts();
  const metamaskProvider = useProvider();
  //----------------------------------------------------------------------------------------------------------------------------
  const getMetamaskAddress = () => account[0];
  const config: WalletConfig = (() => {
    if (walletIsMainnet === 'true') {
      return {
        MAINNET_NETWORK_ID: 1,
        POLY_NETWORK_ID: 137,
        RPC_PROVIDER: 'https://polygon-rpc.com/',
        SPN_TOKEN_ADDRESS: '0x3Cd92Be3Be24daf6D03c46863f868F82D74905bA', // Mainnet SPN
        BADGE_STORE_ADDRESS: '0x2ee22E2fFBd1f2450A6879D34172341da31726be',
        PASSPORT_CONTRACT_ADDRESS: '0x6B0fB07235C94fC922d8E141133280f5BBeBE3C3', // TODO set when deployed
        BICONOMY_API_KEY: walletBiconomyApiKey,
        EXPLORER_BASE_URL: 'https://polygonscan.com/tx/',
        GAS_STATION_URL: 'https://gasstation-mainnet.matic.network/v2',
        GAS_LIMIT: 30000,
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
      GAS_STATION_URL: 'https://gasstation-mumbai.matic.today/v2',
      GAS_LIMIT: 30000,
    };
  })();

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
      setError(err);
    }
  };

  const getPassportBalance = async () => {
    try {
      const passportBalance = await contracts.passportContract.methods
        .balanceOf(getMetamaskAddress())
        .call();

      return Number(passportBalance);
    } catch (err) {
      Sentry.captureException(err);
      setError(err);
    }
  };

  const getWalletTokens = async (): Promise<Array<Passport>> => {
    try {
      const metamaskAddress = getMetamaskAddress();
      const balance = await getPassportBalance();
      const tokens = [];
      if (balance === 0) {
        return [];
      }

      const baseURI = await contracts.passportContract.methods
        .baseTokenURI()
        .call();

      for (let i = 0; i < balance; i += 1) {
        try {
          const tokenID = await contracts.passportContract.methods
            .tokenOfOwnerByIndex(metamaskAddress, i)
            .call();
          const { data } = await getTokenData(`${baseURI}${tokenID}`);
          tokens.push(data);
        } catch (err: any) {
          Sentry.captureException(
            `Axios error - ${err?.response?.status} - ${err?.response?.statusText}`
          );
        }
      }

      return tokens;
    } catch (err) {
      Sentry.captureException(err);
      setError(err);
    }
  };

  const handleWithdraw = async (
    toAddress: string,
    tokenId: number
  ): Promise<WTXDetails> => {
    try {
      // TODO Torus Provider
      // @see wallet/providers/Torus.tsx
      // if something is missing we should simply do const { provider } = useTorus(); here
      const signer = await metamaskProvider.getSigner();

      const contract = await new Contract(
        config.PASSPORT_CONTRACT_ADDRESS,
        PassportContractAbi,
        signer
      );

      const tx = await contract.transferFrom(
        me.walletAddress,
        toAddress,
        tokenId
      );

      return tx;
    } catch (err) {
      Sentry.captureException(err);
      setError(err);
    }
  };

  const handleDeposit = async (): Promise<TXDetails> => {
    try {
      const metamaskAddress = getMetamaskAddress();
      const tokens = await getWalletTokens();

      const signer = await metamaskProvider.getSigner();

      const contract = await new Contract(
        config.PASSPORT_CONTRACT_ADDRESS,
        PassportContractAbi,
        signer
      );

      const tx = await contract.transferFrom(
        metamaskAddress,
        me.walletAddress,
        tokens[0].id // deposit first token by default
      );

      //TODO: get txHash
      return { id: '1000' };
    } catch (err) {
      Sentry.captureException(err);
      setError(err);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        isWeb3Ready: true,
        web3Error: error,
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
