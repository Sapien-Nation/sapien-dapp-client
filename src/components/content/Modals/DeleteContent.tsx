import { useSnackbar } from 'notistack';
import { useState } from 'react';

// api
import { deleteContent as deleteContentAction } from 'api/content';

// components
import { Dialog } from 'components/common';

// mui
import { Box, Typography } from '@material-ui/core';

interface Props {
  contentID: string;
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteContent = ({ contentID, onCancel, onDelete }: Props) => {
  const [isFetching, setIsFetching] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    setIsFetching(true);
    try {
      await deleteContentAction(contentID);

      enqueueSnackbar('Post Deleted Successfully');

      onDelete();
      onCancel();
    } catch (err) {
      enqueueSnackbar(err.message);
    }
    setIsFetching(false);
  };

  return (
    <Dialog
      open
      confirmLabel="Delete Post"
      isFetching={isFetching}
      title="Deleting post"
      onCancel={onCancel}
      onConfirm={handleDelete}
    >
      <Box marginBottom={1} marginTop={1}>
        <Typography
          style={{ color: '#999999', lineHeight: '30px' }}
          variant="body2"
        >
          You are about to permanently delete your post. Do you want to proceed?
        </Typography>
      </Box>
    </Dialog>
  );
};

export default DeleteContent;
