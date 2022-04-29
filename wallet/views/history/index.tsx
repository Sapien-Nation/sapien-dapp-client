import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  RefreshIcon,
} from '@heroicons/react/outline';
import _chunk from 'lodash/chunk';
import { useCallback, useEffect, useState } from 'react';

// types
import type { UserTransactions } from '../../types';

// web3
import { useWeb3 } from '../../providers';

interface Props {
  handleBack: () => void;
}

const Home = ({ handleBack }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [transactions, setTransactions] = useState<Array<UserTransactions>>([]);

  const { walletAPI } = useWeb3();

  const handleGetTransactions = useCallback(async () => {
    setError(null);
    try {
      setIsFetching(true);

      const transactions = await walletAPI.getUserTransactions();
      setTransactions(transactions);
      setError(null);
    } catch (err) {
      setError(err);
    }
    setIsFetching(false);
  }, [walletAPI]);

  useEffect(() => {
    handleGetTransactions();
  }, [handleGetTransactions, walletAPI]);

  if (isFetching) {
    return (
      <div className="bg-sapien-gray-700 opacity-25 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
        <div className="w-56 h-26">
          <div className="flex justify-between items-center">
            <h5 className="text-xl text-white font-extrabold tracking-wide flex items-center gap-2">
              Loading History
              <RefreshIcon className="w-5 animate-spin" />
            </h5>
          </div>
          <p className="text-sm text-white flex items-center justify-center mt-4">
            Fetching your transaction history detail 🐒.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-sapien-gray-700 opacity-25 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
        <div className="w-64 h-64">
          <div className="flex justify-center">
            <h5 className="text-xl text-white font-extrabold tracking-wide flex items-center gap-2">
              <button onClick={handleBack}>
                <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              Transactions
            </h5>
          </div>
          <p className="text-sm text-white grid gap-4 items-center justify-center mt-6 ">
            <span>
              There was an error fetching the transactions history of your
              wallet, or you don&apos;t have a transaction yet, please try
              refreshing or come back in a few minutes.
            </span>
            <button
              type="button"
              onClick={handleGetTransactions}
              disabled={isFetching}
              className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Refresh Transactions
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center">
      <h5 className="text-xl text-white font-extrabold tracking-wide flex items-center gap-2">
        <button onClick={handleBack}>
          <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        Transactions
      </h5>
      <ul>
        {transactions.length === 0 && isFetching === false && (
          <p className="text-sm text-white grid gap-4 items-center justify-center mt-6 ">
            <span>
              You don&apos;t have a transaction yet, please try refreshing or
              come back in a few minutes.
            </span>
            <button
              type="button"
              onClick={handleGetTransactions}
              disabled={isFetching}
              className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Refresh Transactions
            </button>
          </p>
        )}
        {transactions.map(({ transactionHash }) => (
          <li key={transactionHash}>
            <a
              className="underline  text-sm flex flex-row items-center gap-2"
              href={`${process.env.NEXT_PUBLIC_EXPLORER_BASE_URL}${transactionHash}`}
              target="_blank"
              rel="noreferrer"
            >
              See Transaction Details <ExternalLinkIcon className="w-5 h-5" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
