import { ArrowLeftIcon, BadgeCheckIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useSWRConfig } from 'swr';

// api
import { signPassport } from '../../api';

// components
import { Query } from 'components/common';

// types
import type { Token } from '../../types';

interface Props {
  handleBack: () => void;
  token: Token;
  onWithdraw: (token: Token) => void;
}

const TokenView = ({ handleBack, token, onWithdraw }: Props) => {
  const [signError, setSignError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const { mutate } = useSWRConfig();
  const apiKey = `/core-api/token/${token.id}/signed`;

  const handleSignToken = async () => {
    setIsFetching(true);
    try {
      await signPassport(token.id);

      setSignError(null);

      mutate(apiKey, () => ({ signed: true }), false);
    } catch (err) {
      setSignError(err);
    }
    setIsFetching(true);
  };

  return (
    <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
      <div className="w-72 h-96 flex flex-col  gap-4">
        <h5 className="text-xl text-white font-bold tracking-wide flex items-left gap-2">
          <button onClick={handleBack}>
            <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          {token.name}
        </h5>
        <p>
          This is your token inside the Sapien Wallet, below you can find a few
          options to manipulate your transfer
        </p>
        <img
          className="rounded-full px-1 py-1 w-20 h-20 self-center"
          src={token.image}
          alt=""
        />
        <div className="text-center grid gap-6">
          <button
            type="button"
            onClick={() => onWithdraw(token)}
            className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Withdraw
          </button>
          <Query
            api={apiKey}
            options={{ fetcher: () => false }}
            loader={
              <button
                type="button"
                disabled
                className="w-full animate-pulse py-2 px-4 flex justify-center items-center gap-4 border border-transparent cursor-not-allowed rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Checking...
              </button>
            }
          >
            {({ signed }: { signed: boolean }) => {
              if (signed === true)
                return (
                  <span className="text-xs text-green-400 flex justify-center items-center">
                    Signed Passport{' '}
                    <BadgeCheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                );

              if (isFetching) {
                return (
                  <button
                    type="button"
                    disabled
                    className="w-full py-2 px-4 flex animate-pulse justify-center items-center cursor-not-allowed gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Signing Passport...
                  </button>
                );
              }

              return (
                <button
                  type="button"
                  onClick={handleSignToken}
                  className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Sign Passport
                </button>
              );
            }}
          </Query>
          {signError && (
            <span className="text-xs text-red-400 flex justify-center items-center">
              {signError}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenView;
