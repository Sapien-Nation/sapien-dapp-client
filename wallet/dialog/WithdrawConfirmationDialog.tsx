// components
import { Dialog } from 'components/common';

// types
import type { Token } from '../types';

interface Props {
  address: string;
  token: Token;
  onClose: () => void;
  onWithdraw: ({ address }: { address: string }) => void;
}

const WithdrawConfirmationDialog = ({
  address,
  onClose,
  onWithdraw,
  token,
}: Props) => (
  <Dialog
    show
    isFetching={false}
    onClose={onClose}
    title="Confirm Withdrawal"
    onConfirm={() => onWithdraw({ address })}
    confirmLabel="Confirm"
  >
    <div className="grid gap-4">
      <p className="text-base text-center mt-6 text-gray-400">
        Are you sure you want to withdraw {token.name} to {address}?
      </p>
    </div>
  </Dialog>
);

export default WithdrawConfirmationDialog;
