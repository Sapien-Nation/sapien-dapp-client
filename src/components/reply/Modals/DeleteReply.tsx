import { useSnackbar } from 'notistack';
import { useState } from 'react';

// components
import { Dialog } from 'components/common';

// mui
import { Box, Typography } from '@material-ui/core';

interface Props {
  replyID: string;
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteReply = ({ onCancel }: Props) => {
  const [isFetching, setIsFetching] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    setIsFetching(true);
    try {
      onCancel();
    } catch (error) {
      enqueueSnackbar(error.message, {
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
      confirmLabel="Delete Reply"
      isFetching={isFetching}
      title="Deleting Reply"
      variant="delete"
      onCancel={onCancel}
      onConfirm={handleDelete}
    >
      <Box marginBottom={1} marginTop={1}>
        <Typography
          style={{ color: '#999999', lineHeight: '30px' }}
          variant="body2"
        >
          You are about to permanently delete your reply. Do you want to
          proceed?
        </Typography>
      </Box>
    </Dialog>
  );
};

export default DeleteReply;
