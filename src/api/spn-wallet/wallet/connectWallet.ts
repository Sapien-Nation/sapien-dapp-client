import getWalletKeys from '../auth/getWalletKeys';
import Wallet from './wallet';

// api
import { addWallet } from 'api/authentication';

const connectWallet = async (
  torusToken: string,
  userId: string,
  isSignup = false,
  subVerifier = 'sapien-jwt',
  verifier = 'sandbox-sapien'
) => {
  try {
    const { publicAddress } = await getWalletKeys(
      torusToken,
      userId,
      subVerifier,
      verifier
    );
    if (isSignup) {
      await addWallet(publicAddress);
      history?.replaceState(
        {},
        document?.title,
        window?.location.href.split('#')[0]
      );
    }
    const wallet = await Wallet(publicAddress);
    return wallet;
  } catch (error) {
    return Promise.reject(`Wallet ${String(error).split(',')[0]}`);
  }
};

export default connectWallet;
