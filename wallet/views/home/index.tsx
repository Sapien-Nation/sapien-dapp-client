import { PlusIcon } from '@heroicons/react/outline';
import _chunk from 'lodash/chunk';
import { useEffect, useState } from 'react';

// types
import type { Token } from '../../types';

// web3
import { useWeb3 } from '../../providers';

interface Props {
  onDeposit: () => void;
}

const Home = ({ onDeposit }: Props) => {
  const [tokens, setTokens] = useState<Array<Token>>([]);

  const { walletAPI } = useWeb3();

  useEffect(() => {
    const handleGetTokens = async () => {
      walletAPI.getWalletTokens();
      setTokens([]);
    };

    handleGetTokens();
  }, [walletAPI]);
  return (
    <>
      <ol
        className="pt-4 grid gap-4 grid-cols-4 w-72 mx-auto"
        style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
      >
        <li
          className="w-14 h-14 cursor-pointer rounded-full flex items-center justify-center bg-sapien-80 hover:bg-gray-700"
          onClick={onDeposit}
        >
          <PlusIcon className="w-5 mx-auto text-white" />
        </li>
        {tokens.map((token) => (
          <li
            className="bg-gray-700 hover:bg-gray-50 w-14 h-14 cursor-pointer rounded-full flex justify-center"
            key={token.name}
          ></li>
        ))}
      </ol>
    </>
  );
};

export default Home;
