// types
import type TorusWebSdk from '@toruslabs/torus-direct-web-sdk/dist/types/login';

// api
import { walletVerifier, walletSubVerifier } from 'api';

const getTorusKeys = (
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

export default getTorusKeys;
