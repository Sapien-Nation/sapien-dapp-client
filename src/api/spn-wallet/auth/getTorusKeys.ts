// types
import type TorusWebSdk from '@toruslabs/torus-direct-web-sdk/types/src/login';

const getTorusKeys = (
  torus: TorusWebSdk,
  torusToken: string,
  userId: string,
  subVerifier = 'sapien-jwt',
  verifier = 'sandbox-sapien'
) => {
  return torus.getAggregateTorusKey(verifier, userId, [
    { verifier: subVerifier, idToken: torusToken },
  ]);
};

export default getTorusKeys;
