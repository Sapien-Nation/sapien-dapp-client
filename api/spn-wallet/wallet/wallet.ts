import Web3 from 'web3';
import { walletIsMainnet } from 'api';
import { AbiItem, isAddress } from 'web3-utils';
import { Biconomy } from '@biconomy/mexa';
import { BN } from 'ethereumjs-util';
import sigUtil from 'eth-sig-util';
import Common, { CustomChain } from '@ethereumjs/common';
import { Transaction as Tx } from '@ethereumjs/tx';
import PLATFORM_SPN_ABI from './contracts/SapienPlatformSPN.json';
import BADGE_STORE_ABI from './contracts/BadgeStore.json';
import PASSPORT_ABI from './contracts/Passport.json';
import { purchaseBadge, sendSPN, sendBadge } from 'api/wallet';
import getConfig from './config';
import axios from 'axios';

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

export interface PassportMetadata {
  name: string;
  description: string;
  image: string;
}

const Wallet = async (publicAddress: string, privateKey: string) => {
  const config = getConfig();

  const biconomy = new Biconomy(
    new Web3.providers.HttpProvider(config.RPC_PROVIDER),
    {
      apiKey: config.BICONOMY_API_KEY,
      debug: true,
    }
  );
  const web3 = new Web3(biconomy);

  biconomy
    .onEvent(biconomy.READY, async () => {
      // Initialize your dapp here like getting user accounts etc
      console.log('Mexa is Ready');
    })
    .onEvent(biconomy.ERROR, (error, message) => {
      // Handle error while initializing mexa
      console.error('Error initializing Mexa', error, message);
    });

  /* function isBiconomyReady() {
    return new Promise(function (resolve, reject) {
      const waitTime = 500; // milliseconds
      const timeout = waitTime * 20; // 10 seconds
      let counter = 0;
      (function waitForBiconomy() {
        if (counter === timeout) reject(new Error('Internal error'));
        if (biconomy.status === 'biconomy_ready') return resolve('');
        counter += waitTime;
        setTimeout(waitForBiconomy, 500);
      })();
    });
  } */

  const contracts = {
    passportContract: new web3.eth.Contract(
      PASSPORT_ABI as AbiItem[],
      config.PASSPORT_ADDRESS
    ),
    badgeStoreContract: new web3.eth.Contract(
      BADGE_STORE_ABI as AbiItem[],
      config.BADGE_STORE_ADDRESS
    ),
    badgeStoreDomainData: {
      name: 'Sapien Badge Store',
      version: 'v3',
      verifyingContract: config.BADGE_STORE_ADDRESS,
      salt: '0x' + config.POLY_NETWORK_ID.toString(16).padStart(64, '0'),
    },
    platformSPNContract: new web3.eth.Contract(
      PLATFORM_SPN_ABI as AbiItem[],
      config.SPN_TOKEN_ADDRESS
    ),
    platformSPNDomainData: {
      name: 'Sapien Network',
      version: '1',
      verifyingContract: config.SPN_TOKEN_ADDRESS,
      salt: '0x' + config.POLY_NETWORK_ID.toString(16).padStart(64, '0'),
    },
  };

  interface MetaTxParams {
    functionSignature: string;
    contract: any;
    contractAddress: string;
    domainData: any;
  }

  /**
   * Prepares the metatransaction method to be executed by
   * the current web3Provider
   *
   * @param {string} functionSignature Method to be called, ABI encoded.
   * @param {string} contract Contract that has the method.
   * @param {string} contractAddress Contract address.
   * @param {string} domainData Object with domain data to compose meta transaction.
   * @return {object} { method, args } Object with the method to execute metatransaction ant required arguments
   */
  async function prepareMetaTransaction(metaTxParams: MetaTxParams) {
    const { functionSignature, contract, contractAddress, domainData } =
      metaTxParams;

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

    //await isBiconomyReady();

    const signature = sigUtil.signTypedData_v4(Buffer.from(privateKey, 'hex'), {
      data: dataToSign,
    });
    const { r, s, v } = getSignatureParameters(web3, signature); // same helper used in SDK frontend code
    const executeMetaTransactionData = contract.methods
      .executeMetaTransaction(publicAddress, functionSignature, r, s, v)
      .encodeABI();

    const gasPrice = await axios
      .get('https://gasstation-mainnet.matic.network')
      .then((response) => response.data?.fast)
      .catch(() => 50); // default

    // Build the transaction
    const txObject = {
      nonce: web3.utils.toHex(nonce),
      to: contractAddress,
      gasPrice: web3.utils.toWei(new BN(gasPrice), 'gwei').toNumber(),
      gasLimit: 300000,
      data: executeMetaTransactionData,
    };

    const common = Common.custom(
      walletIsMainnet ? CustomChain.PolygonMainnet : CustomChain.PolygonMumbai
    );

    const tx = Tx.fromTxData(txObject, { common });
    const signedTx = tx.sign(Buffer.from(privateKey, 'hex'));
    const serializedTx = signedTx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    return raw;
  }

  async function getBalance() {
    return contracts.platformSPNContract.methods
      .balanceOf(publicAddress)
      .call();
  }

  return {
    getPassportData: async () => {
      const passports: PassportMetadata[] = [];

      const passportBalance = await contracts.passportContract.methods
        .balanceOf(publicAddress)
        .call();
      const baseURI = await contracts.passportContract.methods
        .baseTokenURI()
        .call();

      if (passportBalance > 0) {
        for (let i = 0; i < passportBalance; i += 1) {
          const tokenID = await contracts.passportContract.methods
            .tokenOfOwnerByIndex(isAddress, i)
            .call();
          try {
            const passportData = await axios.get(baseURI + tokenID);
            passports.push(passportData?.data);
          } catch (err: any) {
            console.error(
              `Axios error - ${err?.response?.status} - ${err?.response?.statusText}`
            );
          }
        }
      }
      return passports;
    },
    balance: await getBalance(),
    transferSPN: async (
      fromUserId: string,
      toUserId: string,
      toAddress: string,
      spnAmount: number,
      contentId?: string
    ) => {
      try {
        if (!isAddress(toAddress)) {
          return Promise.reject('Address should be valid');
        }
        if (spnAmount <= 0) {
          return Promise.reject('SPN amount should be positive');
        }

        const balanceSPN = await getBalance();
        if (spnAmount > balanceSPN) {
          return Promise.reject('Platform SPN balance is less than required');
        }
        const functionSignature = contracts.platformSPNContract.methods
          .transfer(toAddress, spnAmount)
          .encodeABI();

        const rawTx = await prepareMetaTransaction({
          functionSignature: functionSignature,
          contract: contracts.platformSPNContract,
          contractAddress: config.SPN_TOKEN_ADDRESS,
          domainData: contracts.platformSPNDomainData,
        } as MetaTxParams);

        const body = {
          fromUserId,
          toUserId,
          spnAmount,
          contentId,
          rawTx,
        };

        return sendSPN(body);
      } catch (err) {
        console.log('---------error', err);
      }
    },
    transferBadge: async (
      fromUserId: string,
      toUserId: string,
      toAddress: string,
      amount: number, // # of badges to be transferred
      badgeId: string, // badge id on Sapien platform
      badgeBlockchainId: number, // if on the blockchain
      userIsAdmin: boolean, // current user is admin of the badge?
      contentId?: string // if awarding content, this is its id
    ) => {
      if (!isAddress(toAddress)) {
        return Promise.reject('Address should be valid');
      }

      const badgeBalance = await contracts.badgeStoreContract.methods
        .balanceOf(publicAddress, badgeBlockchainId)
        .call();

      if (badgeBalance < amount) {
        return Promise.reject('Number of badges exceeds the balance');
      }

      let functionSignature;

      if (userIsAdmin) {
        // if user is admin of the badge (tribe admin), then grant it
        functionSignature = contracts.badgeStoreContract.methods
          .grantBadge(toAddress, badgeBlockchainId, amount)
          .encodeABI();
      } else {
        // if user is not the admin of the badge, transfer it
        functionSignature = contracts.badgeStoreContract.methods
          .safeTransferFrom(
            publicAddress,
            toAddress,
            badgeBlockchainId,
            amount,
            '0x00'
          )
          .encodeABI();
      }

      const rawTx = await prepareMetaTransaction({
        functionSignature: functionSignature,
        contract: contracts.badgeStoreContract,
        contractAddress: config.BADGE_STORE_ADDRESS,
        domainData: contracts.badgeStoreDomainData,
      } as MetaTxParams);

      const body = {
        fromUserId,
        toUserId,
        badgeId,
        badgeBlockchainId,
        amount,
        userIsAdmin,
        contentId,
        rawTx,
      };

      return sendBadge(body);
    },
    purchaseBadge: async (
      amount: number, // number of badges the user selected to be purchased
      blockchainId: number, // id of the badge on the blockchain
      ownerId, // user id of the buyer
      parentBadgeId, // id of the badge on Sapien
      totalPrice: number, // price of the badge x amount
      isJoiningTribe = false // regular purchase (default) / join tribe purchase
    ) => {
      if (!Number.isInteger(blockchainId)) {
        return Promise.reject('Badge Id not valid');
      }
      if (amount <= 0) {
        return Promise.reject('Amount should be positive');
      }

      const balanceSPN = await getBalance();
      if (totalPrice > balanceSPN) {
        return Promise.reject('Platform SPN balance is less than required');
      }
      const functionSignature = contracts.badgeStoreContract.methods
        .purchaseBadge(blockchainId, amount)
        .encodeABI();

      const rawTx = await prepareMetaTransaction({
        functionSignature: functionSignature,
        contract: contracts.badgeStoreContract,
        contractAddress: config.BADGE_STORE_ADDRESS,
        domainData: contracts.badgeStoreDomainData,
      } as MetaTxParams);
      const body = {
        rawTx,
        parentBadgeId,
        ownerId,
        totalPrice,
        isJoiningTribe,
      };

      return purchaseBadge(body);
    },
  };
};

const getSignatureParameters = (web3, signature) => {
  if (!web3.utils.isHexStrict(signature)) {
    throw new Error(
      'Given value "'.concat(signature, '" is not a valid hex string.')
    );
  }
  const r = signature.slice(0, 66);
  const s = '0x'.concat(signature.slice(66, 130));
  const v = '0x'.concat(signature.slice(130, 132));
  let vNum: number = web3.utils.hexToNumber(v);
  if (![27, 28].includes(vNum)) vNum += 27;
  return {
    r: r,
    s: s,
    v: vNum,
  };
};

export default Wallet;
