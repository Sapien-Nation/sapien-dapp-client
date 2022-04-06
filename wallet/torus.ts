import torusWebSdk from '@toruslabs/torus-direct-web-sdk';

// constants
import {
  walletVerifier,
  walletSubVerifier,
  walletIsMainnet,
} from './constants';

// types
import type TorusWebSdk from '@toruslabs/torus-direct-web-sdk/dist/types/login';

enum Network {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

const getNetwork = () => {
  return walletIsMainnet === 'true' ? Network.Mainnet : Network.Testnet;
};

export const getTorusKeys = (
  torus: TorusWebSdk,
  torusToken: string,
  userId: string,
  subVerifier = walletSubVerifier,
  verifier = walletVerifier
) => {
  return torus.getAggregateTorusKey(verifier, userId, [
    { verifier: subVerifier, idToken: torusToken },
  ]);
};

export const getWalletKeys = async (
  torusToken: string,
  userId: string,
  verifier = walletVerifier,
  subVerifier = walletSubVerifier
) => {
  try {
    const torus = await initTorus(
      `${window.location.origin}/api/serviceworker`,
      false
    );

    return torus.getAggregateTorusKey(verifier, userId, [
      { verifier: subVerifier, idToken: torusToken },
    ]);
  } catch (error) {
    return Promise.reject(error);
  }
};
const initTorus = async (baseUrl: string, enableLogging = false) => {
  try {
    const torus = new torusWebSdk({
      baseUrl,
      enableLogging,
      network: getNetwork(), // torus verifier on sandbox and local should run on testnet
    });
    await torus.init({ skipSw: true });
    return torus;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default initTorus;
