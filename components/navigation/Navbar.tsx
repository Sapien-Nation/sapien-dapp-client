import { useState } from 'react';
import { tw } from 'twind';
import { ethers } from 'ethers';

// api
import { reservePassport } from 'api/passport';

//constants
import { ToastType } from 'constants/toast';

// components
import { Search } from 'components/common';

// context
import { useAuth } from 'context/user';
import { useToast } from 'context/toast';

// hooks
import { useWeb3React } from 'hooks/web3';

// connectors
import { injected } from 'connectors';

// utils
import { displayAddress } from 'utils/web3';

const Navbar = () => {
  const [isFetching, setIsFetching] = useState(false);

  const { me } = useAuth();
  const toast = useToast();
  const { deactivate, account, activate, active, chainId } = useWeb3React();

  const handleConnectWallet = () =>
    active ? deactivate() : activate(injected);

  const handleBuyPassport = async () => {
    if (
      process.env.NODE_ENV === 'development' &&
      chainId !== 3 &&
      chainId !== 4
    ) {
      toast({
        message: 'Switch Network to Ropsten or Rinkeby',
      });

      return;
    }

    if (process.env.NODE_ENV === 'production' && chainId !== 1) {
      toast({
        message: 'Switch Network to MainNet',
      });

      return;
    }

    setIsFetching(true);
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();

    try {
      const tx = await signer.sendTransaction({
        to: process.env.NEXT_PUBLIC_SAPIEN_WALLET_ADDRESS,
        value: ethers.utils.parseEther('0.25'),
      });
      const receipt = await tx.wait();

      if (receipt.transactionHash && receipt.status) {
        const body = {
          passportId: '',
          partyId: me.id,
          created: new Date().toISOString(),
          amount: 0.25,
          units: 'ETHER',
          type: 'METAMASK',
          address: account,
          status: '',
        };

        await reservePassport(body);

        toast({
          message: 'Operation successful',
          type: ToastType.Success,
        });
      }
    } catch (e) {
      toast({
        message: e.message || 'error',
      });
    }

    setIsFetching(false);
  };

  return (
    <div className={tw`bg-white shadow`}>
      <div
        className={tw`flex-1 flex items-center justify-center lg:justify-end h-16 px-2 sm:px-4 lg:px-8`}
      >
        <button
          className={tw`bg-transparent py-2 px-4 border border-blue-500 rounded mr-2`}
          onClick={handleConnectWallet}
        >
          {active ? displayAddress(account) : 'Connect Wallet'}
        </button>
        <button
          className={tw` py-2 px-4 border border-blue-500 rounded ${
            isFetching ? 'cursor-not-allowed' : ''
          }`}
          onClick={handleBuyPassport}
        >
          {isFetching ? (
            <div
              className="animate-spin w-6 h-6 border-4 rounded-full"
              role="status"
            ></div>
          ) : (
            'Buy Passport'
          )}
        </button>
        <Search />
      </div>
    </div>
  );
};

export default Navbar;
