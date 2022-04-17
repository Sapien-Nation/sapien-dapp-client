import { Biconomy } from '@biconomy/mexa';
import Common, { CustomChain } from '@ethereumjs/common';
import { Transaction as Tx } from '@ethereumjs/tx';
import * as Sentry from '@sentry/nextjs';
import { BN } from 'ethereumjs-util';
import sigUtil from 'eth-sig-util';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Web3Library from 'web3';
import { isAddress } from 'web3-utils';

// api
import { connectWallet, getGasPrise, getTokenData } from 'wallet/api';

// contracts
import { default as PlatformContract } from '../contracts/Platform.json';
import { default as PassportContract } from '../contracts/Passport.json';

// hooks
import { useAuth } from 'context/user';
import { useTorus } from './Torus';

// types
import type { AbiItem } from 'web3-utils';
import type { MetaTxParams, Token, TXDetails, WTXDetails } from '../types';

//----------------------------------------------------------------------------------------------------------------------------------------------------
interface Web3 {
  isWeb3Ready: boolean;
  walletAPI: {
    handleWithdraw: (toAddress: string) => Promise<WTXDetails>;
    handleDeposit: (metamaskAddress: string) => Promise<TXDetails>;
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

const domainType = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'verifyingContract', type: 'address' },
  { name: 'salt', type: 'bytes32' },
];
const metaTransactionType = [
  { name: 'nonce', type: 'uint256' },
  { name: 'from', type: 'address' },
  { name: 'functionSignature', type: 'bytes' },
];

const debugWeb3 = true;
const walletIsMainnet = process.env.NEXT_PUBLIC_WALLET_IS_MAINNET;
const walletBiconomyApiKey = process.env.NEXT_PUBLIC_WALLET_BICONOMY_API_KEY;

const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [error, setError] = useState<Error | null>(null);
  const [contracts, setContracts] = useState<null | Record<string, any>>(null);

  const { me } = useAuth();
  const { isReady, torusKeys } = useTorus();

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
      RPC_PROVIDER: 'https://rpc-mumbai.matic.today/',
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

    if (isReady === true) {
      initWeb3WithBiconomy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [torusKeys]);

  //----------------------------------------------------------------------------------------------------------------------------
  // API
  const getSignatureParameters = (signature) => {
    if (!WalletAPIRef.current.utils.isHexStrict(signature)) {
      throw new Error(
        'Given value "'.concat(signature, '" is not a valid hex string.')
      );
    }

    const r = signature.slice(0, 66);
    const s = '0x'.concat(signature.slice(66, 130));
    const v = '0x'.concat(signature.slice(130, 132));

    let vNum: number = WalletAPIRef.current.utils.hexToNumber(v);
    if (![27, 28].includes(vNum)) vNum += 27;

    return {
      r: r,
      s: s,
      v: vNum,
    };
  };

  const prepareMetaTransaction = async ({
    functionSignature,
    contract,
    contractAddress,
    domainData,
  }: MetaTxParams) => {
    const nonce = await contract.methods.getNonce(me.walletAddress).call();

    const message = {
      nonce: WalletAPIRef.current.utils.toHex(nonce),
      from: me.walletAddress,
      functionSignature: functionSignature,
    };

    const dataToSign = {
      types: {
        EIP712Domain: domainType,
        MetaTransaction: metaTransactionType,
      },
      domain: domainData,
      primaryType: 'MetaTransaction',
      message: message,
    };

    // Get torus private key
    const data = await connectWallet();

    const signature = sigUtil.signTypedData_v4(Buffer.from(data, 'hex'), {
      // @ts-ignore
      data: dataToSign,
    });
    const { r, s, v } = getSignatureParameters(signature); // same helper used in SDK frontend code
    const executeMetaTransactionData = contract.methods
      .executeMetaTransaction(me.walletAddress, functionSignature, r, s, v)
      .encodeABI();

    const gasPriceData = await getGasPrise();

    // Build the transaction
    const txObject = {
      nonce: WalletAPIRef.current.utils.toHex(nonce),
      to: contractAddress,
      gasPrice: WalletAPIRef.current.utils
        .toWei(new BN(gasPriceData.fast), 'gwei')
        .toNumber(),
      gasLimit: 300000,
      data: executeMetaTransactionData,
    };

    const common = Common.custom(
      walletIsMainnet ? CustomChain.PolygonMainnet : CustomChain.PolygonMumbai
    );

    const tx = Tx.fromTxData(txObject, { common });
    const signedTx = tx.sign(Buffer.from(data, 'hex'));
    const serializedTx = signedTx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    return raw;
  };

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

  const handleWithdraw = async (toAddress: string): Promise<WTXDetails> => {
    try {
      return { id: '1000' };
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  const handleDeposit = async (metamaskAddress: string): Promise<TXDetails> => {
    try {
      // const functionSignature = contracts.passportContract.methods
      //   .transfer(metamaskAddress)
      //   .encodeABI();

      // const rawTx: MetaTxParams = await prepareMetaTransaction({
      //   functionSignature: functionSignature,
      //   contract: contracts.platformSPNContract,
      //   contractAddress: config.SPN_TOKEN_ADDRESS,
      //   domainData: contracts.platformSPNDomainData,
      // });

      // TODO API Call??
      return { id: '1000' };
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        isWeb3Ready: WalletAPIRef.current !== null,
        web3Error: error,
        walletAPI: {
          handleWithdraw,
          handleDeposit,
          getWalletTokens,
          getWalletBalance,
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
