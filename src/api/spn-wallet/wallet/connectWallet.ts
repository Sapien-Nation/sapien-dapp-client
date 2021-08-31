import getWalletKeys from '../auth/getWalletKeys';
import Wallet from './wallet';

// api
import { addWallet } from 'api/authentication';
import { grantSapienBadge } from 'api/wallet';

const connectWallet = async (
  torusToken: string,
  userId: string,
  isSignup = false,
  subVerifier = 'sapien-jwt',
  verifier = 'sandbox-sapien'
) => {
  try {
    const { publicAddress, privateKey } = await getWalletKeys(
      torusToken,
      userId,
      subVerifier,
      verifier
    );
    if (isSignup) {
      await addWallet(publicAddress);
      await grantSapienBadge(userId);
      history?.replaceState(
        {},
        document?.title,
        window?.location.href.split('#')[0]
      );
    }
    const wallet = await Wallet(publicAddress, privateKey);
    return wallet;
  } catch (error) {
    return Promise.reject(`Wallet ${String(error).split(',')[0]}`);
  }
};

export default connectWallet;
