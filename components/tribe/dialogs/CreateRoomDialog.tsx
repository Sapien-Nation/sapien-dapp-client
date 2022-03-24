// components
import {
  Dialog,
  TextareaInput,
  TextInput,
  TextInputLabel,
} from 'components/common';

//hooks
import { useToast } from 'context/toast';

interface Props {
  onClose: () => void;
}

const form = 'create-room-form';
const CreateRoomDialog = ({ onClose }: Props) => {
  const toast = useToast();

  const onSubmit = async () => {
    try {
      onClose();
    } catch (error) {
      toast({
        message: error || 'Service unavailable',
      });
    }
  };

  return (
    <Dialog
      isFetching={false}
      onClose={onClose}
      title="Create a Room"
      form={form}
      confirmLabel="Create"
    >
      <>
        <div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={onSubmit} id={form}>
              TODO CREATE ROOM DIALOG
            </form>
          </div>
        </div>
      </>
    </Dialog>
  );
};

export default CreateRoomDialog;
