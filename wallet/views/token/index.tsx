import { ArrowLeftIcon } from '@heroicons/react/outline';

// types
import type { Token } from '../../types';

interface Props {
  handleBack: () => void;
  token: Token;
  onWithdraw: (token: Token) => void;
}

const TokenView = ({ handleBack, token, onWithdraw }: Props) => {
  return (
    <div className="bg-sapien-gray-700 opacity-25 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4">
      <div className="w-72 h-96 flex flex-col  gap-4">
        <h5 className="text-xl text-white font-extrabold tracking-wide flex items-left gap-2">
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
        </div>
      </div>
    </div>
  );
};

export default TokenView;
