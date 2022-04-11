// @ts-nocheck
import { Biconomy } from '@biconomy/mexa';
import DirectWebSdk from '@toruslabs/customauth';
import * as Sentry from '@sentry/nextjs';
import { createContext, useMemo, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import Web3ThirdParty from 'web3';

// api
import { refresh as refreshAPI } from 'api/authentication';

// contracts
import { default as BadgeContract } from '../contracts/Badge.json';
import { default as PassportContract } from '../contracts/Passport.json';
import { default as PlatformContract } from '../contracts/Platform.json';

// context
import { useAuth } from 'context/user';

// types
import type { TorusKey } from '@toruslabs/customauth';
import type { AbiItem } from 'web3-utils';

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
interface MexaError {
  error: unknown;
  message: string;
}

interface Config {
  MAINNET_NETWORK_ID: number;
  POLY_NETWORK_ID: number;
  RPC_PROVIDER: string;
  SPN_TOKEN_ADDRESS: string;
  BADGE_STORE_ADDRESS: string;
  PASSPORT_ADDRESS: string;
  BICONOMY_API_KEY: string;
  EXPLORER_BASE_URL: string;
}

export interface Librariers {
  config: Config;
  contracts: Record<string, any>;
  isLoadingMexa: boolean;
  isLoadingTorus: boolean;
  mexaError: MexaError | null;
  torusError: any | null;
  torusKey: TorusKey | null;
  web3: Web3ThirdParty;
}

export const Web3LibrariersContext = createContext<Librariers>(null);

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
interface Props {
  children: React.ReactNode;
}

const Web3Librariers = ({ children }: Props) => {
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [torusKey, setTorusKey] = useState<TorusKey | null>(null);
  const [mexaError, setMexaError] = useState<MexaError | null>(null);
  const [isLoadingMexa, setIsLoadingMexa] = useState(true);
  const [torusError, setTorusError] = useState<any | null>(null);
  const [isLoadingTorus, setIsLoadingTorus] = useState(false);
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const { me } = useAuth();
  const [tokens] = useLocalStorage<null | {
    token: string;
    torus: string;
    refresh: string;
  }>('tokens', null);

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const _DEBUG = process.env.NEXT_PUBLIC_WALLET_DEBUG;
  const walletVerifier = process.env.NEXT_PUBLIC_WALLET_VERIFIER;
  const walletIsMainnet = process.env.NEXT_PUBLIC_WALLET_IS_MAINNET;
  const walletSubVerifier = process.env.NEXT_PUBLIC_WALLET_SUB_VERIFIER;
  const walletBiconomyApiKey = process.env.NEXT_PUBLIC_WALLET_BICONOMY_API_KEY;

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const initializeTorusSDK = async () => {
      setIsLoadingTorus(true);

      const torusSDK = new DirectWebSdk({
        baseUrl: `${window.location.origin}/api/serviceworker`,
        enableLogging: Boolean(_DEBUG),
        network: walletIsMainnet === 'true' ? 'mainnet' : 'testnet',
      });
      try {
        await torusSDK.init({ skipSw: true });

        const _torusKey = await torusSDK.getAggregateTorusKey(
          walletVerifier,
          me!.id,
          [{ verifier: walletSubVerifier, idToken: tokens!.torus }]
        );

        setTorusError(null);
        setTorusKey(_torusKey);
      } catch (err) {
        try {
          const data = await refreshAPI(tokens!.refresh, 'torus');
          await torusSDK.init({ skipSw: true });

          const _torusKey = await torusSDK.getAggregateTorusKey(
            walletVerifier,
            me!.id,
            [{ verifier: walletSubVerifier, idToken: data.token }]
          );

          setTorusError(null);
          setTorusKey(_torusKey);
        } catch (err) {
          Sentry.captureException('Torus Init fail [Refresh]', err);
          setTorusError(err);
          setTorusKey(null);
        }
      }
      setIsLoadingTorus(false);
    };

    initializeTorusSDK();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const config: Config = (() => {
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
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const biconomy = useMemo(() => {
    return new Biconomy(
      new Web3ThirdParty.providers.HttpProvider(config.RPC_PROVIDER),
      {
        apiKey: config.BICONOMY_API_KEY,
        debug: _DEBUG,
      }
    );
  }, [_DEBUG, config.BICONOMY_API_KEY, config.RPC_PROVIDER]);
  const web3 = new Web3ThirdParty(biconomy);

  useEffect(() => {
    if (isLoadingTorus === false && torusError === null) {
      // Now lets make sure mexa is ready
      if (isLoadingMexa === true) {
        biconomy
          .onEvent(biconomy.READY, async () => {
            if (_DEBUG) {
              console.log('Mexa is Ready');
            }

            setMexaError(null);
            setIsLoadingMexa(false);
          })
          .onEvent(biconomy.ERROR, (error, message) => {
            if (_DEBUG) {
              console.error('Error initializing Mexa', error, message);
            }
            Sentry.captureException('[refresh] initWeb3API error', message);

            setIsLoadingMexa(false);
            setMexaError({ error, message });
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingTorus, isLoadingMexa, torusError]);

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const contracts = {
    passportContract: new web3.eth.Contract(
      BadgeContract as AbiItem[],
      config.PASSPORT_ADDRESS
    ),
    badgeStoreContract: new web3.eth.Contract(
      PassportContract as AbiItem[],
      config.BADGE_STORE_ADDRESS
    ),
    badgeStoreDomainData: {
      name: 'Sapien Badge Store',
      version: 'v3',
      verifyingContract: config.BADGE_STORE_ADDRESS,
      salt: '0x' + config.POLY_NETWORK_ID.toString(16).padStart(64, '0'),
    },
    platformSPNContract: new web3.eth.Contract(
      PlatformContract as AbiItem[],
      config.SPN_TOKEN_ADDRESS
    ),
    platformSPNDomainData: {
      name: 'Sapien Network',
      version: '1',
      verifyingContract: config.SPN_TOKEN_ADDRESS,
      salt: '0x' + config.POLY_NETWORK_ID.toString(16).padStart(64, '0'),
    },
  };
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <Web3LibrariersContext.Provider
      value={{
        config,
        contracts,
        torusKey,
        mexaError,
        isLoadingMexa,
        isLoadingTorus,
        torusError,
        web3,
      }}
    >
      {children}
    </Web3LibrariersContext.Provider>
  );
};

function useWeb3Librariers() {
  const context = useContext(Web3LibrariersContext);

  if (context === undefined) {
    throw new Error('useWeb3Librariers must be used within a Web3Librariers');
  }
  return context;
}

export { useWeb3Librariers, Web3Librariers };
