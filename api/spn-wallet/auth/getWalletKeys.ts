import initTorus from './initTorus';

// api
import { walletVerifier, walletSubVerifier, env, Envs } from 'api';

const getWalletKeys = async (
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

    switch (env) {
      case Envs.Sandbox:
      case Envs.Local:
        // TODO: replace with getTorusKey method on sandbox
        return torus.getAggregateTorusKey(verifier, userId, [
          { verifier: subVerifier, idToken: torusToken },
        ]);
        break;
      default:
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