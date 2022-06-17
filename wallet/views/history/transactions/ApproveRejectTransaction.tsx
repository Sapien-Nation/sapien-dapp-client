// types
import type { Transaction } from 'tools/types/web3';

interface Props {
  transaction: Transaction;
}

const ApproveRejectTransaction = ({ transaction }: Props) => {
  return (
    <>
      <span>TODO approve UI</span>
    </>
  );
};

export default ApproveRejectTransaction;
