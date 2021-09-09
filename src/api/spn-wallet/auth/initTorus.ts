import torusWebSdk from '@toruslabs/torus-direct-web-sdk';
import { env, Envs, walletIsMainnet } from 'api';

enum Network {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

const getNetwork = () => {
  switch (env) {
    case Envs.Sandbox:
    case Envs.Local:
      return Network.Testnet;
      break;
    default:
      return walletIsMainnet === 'true' ? Network.Mainnet : Network.Testnet;
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
