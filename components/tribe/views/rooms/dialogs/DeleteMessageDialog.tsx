// components
import { Dialog } from 'components/common';
import MessagePreview from '../MessagePreview';

// types
import type { RoomMessage } from 'tools/types/room';

interface Props {
  onClose: () => void;
  onDelete: () => void;
  message: RoomMessage;
  open: boolean;
}

const DeleteMessageDialog = ({ onClose, onDelete, message, open }: Props) => (
  <Dialog
    show={open}
    isFetching={false}
    onClose={onClose}
    title="Delete Message!"
    onConfirm={onDelete}
    confirmLabel="Delete"
  >
    <div className="grid gap-4">
      <p className="text-base text-center mt-6 text-gray-400">
        Are you sure you want to delete this message?
      </p>
      <MessagePreview message={message} />
    </div>
  </Dialog>
);

export default DeleteMessageDialog;
