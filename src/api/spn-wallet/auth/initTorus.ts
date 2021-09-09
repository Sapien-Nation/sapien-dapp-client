import torusWebSdk from '@toruslabs/torus-direct-web-sdk';
import { env, Envs, walletIsMainnet } from 'api';

const initTorus = async (baseUrl: string, enableLogging = false) => {
  // torus verifier on sandbox and local should run on testnet
  const network = [Envs.Sandbox, Envs.Local].includes(env)
    ? 'testnet'
    : walletIsMainnet === 'true'
    ? 'mainnet'
    : 'testnet';

  try {
    const torus = new torusWebSdk({
      baseUrl,
      enableLogging,
      network,
    });
    await torus.init({ skipSw: true });
    return torus;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default initTorus;
