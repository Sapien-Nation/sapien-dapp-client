import { useSnackbar } from 'notistack';
import { useState } from 'react';

// components
import { Dialog } from 'components/common';

// mui
import { Box, Typography } from '@material-ui/core';

interface Props {
  tribeId: string;
  onCancel: () => void;
  onDelete: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DeleteTribe = ({ tribeId, onCancel, onDelete }: Props) => {
  const [isFetching, setIsFetching] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    setIsFetching(true);
    try {
      // TODO API CALL

      enqueueSnackbar('Tribe deleted successfully', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });

      onDelete();
    } catch (error) {
      enqueueSnackbar('Oops, something went wrong. Please try again.', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    }
    setIsFetching(false);
  };

  return (
    <Dialog
      open
      confirmLabel="Delete Tribe"
      isFetching={isFetching}
      title="Deleting tribe"
      variant="delete"
      onCancel={onCancel}
      onClose={onCancel}
      onConfirm={handleDelete}
    >
      <Box marginBottom={1} marginTop={1}>
        <Typography
          style={{ color: '#999999', lineHeight: '30px' }}
          variant="body2"
        >
          You are about to permanently delete this. Do you want to proceed?
        </Typography>
      </Box>
    </Dialog>
  );
};

export default DeleteTribe;
