import { useForm, FormProvider } from 'react-hook-form';

// constants
import { ToastType } from 'constants/toast';

// components
import { Dialog } from 'components/common';

// hooks
import { useToast } from 'context/toast';

interface Props {
  onClose: () => void;
}

const form = 'delete-message-form';
const DeleteMessageDialog = ({ onClose }: Props) => {
  const toast = useToast();
  const methods = useForm();

  const {
    formState: { errors },
    handleSubmit,
  } = methods;

  const onSubmit = async () => {
    try {
      toast({
        message: 'Message deleted successfully',
        type: ToastType.Success,
      });

      onClose();
    } catch (error) {
      toast({
        message: error || 'Service unavailable',
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
      </FormProvider>
    </Dialog>
  );
};

export default DeleteMessageDialog;
