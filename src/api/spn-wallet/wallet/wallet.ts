import Web3 from 'web3';
import { AbiItem, isAddress } from 'web3-utils';
import { Biconomy } from '@biconomy/mexa';
import sigUtil from 'eth-sig-util';
import Common, { CustomChain } from '@ethereumjs/common';
import { Transaction as Tx } from '@ethereumjs/tx';
import PLATFORM_SPN_ABI from './contracts/SapienPlatformSPN.json';
import BADGE_STORE_ABI from './contracts/BadgeStore.json';
import { purchaseBadge, sendSPN } from 'api/wallet';
import getConfig from './config';

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

const Wallet = async (publicAddress: string, privateKey: string) => {
  const config = getConfig(false);

  let provider;

  const getProvider = () => {
    if (!provider || !provider.connected) {
      provider = new Web3.providers.WebsocketProvider(config.POLY_WS_PROVIDER);
      provider.on('connect', () => console.log('Polygon WS Connected!'));
      provider.on('error', () => {
        console.error('Polygon WS Error');
      });
      provider.on('end', () => {
        console.error('Polygon WS End');
        web3.setProvider(getProvider());
      });
    }
    return provider;
  };

  const biconomy = new Biconomy(getProvider(), {
    apiKey: config.BICONOMY_API_KEY,
    debug: true,
  });
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
    badgeStoreContract: new web3.eth.Contract(
      BADGE_STORE_ABI as AbiItem[],
      config.POLY_BADGE_STORE_ADDRESS
    ),
    badgeStoreDomainData: {
      name: 'Sapien Badge Store',
      version: 'v3',
      verifyingContract: config.POLY_BADGE_STORE_ADDRESS,
      salt: '0x' + config.POLY_NETWORK_ID.toString(16).padStart(64, '0'),
    },
    platformSPNContract: new web3.eth.Contract(
      PLATFORM_SPN_ABI as AbiItem[],
      config.POLY_SPN_TOKEN_ADDRESS
    ),
    platformSPNDomainData: {
      name: 'Sapien',
      version: '1',
      verifyingContract: config.POLY_SPN_TOKEN_ADDRESS,
      salt: '0x' + config.POLY_NETWORK_ID.toString(16).padStart(64, '0'),
    },
  };

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
  async function prepareMetaTransaction(
    functionSignature,
    contract,
    contractAddress,
    domainData
  ) {
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

    // Build the transaction
    const txObject = {
      nonce: web3.utils.toHex(nonce),
      to: contractAddress,
      data: executeMetaTransactionData,
    };

    const common = Common.custom(CustomChain.PolygonMumbai);

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
    getBalance,
    transferSPN: async (
      fromUserId: string,
      toUserId: string,
      toAddress: string,
      spnAmount: number
    ) => {
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

      const rawTx = await prepareMetaTransaction(
        functionSignature,
        contracts.platformSPNContract,
        config.POLY_SPN_TOKEN_ADDRESS,
        contracts.platformSPNDomainData
      );

      const body = {
        fromUserId,
        toUserId,
        spnAmount,
        rawTx,
      };

      return sendSPN(body);
    },
    purchaseBadge: async (
      amount: number, // number of badges the user selected to be purchased
      blockchainId: number, // id of the badge on the blockchain
      ownerId, // user id of the buyer
      parentBadgeId, // id of the badge on Sapien
      totalPrice: number // price of the badge x amount
    ) => {
      console.log('parentBadgeId', parentBadgeId);
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

      const rawTx = await prepareMetaTransaction(
        functionSignature,
        contracts.badgeStoreContract,
        config.POLY_BADGE_STORE_ADDRESS,
        contracts.badgeStoreDomainData
      );
      const body = {
        rawTx,
        parentBadgeId,
        ownerId,
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
