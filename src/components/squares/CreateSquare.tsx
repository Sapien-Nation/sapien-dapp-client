import { useSnackbar } from 'notistack';

// api
import axios from 'api';

// components
import { Dialog } from 'components/common';
import SquareForm, { formKey, FormValues } from './SquareForm';

interface Props {
  onClose: () => void;
}

const CreateSquare = ({ onClose }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = async (values: FormValues) => {
    try {
      await axios.post('/api/squares/create', {
        name: values.name,
        topics: values.topics.split(' '),
      });
      onClose();
    } catch ({ response }) {
      enqueueSnackbar(response.data.message);
    }
  };

  return (
    <Dialog
      open
      form={formKey}
      maxWidth="sm"
      title="New Square"
      onClose={onClose}
    >
      <SquareForm action={handleFormSubmit} />
    </Dialog>
  );
};

export default CreateSquare;
