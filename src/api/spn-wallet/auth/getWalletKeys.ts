import initTorus from './initTorus';

// api
import { walletVerifier, walletSubVerifier } from 'api';

const getWalletKeys = async (
  torusToken: string,
  userId: string,
  subVerifier = walletSubVerifier,
  verifier = walletVerifier
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

export default getWalletKeys;
