import { useSnackbar } from 'notistack';

// types
import { Square } from 'tools/types/square';

// api
import axios from 'api';

// components
import Dialog from 'components/dialog';
import SquareForm, { formKey, FormValues } from './SquareForm';

interface Props {
  onClose: () => void;
  square: Square;
}

const CreateSquare = ({ onClose, square }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = async (values: FormValues) => {
    try {
      await axios.put(`/api/squares/edit/${square.id}`, {
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
      confirmLabel="Save Changes"
      form={formKey}
      maxWidth="sm"
      title="Edit Square"
      onClose={onClose}
    >
      <SquareForm action={handleFormSubmit} square={square} />
    </Dialog>
  );
};

export default CreateSquare;
