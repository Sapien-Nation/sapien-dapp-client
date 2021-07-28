import { useSnackbar } from 'notistack';
import { useState } from 'react';

// api
import { deleteReply } from 'api/replies';

// components
import { Dialog } from 'components/common';

// mui
import { Box, Typography } from '@material-ui/core';

interface Props {
  replyID: string;
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteReply = ({ replyID, onCancel }: Props) => {
  const [isFetching, setIsFetching] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    setIsFetching(true);
    try {
      await deleteReply(replyID);

      onCancel();
      enqueueSnackbar('Reply deleted successfully.', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
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
      confirmLabel="Delete Reply"
      isFetching={isFetching}
      title="Deleting Reply"
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
          You are about to permanently delete your reply. Do you want to
          proceed?
        </Typography>
      </Box>
    </Dialog>
  );
};

export default DeleteReply;
