import { ArrowLeftIcon, BadgeCheckIcon } from '@heroicons/react/outline';

// components
import { Query } from 'components/common';

// types
import type { Token } from '../../types';

interface Props {
  handleBack: () => void;
  token: Token;
  onWithdraw: (token: Token) => void;
  showDeclarationDialog?: () => void;
}

const TokenView = ({
  handleBack,
  token,
  onWithdraw,
  showDeclarationDialog,
}: Props) => {
  return (
    <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
      <div className="w-72 flex flex-col gap-4">
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
          className="rounded-full px-1 py-1 w-20 h-20 self-center object-cover"
          src={token.image}
          alt=""
        />
        <div className="text-center grid gap-6">
          <Query
            api={`/core-api/passport/${token.id}/signed`}
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
            {({ canSign, signed }: { canSign: boolean; signed: boolean }) => {
              if (canSign === false)
                return (
                  <span className="text-xs text-green-400 flex justify-center items-center">
                    {signed
                      ? 'Passport Signed.'
                      : 'You already have a passport signed in your wallet'}{' '}
                    <BadgeCheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                );

              return (
                <>
                  {signed === false ? (
                    <button
                      type="button"
                      onClick={() => onWithdraw(token)}
                      className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Withdraw
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={showDeclarationDialog}
                    className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Sign Passport
                  </button>
                </>
              );
            }}
          </Query>
        </div>
      </div>
    </div>
  );
};

export default TokenView;
