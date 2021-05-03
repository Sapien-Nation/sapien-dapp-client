import { useSnackbar } from 'notistack';

// types
import { Square } from 'tools/types/square';

// mui
import { Button, Typography } from '@material-ui/core';

// api
import axios from 'api';

// components
import { Dialog } from 'components/common';
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

  const handleDelete = async () => {
    try {
      await axios.post('/api/squares/delete', {
        squareID: square.id,
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
      <Button color="secondary" style={{ padding: 0 }} onClick={handleDelete}>
        Delete Square
      </Button>
      <Typography variant="body1">
        When you delete your square it cannot be recovered
      </Typography>
    </Dialog>
  );
};

export default CreateSquare;
