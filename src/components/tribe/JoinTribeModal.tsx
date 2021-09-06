import { useSnackbar } from 'notistack';
import { mutate } from 'swr';
import { useRouter } from 'next/router';

// api
import { joinTribe } from 'api/tribes';

// components
import { Dialog } from 'components/common';

// mui
import { Typography } from '@material-ui/core';

interface Props {
  tribe: any;
  onClose: () => void;
}

const JoinTribeModal = ({ onClose, tribe: { id, mainSquareId } }: Props) => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const handleJoinTribe = async () => {
    try {
      await joinTribe(id);

      mutate('/api/v3/tribes/discovery', (tribes: Array<any>) =>
        tribes.filter((tribe) => id !== tribe.id)
      );
      onClose();
      push(`/client/${mainSquareId}`);
    } catch (err) {
      enqueueSnackbar(err.message);
    }
  };
  return (
    <Dialog
      open
      cancelLabel="No, thank you"
      confirmLabel="Yes , I want to join"
      maxWidth="xs"
      title={
        <>
          <Typography variant="h2">Welcome, Sapien!</Typography>
        </>
      }
      onClose={onClose}
      onConfirm={handleJoinTribe}
    >
      You are about to join Tribe Name. Do you want to proceed?
    </Dialog>
  );
};

export default JoinTribeModal;
