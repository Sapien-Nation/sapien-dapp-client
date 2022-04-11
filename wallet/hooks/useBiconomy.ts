import { Biconomy } from '@biconomy/mexa';
import * as Sentry from '@sentry/nextjs';
import { useEffect, useRef, useState } from 'react';
import Web3ThirdParty from 'web3';

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

const useBiconomy = () => {
  const [mexaError, setMexaError] = useState<MexaError | null>(null);
  const [isLoadingMexa, setIsLoadingMexa] = useState(true);

  const web3API = useRef(null);
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const _DEBUG = true;
  const walletIsMainnet = process.env.NEXT_PUBLIC_WALLET_IS_MAINNET;
  const walletBiconomyApiKey = process.env.NEXT_PUBLIC_WALLET_BICONOMY_API_KEY;
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

  useEffect(() => {
    if (web3API.current === null) {
      const biconomy = new Biconomy(
        new Web3ThirdParty.providers.HttpProvider(config.RPC_PROVIDER),
        {
          apiKey: config.BICONOMY_API_KEY,
          debug: _DEBUG,
        }
      );
      biconomy
        .onEvent(biconomy.READY, async () => {
          if (_DEBUG) {
            console.log('Mexa is Ready');
          }

          web3API.current = new Web3ThirdParty(biconomy);
          setMexaError(null);
          setIsLoadingMexa(false);
        })
        .onEvent(biconomy.ERROR, (error, message) => {
          if (_DEBUG) {
            console.error('Error initializing Mexa', error, message);
          }
          Sentry.captureException('Biconomy error', message);

          setIsLoadingMexa(true);
          setMexaError({ error, message });
        });
    }
  }, [web3API.current]);

  return {
    isLoadingMexa,
    mexaError,
    web3API: web3API.current,
  };
};

export default useBiconomy;
