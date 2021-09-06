import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { mutate } from 'swr';
import { useRouter } from 'next/router';

// api
import { joinTribe } from 'api/tribes';

// components
import { Dialog } from 'components/common';

// context
import { useAuth } from 'context/user';
import { useWallet } from 'context/wallet';

// mui
import { Typography } from '@material-ui/core';

interface Props {
  tribe: any;
  onClose: () => void;
}

const JoinTribeModal = ({
  onClose,
  tribe: { name, id, mainSquareId, memberBadge },
}: Props) => {
  const [joining, setJoining] = useState<boolean>(false);
  const { me } = useAuth();
  const { wallet } = useWallet();
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleJoinTribe = async () => {
    setJoining(true);
    try {
      if (Number(memberBadge.price) === 0) {
        await joinTribe(id);
        await wallet.purchaseBadge(
          1,
          memberBadge.blockchainId,
          me.id,
          memberBadge.id,
          memberBadge.price,
          true
        );
        setJoining(false);
        onClose();
        mutate('/api/v3/tribes/discovery', (tribes: Array<any>) =>
          tribes.filter((tribe) => id !== tribe.id)
        );
        push(`/client/${mainSquareId}`);
        enqueueSnackbar(`You've got a member badge!`, {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        });
      }
    } catch (err) {
      setJoining(false);
      enqueueSnackbar(err.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
    }
  };
  return (
    <Dialog
      open
      cancelLabel="No, thank you"
      confirmLabel={joining ? 'Joining...' : 'Yes , I want to join'}
      isFetching={joining}
      maxWidth="xs"
      title={
        <>
          <Typography variant="h2">Welcome, Sapien!</Typography>
        </>
      }
      onClose={onClose}
      onConfirm={handleJoinTribe}
    >
      You are about to join {name}. Do you want to proceed?
    </Dialog>
  );
};

export default JoinTribeModal;
