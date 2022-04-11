import Common, { CustomChain } from '@ethereumjs/common';
import { Transaction as Tx } from '@ethereumjs/tx';
import * as Sentry from '@sentry/nextjs';
import { BN } from 'ethereumjs-util';
import sigUtil from 'eth-sig-util';
import { createContext, useContext } from 'react';
import { isAddress } from 'web3-utils';

// api
import axios from 'api';
import { sendSPN } from '../api';

// context
import { useWeb3Librariers } from './librariers';

// types
import type { MetaTxParams } from '../types';

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export interface Web3 {
  getBalance: () => Promise<string>;
  getSignatureParameters: (
    signature: string
  ) => Promise<never> | { r: string; s: string; v: number };
  transferSPN: ({
    amount,
    contentId,
    fromUserId,
    toAddress,
    toUserId,
  }: {
    amount: number;
    contentId: string;
    fromUserId: string;
    toAddress: string;
    toUserId: string;
  }) => Promise<any>;
  prepareMetaTransaction: ({
    functionSignature,
    contract,
    contractAddress,
    domainData,
  }: MetaTxParams) => Promise<string>;
}

export const Web3Context = createContext<Web3>(null);

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
interface Props {
  children: React.ReactNode;
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const Web3Provider = ({ children }: Props) => {
  const { contracts, config, torusKey, web3 } = useWeb3Librariers();
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const walletIsMainnet = process.env.NEXT_PUBLIC_WALLET_IS_MAINNET;
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <Web3Context.Provider
      value={{
        getBalance: async function () {
          if (this.isWeb3APIReaddy === true) {
            try {
              const { publicAddress } = torusKey;
              const balance = contracts.platformSPNContract.methods
                .balanceOf(publicAddress)
                .call();

              return balance;
            } catch (err) {
              Sentry.captureException('[getBalance] Error', err);
              return Promise.reject('API Not Ready');
            }
          } else {
            return Promise.reject('API Not Ready');
          }
        },
        getSignatureParameters: function (signature) {
          if (this.isWeb3APIReaddy === true) {
            if (!web3.utils.isHexStrict(signature)) {
              return Promise.reject(
                'Given value "'.concat(
                  signature,
                  '" is not a valid hex string.'
                )
              );
            }

            let vNum: number = web3.utils.hexToNumber(
              '0x'.concat(signature.slice(130, 132))
            );

            if (![27, 28].includes(vNum)) vNum += 27;

            return {
              r: signature.slice(0, 66),
              s: '0x'.concat(signature.slice(66, 130)),
              v: vNum,
            };
          } else {
            return Promise.reject('API Not Ready');
          }
        },
        transferSPN: async function ({
          amount,
          contentId,
          fromUserId,
          toAddress,
          toUserId,
        }: {
          amount: number;
          contentId: string;
          fromUserId: string;
          toAddress: string;
          toUserId: string;
        }) {
          if (this.isWeb3APIReaddy === true) {
            try {
              if (isAddress(toAddress)) {
                if (amount > 0) {
                  const balanceSPN = await this.getBalance();
                  if (amount < balanceSPN) {
                    const functionSignature =
                      contracts.platformSPNContract.methods
                        .transfer(toAddress, amount)
                        .encodeABI();

                    const rawTx = await this.prepareMetaTransaction({
                      functionSignature: functionSignature,
                      contract: contracts.platformSPNContract,
                      contractAddress: config.SPN_TOKEN_ADDRESS,
                      domainData: contracts.platformSPNDomainData,
                    } as MetaTxParams);

                    const data = await sendSPN({
                      fromUserId,
                      toUserId,
                      spnAmount: amount,
                      contentId,
                      rawTx,
                    });

                    return data;
                  } else {
                    return Promise.reject(
                      'Platform SPN balance is less than required'
                    );
                  }
                } else {
                  return Promise.reject('SPN amount should be positive');
                }
              } else {
                return Promise.reject('Address should be valid');
              }
            } catch (err) {
              Sentry.captureException('[transferSPN] Error', err);
              return Promise.reject(err);
            }
          } else {
            return Promise.reject('API Not Ready');
          }
        },
        prepareMetaTransaction: async function ({
          functionSignature,
          contract,
          contractAddress,
          domainData,
        }: MetaTxParams) {
          const { publicAddress, privateKey } = torusKey;

          const nonce = await contract.methods.getNonce(publicAddress).call();

          const message = {
            nonce: web3.utils.toHex(nonce),
            from: publicAddress,
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

          const signature = sigUtil.signTypedData_v4(
            Buffer.from(privateKey, 'hex'),
            {
              // @ts-ignore
              data: dataToSign,
            }
          );
          const { r, s, v } = this.getSignatureParameters(signature);
          const executeMetaTransactionData = contract.methods
            .executeMetaTransaction(publicAddress, functionSignature, r, s, v)
            .encodeABI();

          const gasPrice = await axios
            .get('https://gasstation-mainnet.matic.network')
            .then((response) => response.data?.fast)
            .catch(() => 50); // default

          const common = Common.custom(
            walletIsMainnet
              ? CustomChain.PolygonMainnet
              : CustomChain.PolygonMumbai
          );

          const tx = Tx.fromTxData(
            {
              nonce: web3.utils.toHex(nonce),
              to: contractAddress,
              gasPrice: web3.utils.toWei(new BN(gasPrice), 'gwei').toNumber(),
              gasLimit: 300000,
              data: executeMetaTransactionData,
            },
            { common }
          );
          const signedTx = tx.sign(Buffer.from(privateKey, 'hex'));
          const serializedTx = signedTx.serialize();
          const raw = '0x' + serializedTx.toString('hex');

          return raw;
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

export { useWeb3, Web3Provider };
