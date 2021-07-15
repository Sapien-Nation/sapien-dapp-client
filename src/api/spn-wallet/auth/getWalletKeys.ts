import initTorus from './initTorus';

const getWalletKeys = async (
  torusToken: string,
  userId: string,
  subVerifier = 'sapien-jwt',
  verifier = 'sandbox-sapien'
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
