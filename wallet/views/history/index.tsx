import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  RefreshIcon,
} from '@heroicons/react/outline';
import _chunk from 'lodash/chunk';
import { useCallback, useEffect, useState } from 'react';

// types
import type { Transaction } from 'tools/types/web3';

// web3
import { useWeb3 } from '../../providers';

interface Props {
  handleBack: () => void;
}

enum View {
  Details,
  Home,
}

const Home = ({ handleBack }: Props) => {
  const [view, setView] = useState(View.Home);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);

  const { walletAPI } = useWeb3();

  const handleGetTransactions = useCallback(async () => {
    setError(null);
    try {
      setIsFetching(true);

      const transactions = await walletAPI.getUserTransactions();

      setError(null);
      setTransactions(transactions);
    } catch (err) {
      setError(err);
    }
    setIsFetching(false);
  }, [walletAPI]);

  useEffect(() => {
    handleGetTransactions();
  }, [handleGetTransactions, walletAPI]);

  const renderView = () => {
    if (isFetching) {
      return (
        <div>
          <div className="flex justify-between items-center">
            <h5 className="text-xl text-white font-bold tracking-wide flex items-center gap-2">
              Loading History
              <RefreshIcon className="w-5 animate-spin" />
            </h5>
          </div>
          <p className="text-sm text-white flex items-center justify-center mt-4">
            Fetching your transaction history detail 🐒.
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div>
          <div className="flex justify-center">
            <h5 className="text-xl text-white font-bold tracking-wide flex items-center gap-2">
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
      );
    }

    switch (view) {
      case View.Details:
        return (
          <div>
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-white font-bold tracking-wide flex items-center gap-2">
                <button
                  onClick={() => {
                    setView(View.Home);
                    setTransaction(null);
                  }}
                >
                  <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {transaction.hash}
              </h5>
            </div>
            <div>TODO transaction details {transaction.hash}</div>
          </div>
        );
      case View.Home: {
        return (
          <div>
            <h5 className="text-xl text-white font-bold tracking-wide flex items-center gap-2">
              <button onClick={handleBack}>
                <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              Transactions
            </h5>
            <div>
              <ul>
                {transactions.length === 0 && isFetching === false && (
                  <p className="text-sm text-white grid gap-4 items-center justify-center mt-6 ">
                    <span>
                      You don&apos;t have a transaction yet, please try
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
                )}
                {transactions.map((tx, index) => {
                  const { asset, hash, value } = tx;
                  const isLastItem = index < transactions.length - 1;
                  return (
                    <li
                      key={hash}
                      onClick={() => setTransaction(tx)}
                      className={`${
                        isLastItem ? 'border-b border-gray-700' : ''
                      } flex flex-col items-end py-1 `}
                    >
                      <span>
                        {value} {asset}
                      </span>
                      <a
                        target="_blank"
                        className="underline text-sm flex flex-row gap-2"
                        rel="noreferrer"
                        href={`${process.env.NEXT_PUBLIC_EXPLORER_BASE_URL}${hash}`}
                      >
                        See Transaction Details{' '}
                        <ExternalLinkIcon className="w-5 h-5" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4 flex">
      <div className="w-64">{renderView()}</div>
    </div>
  );
};

export default Home;
