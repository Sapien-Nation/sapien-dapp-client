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

// helpers
import { getShortWalletAddress } from 'utils/wallet';

// icons
import { DotsVerticalIcon } from '@heroicons/react/solid';

// components
import { Tooltip } from 'components/common';

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
}

const Home = ({ onDeposit, onSelectToken, onViewHistory }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [tokens, setTokens] = useState<Array<Token>>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [copyToClipboardSuccess, setCopyToClipboardSuccess] = useState(false);

  const copyAddressTooltip = useRef(null);

  const { me } = useAuth();
  const { walletAPI } = useWeb3();
  const [_, copyToClipboard] = useCopyToClipboard();

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

  useEffect(() => {
    handleGetTokens();
  }, [handleGetTokens, walletAPI]);

  if (error) {
    return (
      <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
        <div className="w-64">
          <div className="flex justify-center">
            <h5 className="text-xl text-white font-extrabold tracking-wide flex items-center gap-2 text-center">
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
              <DotsVerticalIcon className="w-5 text-gray-400" />
            </Menu.Button>
            <Transition>
              <Menu.Items className="absolute right-0 w-56 z-10 origin-top-right bg-white rounded-md">
                <div className="">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={onViewHistory}
                        className={`${
                          active ? 'bg-primary-200 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md p-2 text-sm`}
                      >
                        View History
                      </button>
                    )}
                  </Menu.Item>
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
                    <div className="rounded-full w-14 h-14 relative overflow-hidden">
                      <img
                        className="mx-auto my-0 h-auto w-full"
                        src={token.image}
                        alt=""
                      />
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Home;
