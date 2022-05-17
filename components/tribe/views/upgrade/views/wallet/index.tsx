import { PhotographIcon } from '@heroicons/react/solid';
import { useCallback, useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';

// api
import { signPassport } from 'wallet/api';

// context
import { useAuth } from 'context/user';

// components
import UpgradeView from '../upgrade';

// helpers
import { getShortWalletAddress } from 'utils/wallet';

// hooks
import { useWeb3 } from 'wallet/providers';

// types
import type { Token } from 'wallet/types';

enum View {
  Home,
  DeclarationOfSovereignty,
  ConfirmSign,
  Success,
  Token,
}

const Wallet = () => {
  const [view, setView] = useState(View.Home);
  const [error, setError] = useState<string | null>(null);
  const [tokens, setTokens] = useState<Array<Token>>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const { me } = useAuth();
  const { mutate } = useSWRConfig();
  const { walletAPI, isReady: isWeb3Ready, error: web3Error } = useWeb3();

  //------------------------------------------------------------------------
  const handleGetTokens = useCallback(async () => {
    setError(null);
    try {
      setIsFetching(true);

      const tokens = await walletAPI.getWalletTokens(me.walletAddress);
      setTokens(tokens);
      setError(null);
    } catch (err) {
      console.log(error);
      setError(err);
    }
    setIsFetching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAPI]);

  const handleSignToken = async () => {
    setIsFetching(true);
    setError(null);

    try {
      await signPassport(selectedToken.id);

      mutate(
        `/core-api/passport/${selectedToken.id}/signed`,
        () => ({ canSign: false, signed: true }),
        false
      );
      mutate(
        '/user-api/me',
        (me) => ({
          ...me,
          passport: {
            ...me.passport,
            status: 'S', // TODO PassportStatus.S
          },
        }),
        false
      );

      setView(View.Success);
    } catch (err) {
      setError(err);
    }
    setIsFetching(true);
  };

  //------------------------------------------------------------------------

  useEffect(() => {
    handleGetTokens();
  }, [handleGetTokens, walletAPI]);
  //------------------------------------------------------------------------

  const renderView = () => {
    if (web3Error) {
      return <h1>Web3 Error!</h1>;
    }

    if (isWeb3Ready === false) {
      return <h1>Web3 Loading</h1>;
    }

    if (error) return <h1>Error UI Here...</h1>;
    if (isFetching) return <h1>Fetching UI Here...</h1>;

    switch (view) {
      case View.Home:
        return (
          <ol>
            {tokens.map((token) => (
              <li
                key={token.name}
                onClick={() => {
                  if (token.id) {
                    setSelectedToken(token);
                    setView(View.Token);
                  }
                }}
              >
                <>
                  {token.id === null ? (
                    <>
                      <PhotographIcon className="px-1 py-1 w-6" />
                    </>
                  ) : (
                    <img className="rounded-full" src={token.image} alt="" />
                  )}
                </>
              </li>
            ))}
          </ol>
        );
      case View.ConfirmSign:
        return (
          <>
            <button onClick={() => setView(View.Home)}>Cancel</button>
            <div>
              <span>
                <p>
                  Please confirm the signing of your Sapien Passport. This will
                  make your passport untradeable and unlock a host of benefits
                  on the Sapien Platform.
                </p>
                <p>
                  (Note: This action is irreversible, once a passport is signed
                  it can not leave your Sapien wallet).
                </p>
              </span>
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
            </div>
            {error && (
              <span className="text-xs text-red-400 flex justify-center items-center">
                {error}
              </span>
            )}
          </>
        );
      case View.Success:
        return <UpgradeView />;
      case View.DeclarationOfSovereignty:
        return (
          <>
            <span>TODO DeclarationOfSovereignty</span>

            <span>I agree to uphold the values of the Sapien Nation</span>
            <input
              disabled
              className="appearance-none block w-full px-3 py-2 border bg-gray-500 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm cursor-not-allowed text-center"
              value={getShortWalletAddress(me.walletAddress)}
            />
            <button
              type="button"
              onClick={() => setView(View.ConfirmSign)}
              className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Sign
            </button>
          </>
        );
      case View.Token:
        return (
          <>
            <button onClick={() => setView(View.Home)}>Go Back</button>
            {selectedToken.id}
            <img src={selectedToken.image} alt="Sapien Passport" />

            <button onClick={() => setView(View.DeclarationOfSovereignty)}>
              Sign
            </button>
          </>
        );
    }
  };

  return <div>{renderView()}</div>;
};

export default Wallet;
