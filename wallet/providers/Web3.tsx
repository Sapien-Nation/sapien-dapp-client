import { Biconomy } from '@biconomy/mexa';
import * as Sentry from '@sentry/nextjs';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Web3Library from 'web3';

// contracts
import { default as BadgeContract } from '../contracts/Badge.json';
import { default as PassportContract } from '../contracts/Passport.json';
import { default as PlatformContract } from '../contracts/Platform.json';

// hooks
import { useTorus } from './Torus';

// types
import type { AbiItem } from 'web3-utils';

interface Web3 {
  isWeb3Ready: boolean;
  walletAPI: { handleGetTorusBalance: () => Promise<number> } | null;
  torusError: Error | any;
  isTorusReady: boolean;
  web3Error: Error | null;
}

const Web3Context = createContext<Web3>({
  isWeb3Ready: false,
  walletAPI: null,
  torusError: null,
  isTorusReady: false,
  web3Error: null,
});

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

const debugWeb3 = false;
const walletIsMainnet = process.env.NEXT_PUBLIC_WALLET_IS_MAINNET;
const walletBiconomyApiKey = process.env.NEXT_PUBLIC_WALLET_BICONOMY_API_KEY;

const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [error, setError] = useState<Error | null>(null);
  const [contracts, setContracts] = useState<null | Record<string, any>>(null);

  const WalletAPIRef = useRef(null);
  const { error: torusError, torusKeys, isReady: isTorusReady } = useTorus();

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
              BadgeContract as Array<AbiItem>,
              config.PASSPORT_ADDRESS
            ),
            badgeStoreContract: new Web3Eth.eth.Contract(
              PassportContract as Array<AbiItem>,
              config.BADGE_STORE_ADDRESS
            ),
            badgeStoreDomainData: {
              name: 'Sapien Badge Store',
              version: 'v3',
              verifyingContract: config.BADGE_STORE_ADDRESS,
              salt: `0x${config.POLY_NETWORK_ID.toString(16).padStart(
                64,
                '0'
              )}`,
            },
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

    if (isTorusReady === true) {
      if (debugWeb3) {
        console.log('Torus Initializng Biconomy');
      }
      initWeb3WithBiconomy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTorusReady]);

  // API
  const handleGetTorusBalance = async () => {
    try {
      const { publicAddress } = torusKeys;
      const balance = await contracts.platformSPNContract.methods
        .balanceOf(publicAddress)
        .call();

      return Number(balance);
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        isWeb3Ready: WalletAPIRef.current !== null,
        web3Error: error,
        walletAPI: { handleGetTorusBalance },
        torusError,
        isTorusReady,
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
