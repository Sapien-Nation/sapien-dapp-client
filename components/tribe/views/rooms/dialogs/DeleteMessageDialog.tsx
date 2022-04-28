import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/router';

// api
import { deleteMessage } from 'api/room';

// components
import { Dialog } from 'components/common';
import MessagePreview from '../MessagePreview';

// hooks
import { useToast } from 'context/toast';

// types
import type { RoomMessage } from 'tools/types/room';

interface Props {
  onClose: () => void;
  message: RoomMessage;
}

const form = 'delete-message-form';
const DeleteMessageDialog = ({ onClose, message }: Props) => {
  const toast = useToast();
  const methods = useForm();
  const { query } = useRouter();
  const { handleSubmit } = methods;

  const roomID = query.viewID as string;

  const onSubmit = async () => {
    try {
      await deleteMessage(roomID, message.id);

      onClose();
    } catch (error) {
      toast({
        message: error,
      });
    }
  };

  return (
    <Dialog
      show
      isFetching={false}
      onClose={onClose}
      title="Delete Message!"
      form={form}
      confirmLabel="Delete"
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} id={form}>
          <p className="text-base text-center mt-6 text-gray-400">
            Are you sure you want to delete this message?
          </p>
        </form>
        <div>
          <MessagePreview message={message} />
        </div>
      </FormProvider>
    </Dialog>
  );
};

export default DeleteMessageDialog;
