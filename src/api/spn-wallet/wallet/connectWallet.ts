import getWalletKeys from '../auth/getWalletKeys';
import Wallet from './wallet';

const connectWallet = async (
  torusToken: string,
  userId: string,
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
    const wallet = await Wallet(publicAddress);
    return wallet;
  } catch (error) {
    console.error(error);
  }
};

export default connectWallet;
