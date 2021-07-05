import { useSnackbar } from 'notistack';
import { useState } from 'react';

// components
import { Dialog } from 'components/common';

// types
import type { Content } from 'tools/types/content';

interface Props {
  content: Content;
  onCancel: () => void;
  onEdit: () => void;
}

const EditContent = ({ onCancel }: Props) => {
  const [isFetching, setIsFetching] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    setIsFetching(true);
    try {
      enqueueSnackbar('Post Edit Successfully', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });

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
      isFetching={isFetching}
      title="Edit post"
      onCancel={onCancel}
      onConfirm={handleDelete}
    >
      TODO
    </Dialog>
  );
};

export default EditContent;
