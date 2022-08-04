import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useCallback, useEffect, useState } from 'react';

// constants
import { Coin, CoinMap } from 'wallet/constants';

// providers
import { useWeb3 } from 'wallet/providers';

interface Props {
  handleBack: () => void;
  coin: Coin;
  onWithdraw: () => void;
}

const CoinView = ({ handleBack, coin, onWithdraw }: Props) => {
  const [userBalance, setUserBalance] = useState(0);
  const [isFetchingBalance, setIsFetchingBalance] = useState(true);

  const coinData = CoinMap[coin];
  const { walletAPI } = useWeb3();

  const fetchBalance = useCallback(async () => {
    setIsFetchingBalance(true);
    try {
      const balance = await walletAPI.getERC20Balance(coin);

      setUserBalance(balance);
    } catch (err) {
      setUserBalance(0);
    }
    setIsFetchingBalance(false);
  }, [walletAPI]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const getBalance = () => {
    if (isFetchingBalance)
      return <span className="text-sm">(Loading Balance...)</span>;

    return (
      <span className="text-sm">
        ({userBalance} {coin})
      </span>
    );
  };

  return (
    <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
      <div className="w-72 flex flex-col gap-4">
        <h5 className="text-xl text-white font-bold tracking-wide flex items-left gap-2 items-center">
          <button onClick={handleBack}>
            <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          {coinData.name} {getBalance()}
        </h5>
        <img
          className="rounded-full px-1 py-1 w-20 h-20 self-center object-cover bg-gray-50"
          src={coinData.image}
          alt=""
        />
        <div className="text-center grid gap-6">
          <button
            type="button"
            onClick={() => onWithdraw()}
            className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoinView;
