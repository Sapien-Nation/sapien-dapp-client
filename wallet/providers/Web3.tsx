import { Biconomy } from '@biconomy/mexa';
import * as Sentry from '@sentry/nextjs';
import _range from 'lodash/range';
import { BN } from 'ethereumjs-util';
import * as sigUtil from 'eth-sig-util';
import { createContext, useContext, useRef, useEffect, useState } from 'react';

// contracts
import { default as PassportContractAbi } from '../contracts/Passport.json';
import { default as PlatformContractAbi } from '../contracts/Platform.json';

// api
import { getGasPrice, getTokenMetadata, connectWallet } from '../api';

// hooks
import { useAuth } from 'context/user';
import { hooks as metaMaskHooks } from '../connectors/metaMask';

// types
import type { Token } from '../types';
import type { AbiItem } from 'web3-utils';

// web3
import Web3Library from 'web3';

//----------------------------------------------------------------------------------------------------------------------------------------------------
interface Web3 {
  isReady: boolean;
  walletAPI: {
    handleWithdraw: (toAddress: string, tokenId: number) => Promise<string>;
    handleDeposit: () => Promise<string>;
    getWalletBalanceSPN: (address: string) => Promise<number>;
    getPassportBalance: (address: string) => Promise<number>;
    getWalletTokens: (address: string) => Promise<Array<Token>>;
  } | null;
  error: any | null;
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
  isReady: false,
  walletAPI: null,
  error: null,
});

const debugWeb3 = false;
const walletIsMainnet = process.env.NEXT_PUBLIC_WALLET_IS_MAINNET;
const walletBiconomyApiKey = process.env.NEXT_PUBLIC_WALLET_BICONOMY_API_KEY;

const { useAccounts, useProvider } = metaMaskHooks;

const Web3Provider = ({ children }: Web3ProviderProps) => {
  const { me } = useAuth();
  const [error, setError] = useState<Error | null>(null);
  const [contracts, setContracts] = useState<null | Record<string, any>>(null);
  const [biconomy, setBiconomy] = useState<any>(null);
  const WalletAPIRef = useRef(null);

  const account = useAccounts();
  const getMetamaskAddress = () => account[0];

  //----------------------------------------------------------------------------------------------------------------------------
  const config: WalletConfig = (() => {
    if (walletIsMainnet === 'true') {
      return {
        MAINNET_NETWORK_ID: 1,
        POLY_NETWORK_ID: 137,
        RPC_PROVIDER: 'https://polygon-rpc.com/',
        SPN_TOKEN_ADDRESS: '0x3Cd92Be3Be24daf6D03c46863f868F82D74905bA', // Mainnet SPN
        BADGE_STORE_ADDRESS: '0x2ee22E2fFBd1f2450A6879D34172341da31726be',
        PASSPORT_CONTRACT_ADDRESS: '0xf0b3c046101689bc2d81da72f492a8d2dad3b238', // TODO set when deployed
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

  useEffect(() => {
    const initWeb3WithBiconomy = async () => {
      try {
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

          Sentry.captureException(error);
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
    to: string,
    tokenId: number
  ): Promise<string> => {
    try {
      const tokenAddress = await contracts.passportContract.methods
        .ownerOf(tokenId)
        .call();

      if (tokenAddress === me.walletAddress) {
        const { privKey } = await connectWallet();
        const from = me.walletAddress;

        const gasPrice = await getGasPrice(config.GAS_STATION_URL);

        const signedTx =
          await WalletAPIRef.current.eth.accounts.signTransaction(
            {
              from,
              gasPrice: Web3Library.utils
                .toWei(new BN(gasPrice), 'gwei')
                .toNumber(),
              gasLimit: config.GAS_LIMIT,
              to: config.PASSPORT_CONTRACT_ADDRESS,
              value: '0x0',
              data: contracts.passportContract.methods
                .safeTransferFrom(from, to, tokenId)
                .encodeABI(),
            },
            `0x${privKey}`
          );
        const forwardData = await biconomy.getForwardRequestAndMessageToSign(
          signedTx.rawTransaction
        );

        const signature = sigUtil.signTypedMessage(
          Buffer.from(privKey, 'hex'),
          { data: forwardData.eip712Format },
          'V4'
        );

        // Get the transaction Hash using the Event Emitter returned
        const tx = await WalletAPIRef.current.eth.sendSignedTransaction({
          signature: signature,
          forwardRequest: forwardData.request,
          rawTransaction: signedTx.rawTransaction,
          signatureType: biconomy.EIP712_SIGN,
        });

        return tx.transactionHash;
      }
      return Promise.reject('"Token does not belong to this wallet."');
    } catch (err) {
      Sentry.captureException(err);
      return Promise.reject(err.message);
    }
  };

  const handleDeposit = async (): Promise<string> => {
    try {
      const metamaskAddress = getMetamaskAddress();
      const tokens = await getWalletTokens(metamaskAddress);

      const gasPrice = await getGasPrice(config.GAS_STATION_URL);

      const tx = await contracts.passportContract.methods
        .safeTransferFrom(metamaskAddress, me.walletAddress, tokens[0].id)
        .send({
          from: metamaskAddress,
          signatureType: biconomy.EIP712_SIGN,
          gasPrice: Web3Library.utils
            .toWei(new BN(gasPrice), 'gwei')
            .toNumber(),
          gasLimit: config.GAS_LIMIT,
        });

      return tx.transactionHash;
    } catch (err) {
      Sentry.captureException(err);
      return Promise.reject(err);
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
