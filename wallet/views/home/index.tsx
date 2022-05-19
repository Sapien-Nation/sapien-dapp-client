import {
  PlusIcon,
  RefreshIcon,
  XCircleIcon,
  PhotographIcon,
} from '@heroicons/react/outline';
import { ClipboardCopyIcon } from '@heroicons/react/solid';
import _chunk from 'lodash/chunk';
import { useCallback, useEffect, useState, useRef } from 'react';
import { useCopyToClipboard } from 'react-use';
import { Menu, Transition } from '@headlessui/react';

// api
import { mintPassport } from 'api/passport';

// helpers
import { getShortWalletAddress } from 'utils/wallet';

// hooks
import { useUnreadNotifications } from 'wallet/hooks';

// icons
import { DotsVerticalIcon } from '@heroicons/react/solid';

// components
import { Query, RedDot, Tooltip } from 'components/common';

// context
import { useAuth } from 'context/user';

// types
import type { Token } from '../../types';

// web3
import { useWeb3 } from '../../providers';

interface Props {
  onDeposit: () => void;
  onSelectToken: (token: Token) => void;
  onViewHistory: () => void;
  onViewNotifications: () => void;
}

const Home = ({
  onDeposit,
  onSelectToken,
  onViewHistory,
  onViewNotifications,
}: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [tokens, setTokens] = useState<Array<Token>>([]);
  const [mintError, setMinError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isMintingPassport, setIsMintingPassport] = useState(false);
  const [copyToClipboardSuccess, setCopyToClipboardSuccess] = useState(false);

  const copyAddressTooltip = useRef(null);

  const { me } = useAuth();
  const { walletAPI } = useWeb3();
  const [_, copyToClipboard] = useCopyToClipboard();
  const { count } = useUnreadNotifications();

  const handleGetTokens = useCallback(async () => {
    setError(null);
    try {
      setIsFetching(true);

      const tokens = await walletAPI.getWalletTokens(me.walletAddress);
      setTokens(tokens);
      setError(null);
    } catch (err) {
      setError(err);
    }
    setIsFetching(false);
  }, [walletAPI]);

  const handleMint = async () => {
    setMinError(null);
    setIsMintingPassport(true);
    try {
      const data = await mintPassport(me.walletAddress);

      setIsMintingPassport(false);
      await handleGetTokens();
    } catch (err) {
      setMinError(err);
    }
    setIsMintingPassport(false);
  };

  useEffect(() => {
    handleGetTokens();
  }, [handleGetTokens, walletAPI]);

  if (error) {
    return (
      <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
        <div className="w-64">
          <div className="flex justify-center">
            <h5 className="text-xl text-white font-bold tracking-wide flex items-center gap-2 text-center">
              Network Issues.
              <XCircleIcon className="w-5" />
            </h5>
          </div>
          <p className="text-sm text-white grid gap-4 items-center justify-center mt-6 ">
            <span>
              Sometimes servers play games, this is not the exception, but
              don&lsquo;t worry we got you, try to refresh the menu, or click
              the button below
            </span>
            <button
              type="button"
              onClick={handleGetTokens}
              disabled={isFetching}
              className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Reload Now
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto">
      <div className="grid grid-cols-3 gap-1 items-center border-b-[1px] border-gray-800 p-3">
        <button
          className="flex flex-col items-center col-start-2 cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();

            copyToClipboard(me.walletAddress);
            setCopyToClipboardSuccess(true);

            setTimeout(() => {
              setCopyToClipboardSuccess(false);
            }, 1000);
          }}
          ref={copyAddressTooltip.current?.setTriggerRef}
        >
          <div className="flex gap-2 items-center">
            <span>Account</span>{' '}
            <ClipboardCopyIcon className="aria-hidden w-5 h-5" />
          </div>
          <span className="text-sm">
            {getShortWalletAddress(me.walletAddress)}
          </span>
        </button>
        <Tooltip
          ref={copyAddressTooltip}
          text={
            copyToClipboardSuccess ? 'Copied to Clipboard' : 'Copy to Clipboard'
          }
          placement="bottom"
        />
        <div className="flex justify-end">
          <Menu as="div">
            <Menu.Button>
              <div className="relative">
                <DotsVerticalIcon className="w-5 text-gray-400" />

                {count > 0 && (
                  <>
                    <div className="absolute top-0 right-0 -mr-1 -mt-1 w-2 h-2 rounded-full bg-red-300 animate-ping"></div>
                    <div className="absolute top-0 right-0 -mr-1 -mt-1 w-2 h-2 rounded-full bg-red-300"></div>
                  </>
                )}
              </div>
            </Menu.Button>
            <Transition>
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                {' '}
                <div className="">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={onViewHistory}
                          className={`${
                            active
                              ? 'bg-primary-200 text-white'
                              : 'text-gray-900'
                          } group flex w-full items-center p-2 text-sm rounded-md`}
                        >
                          View History
                        </button>
                      )}
                    </Menu.Item>
                  </div>

                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <div className="relative">
                          <button
                            onClick={onViewNotifications}
                            className={`${
                              active
                                ? 'bg-primary-200 text-white'
                                : 'text-gray-900'
                            } group flex w-full items-center p-2 text-sm rounded-md`}
                          >
                            Notifications
                            <RedDot animate={false} count={count} />
                          </button>
                        </div>
                      )}
                    </Menu.Item>
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className="py-6 px-4">
        {tokens.some(({ image }) => image === null) === true && (
          <p className="text-sm text-white grid gap-4 items-center justify-center mb-6">
            <span>
              We found some issues while fetching your tokens, you can re-try to
              fetch them or wait for 30 seconds and re-open the Wallet
            </span>
            <button
              type="button"
              onClick={handleGetTokens}
              disabled={isFetching}
              className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Click here to reload
            </button>
          </p>
        )}
        <ol
          className="grid gap-4 grid-cols-4 w-72 mx-auto"
          style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
        >
          {isFetching === true && (
            <li className="w-14 h-14 cursor-pointer rounded-full flex items-center justify-center bg-sapien-80 hover:bg-gray-700">
              <RefreshIcon className="w-5 mx-auto text-white animate-spin" />
            </li>
          )}
          {isFetching === false && (
            <li
              className="w-14 h-14 cursor-pointer rounded-full flex items-center justify-center bg-sapien-80 hover:bg-gray-700"
              onClick={onDeposit}
            >
              <PlusIcon className="w-5 mx-auto text-white" />
            </li>
          )}
          {tokens.map((token) => (
            <li
              className={
                token.id
                  ? 'bg-gray-700 hover:bg-gray-50 w-14 h-14 cursor-pointer rounded-full flex justify-center'
                  : 'bg-gray-700 w-14 h-14 cursor-not-allowed rounded-full flex justify-center items-center'
              }
              key={token.name}
              onClick={() => {
                if (token.id) {
                  onSelectToken(token);
                }
              }}
            >
              {isFetching ? (
                <RefreshIcon className="w-5 mx-auto text-white animate-spin" />
              ) : (
                <>
                  {token.id === null ? (
                    <>
                      <PhotographIcon className="px-1 py-1 w-6" />
                    </>
                  ) : (
                    <img
                      className="rounded-full object-cover"
                      src={token.image}
                      alt=""
                    />
                  )}
                </>
              )}
            </li>
          ))}
        </ol>

        {isFetching === false && tokens.length === 0 && (
          <Query api="/core-api/passport/mint-checker">
            {({
              code,
              figureName,
            }: {
              code: number | null;
              figureName: string;
            }) => {
              if (code === 100) {
                return (
                  <div className="mt-4 grid gap-4">
                    <button
                      type="button"
                      onClick={handleMint}
                      disabled={isFetching}
                      className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      {isMintingPassport
                        ? 'Minting...'
                        : `Mint Sapien Passport (${figureName})`}
                    </button>

                    {mintError && (
                      <span className="text-xs text-red-400 flex justify-center items-center">
                        {mintError.includes('Returned error:')
                          ? mintError.replace('Returned error:', '')
                          : mintError}
                      </span>
                    )}
                  </div>
                );
              }

              return null;
            }}
          </Query>
        )}
      </div>
    </div>
  );
};

export default Home;
