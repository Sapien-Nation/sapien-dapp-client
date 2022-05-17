import { ArrowLeftIcon, BadgeCheckIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useSWRConfig } from 'swr';

// api
import { signPassport } from '../../api';

// context
import { useAuth } from 'context/user';

// components
import { Query } from 'components/common';

// helpers
import { getShortWalletAddress } from 'utils/wallet';

// types
import type { Token } from '../../types';

interface Props {
  handleBack: () => void;
  token: Token;
  onWithdraw: (token: Token) => void;
}

enum View {
  DeclarationOfSovereignty,
  Home,
  ConfirmSign,
  Success,
}

const TokenView = ({ handleBack, token, onWithdraw }: Props) => {
  const [view, setView] = useState(View.Home);
  const [signError, setSignError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const { me } = useAuth();
  const { mutate } = useSWRConfig();
  const apiKey = `/core-api/passport/${token.id}/signed`;

  const handleSignToken = async () => {
    setIsFetching(true);
    setSignError(null);

    try {
      await signPassport(token.id);

      mutate(apiKey, () => ({ canSign: false, signed: true }), false);
      mutate(
        '/user-api/me',
        (me) => ({
          ...me,
          passport: {
            ...me.passport,
            status: 'S',
          },
        }),
        false
      );

      setView(View.Success);
    } catch (err) {
      setSignError(err);
    }
    setIsFetching(true);
  };

  const renderView = () => {
    switch (view) {
      case View.Success:
        return (
          <>
            <h5 className="text-xl text-white font-bold tracking-wide flex items-left gap-2">
              <button onClick={handleBack}>
                <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              Go home
            </h5>
            <div>TODO success message</div>
          </>
        );
      case View.ConfirmSign:
        return (
          <>
            <h5 className="text-xl text-white font-bold tracking-wide flex items-left gap-2">
              <button onClick={() => setView(View.Home)}>
                <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              Confirm
            </h5>
            <button
              type="button"
              disabled={isFetching}
              onClick={handleSignToken}
              className={
                isFetching
                  ? 'w-full py-2 px-4 flex animate-pulse justify-center items-center cursor-not-allowed gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
                  : 'w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
              }
            >
              {isFetching ? ' Signing Passport...' : 'Confirm'}
            </button>
            {signError && (
              <span className="text-xs text-red-400 flex justify-center items-center">
                {signError}
              </span>
            )}
          </>
        );
      case View.DeclarationOfSovereignty:
        return (
          <>
            <h5 className="text-xl text-white font-bold tracking-wide flex items-left gap-2">
              <button onClick={() => setView(View.Home)}>
                <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              Declaration
            </h5>
            <div className="py-6 px-1 flex flex-col gap-5">
              <p>TODO: Declaration</p>
              <span>I agree to uphold the values of the Sapien Nation</span>
              <input
                disabled
                className="appearance-none block w-full px-3 py-2 border bg-gray-500 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm cursor-not-allowed text-center"
                value={getShortWalletAddress(me.walletAddress)}
              />
              <button
                type="button"
                onClick={() => setView(View.ConfirmSign)}
                className={
                  isFetching
                    ? 'w-full py-2 px-4 flex animate-pulse justify-center items-center cursor-not-allowed gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
                    : 'w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
                }
              >
                Sign
              </button>
            </div>
          </>
        );
      case View.Home:
        return (
          <>
            <h5 className="text-xl text-white font-bold tracking-wide flex items-left gap-2">
              <button onClick={handleBack}>
                <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {token.name}
            </h5>
            <p>
              This is your token inside the Sapien Wallet, below you can find a
              few options to manipulate your transfer
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
                {({
                  canSign,
                  signed,
                }: {
                  canSign: boolean;
                  signed: boolean;
                }) => {
                  if (canSign === false)
                    return (
                      <span className="text-xs text-green-400 flex justify-center items-center">
                        {signed
                          ? 'Passport Signed.'
                          : 'You already have a passport signed in your wallet'}{' '}
                        <BadgeCheckIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    );

                  return (
                    <button
                      type="button"
                      onClick={() => setView(View.DeclarationOfSovereignty)}
                      className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Sign Passport
                    </button>
                  );
                }}
              </Query>
            </div>
          </>
        );
    }
  };

  return (
    <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
      <div className="w-72 flex flex-col gap-4">{renderView()}</div>
    </div>
  );
};

export default TokenView;
