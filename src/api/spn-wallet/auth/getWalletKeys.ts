import initTorus from './initTorus';

// api
import { walletVerifier, walletSubVerifier, env, walletIsMainnet } from 'api';

const getWalletKeys = async (
  torusToken: string,
  userId: string,
  verifier = walletVerifier,
  subVerifier = walletSubVerifier
) => {
  try {
    const torus = await initTorus(
      `${window.location.origin}/api/serviceworker`,
      false,
      walletIsMainnet
    );
    if (env === 'SANDBOX') {
      return torus.getAggregateTorusKey(verifier, userId, [
        { verifier: subVerifier, idToken: torusToken },
      ]);
    } else {
      return torus.getTorusKey(
        verifier,
        userId,
        { verifier_id: userId },
        torusToken
      );
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default getWalletKeys;
