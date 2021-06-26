import torusWebSdk from '@toruslabs/torus-direct-web-sdk';

const initTorus = async (baseUrl: string, enableLogging = false) => {
  try {
    const torus = new torusWebSdk({
      baseUrl,
      enableLogging,
      network: 'testnet',
    });
    await torus.init({ skipSw: true });
    return torus;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default initTorus;
