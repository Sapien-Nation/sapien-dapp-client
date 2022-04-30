import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  RefreshIcon,
} from '@heroicons/react/outline';
import _chunk from 'lodash/chunk';
import { useCallback, useEffect, useState } from 'react';

// types
import type { Transaction } from '../../types';

// web3
import { useWeb3 } from '../../providers';

interface Props {
  handleBack: () => void;
}

const Home = ({ handleBack }: Props) => {
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);
  const [hasMoreTransactions, setHasMoreTransactions] = useState(false);
  const [isFetchingMoreTransactions, setIsFetchingMoreTransactions] =
    useState(false);

  const { walletAPI } = useWeb3();

  const handleGetTransactions = useCallback(async () => {
    setError(null);
    try {
      setIsFetching(true);

      const { transactions, hasMore } = await walletAPI.getUserTransactions(
        page
      );

      setError(null);
      setHasMoreTransactions(hasMore);
      setTransactions(transactions);
    } catch (err) {
      setError(err);
    }
    setIsFetching(false);
  }, [page, walletAPI]);

  useEffect(() => {
    handleGetTransactions();
  }, [handleGetTransactions, walletAPI]);

  // Todo call this to fetch more transactions
  const handleLoadMoreTransactions = async () => {
    try {
      setIsFetchingMoreTransactions(true);

      const { transactions, hasMore } = await walletAPI.getUserTransactions(
        page + 1
      );

      setHasMoreTransactions(hasMore);
      setPage(page + 1);
      setTransactions([...transactions, ...transactions]);

      setError(null);
    } catch (err) {
      setError(err);
    }
    setIsFetchingMoreTransactions(false);
  };

  const renderLoadMoreButton = () => {
    if (isFetchingMoreTransactions)
      return (
        <button
          type="button"
          disabled
          className="w-full py-2 cursor-not-allowed px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white  bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          <RefreshIcon className="w-5 animate-spin" />
          Fetching transactions
        </button>
      );

    if (hasMoreTransactions === true)
      return (
        <button
          type="button"
          onClick={handleLoadMoreTransactions}
          className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white  bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Load More
        </button>
      );

    return null;
  };

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
        {transactions.map(({ hash }) => (
          <li key={hash}>
            <a
              className="underline  text-sm flex flex-row items-center gap-2"
              href={`${process.env.NEXT_PUBLIC_EXPLORER_BASE_URL}${hash}`}
              target="_blank"
              rel="noreferrer"
            >
              See Transaction Details <ExternalLinkIcon className="w-5 h-5" />
            </a>
          </li>
        ))}
      </ul>
      {renderLoadMoreButton()}
    </div>
  );
};

export default Home;
