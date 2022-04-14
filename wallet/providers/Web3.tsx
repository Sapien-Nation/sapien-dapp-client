import { Biconomy } from '@biconomy/mexa';
import * as Sentry from '@sentry/nextjs';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Web3Library from 'web3';
import { isAddress } from 'web3-utils';

// api
import { getTokenData } from 'wallet/api';

// contracts
import { default as PlatformContract } from '../contracts/Platform.json';
import { default as PassportContract } from '../contracts/Passport.json';

// hooks
import { useAuth } from 'context/user';

// types
import type { AbiItem } from 'web3-utils';
import type { Token } from '../types';

//----------------------------------------------------------------------------------------------------------------------------------------------------
interface Web3 {
  isWeb3Ready: boolean;
  walletAPI: {
    getWalletBalance: () => Promise<number>;
    getWalletTokens: () => Promise<Array<Token>>;
  } | null;
  web3Error: Error | null;
}

interface WalletConfig {
  MAINNET_NETWORK_ID: number;
  POLY_NETWORK_ID: number;
  RPC_PROVIDER: string;
  SPN_TOKEN_ADDRESS: string;
  BADGE_STORE_ADDRESS: string;
  PASSPORT_ADDRESS: string;
  BICONOMY_API_KEY: string;
  EXPLORER_BASE_URL: string;
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

const debugWeb3 = false;
const walletIsMainnet = process.env.NEXT_PUBLIC_WALLET_IS_MAINNET;
const walletBiconomyApiKey = process.env.NEXT_PUBLIC_WALLET_BICONOMY_API_KEY;

const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [error, setError] = useState<Error | null>(null);
  const [contracts, setContracts] = useState<null | Record<string, any>>(null);

  const { me } = useAuth();
  const WalletAPIRef = useRef(null);

  const config: WalletConfig = (() => {
    if (walletIsMainnet === 'true') {
      return {
        MAINNET_NETWORK_ID: 1,
        POLY_NETWORK_ID: 137,
        RPC_PROVIDER: 'https://polygon-rpc.com/',
        SPN_TOKEN_ADDRESS: '0x3Cd92Be3Be24daf6D03c46863f868F82D74905bA', // Mainnet SPN
        BADGE_STORE_ADDRESS: '0x2ee22E2fFBd1f2450A6879D34172341da31726be',
        PASSPORT_ADDRESS: '0x6B0fB07235C94fC922d8E141133280f5BBeBE3C3', // TODO set when deployed
        BICONOMY_API_KEY: walletBiconomyApiKey,
        EXPLORER_BASE_URL: 'https://polygonscan.com/tx/',
      };
    }

    return {
      MAINNET_NETWORK_ID: 5,
      POLY_NETWORK_ID: 80001,
      RPC_PROVIDER: 'https://rpc-mumbai.matic.today',
      SPN_TOKEN_ADDRESS: '0x2d280CeF1B0Ab6E78a700824Ebe368C2E1B00BEd', // Mumbai SPN
      BADGE_STORE_ADDRESS: '0x59cD3d76cC9EA4f626629337664A3CbD78F48474',
      PASSPORT_ADDRESS: '0x6B0fB07235C94fC922d8E141133280f5BBeBE3C3',
      BICONOMY_API_KEY: walletBiconomyApiKey,
      EXPLORER_BASE_URL: 'https://mumbai.polygonscan.com/tx/',
    };
  })();

  useEffect(() => {
    const initWeb3WithBiconomy = async () => {
      try {
        const biconomy = new Biconomy(
          new Web3Library.providers.HttpProvider(config.RPC_PROVIDER),
          {
            apiKey: config.BICONOMY_API_KEY,
            debug: debugWeb3,
          }
        );

        biconomy.onEvent(biconomy.READY, async () => {
          if (debugWeb3) {
            console.log('@Biconomy/mexa ready, initializing Web3API');
          }

          const Web3Eth = new Web3Library(biconomy);
          setContracts({
            passportContract: new Web3Eth.eth.Contract(
              PassportContract as Array<AbiItem>,
              config.PASSPORT_ADDRESS
            ),
            platformSPNContract: new Web3Eth.eth.Contract(
              PlatformContract as AbiItem[],
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

          WalletAPIRef.current = Web3Eth;
        });

        biconomy.onEvent(biconomy.ERROR, (error, message) => {
          if (debugWeb3) {
            console.error('Error initializing @Biconomy/mexa', error, message);
          }

          Sentry.captureException(error);
          setError(error);
        });
      } catch (err) {
        setError(err);
      }
    };

    if (debugWeb3) {
      console.log('Initializng Biconomy');
    }
    initWeb3WithBiconomy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // API
  const getWalletBalance = async () => {
    try {
      const balance = await contracts.platformSPNContract.methods
        .balanceOf(me.walletAddress)
        .call();

      return Number(balance);
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  const getWalletTokens = async (): Promise<Array<Token>> => {
    try {
      const balance = await getWalletBalance();

      if (balance === 0) {
        return [];
      }

      const baseURI = await contracts.passportContract.methods
        .baseTokenURI()
        .call();

      const tokens = [];
      for (let i = 0; i < balance; i += 1) {
        const tokenID = await contracts.passportContract.methods
          .tokenOfOwnerByIndex(isAddress, i)
          .call();
        try {
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
    }
  };

  return (
    <Web3Context.Provider
      value={{
        isWeb3Ready: WalletAPIRef.current !== null,
        web3Error: error,
        walletAPI: { getWalletTokens, getWalletBalance },
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
