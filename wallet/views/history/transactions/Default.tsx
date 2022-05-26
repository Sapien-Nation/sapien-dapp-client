import { ExternalLinkIcon } from '@heroicons/react/outline';

// types
import type { Transaction } from 'tools/types/web3';

interface Props {
  transaction: Transaction;
}

const explorerURL = process.env.NEXT_PUBLIC_EXPLORER_BASE_URL;
const DefaultTransaction = ({ transaction }: Props) => {
  return (
    <>
      <span>
        {transaction.value} {transaction.asset}
      </span>
      <a
        target="_blank"
        className="underline text-sm flex flex-row gap-2"
        rel="noreferrer"
        href={`${explorerURL}${transaction.hash}`}
      >
        See Transaction Details <ExternalLinkIcon className="w-5 h-5" />
      </a>
    </>
  );
};

export default DefaultTransaction;
