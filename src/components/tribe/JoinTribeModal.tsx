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

// styles
import { neutral } from 'styles/colors';

// mui
import { Avatar, Box, Typography } from '@material-ui/core';

interface Props {
  tribe: any;
  onClose: () => void;
}

const JoinTribeModal = ({
  onClose,
  tribe: { avatar, name, id, mainSquareId, memberBadge },
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
        await wallet.purchaseBadge(
          1,
          Number(memberBadge.blockchainId),
          me.id,
          memberBadge.id,
          Number(memberBadge.price),
          true
        );
        await joinTribe(id);
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
      PaperProps={{
        style: {
          maxWidth: '39rem',
        },
      }}
      cancelLabel="No, thank you"
      confirmLabel={joining ? 'Joining...' : 'Yes , I want to join'}
      isFetching={joining}
      onClose={onClose}
      onConfirm={handleJoinTribe}
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        paddingY={3}
        style={{
          gap: '2rem',
        }}
      >
        <Typography variant="h2">Welcome, Sapien!</Typography>
        <Avatar
          alt={name}
          src={avatar}
          style={{
            width: 64,
            height: 64,
            margin: '2.4rem 0',
          }}
        />
        <div
          style={{ color: neutral[500], lineHeight: 2, textAlign: 'center' }}
        >
          You are about to join <b style={{ color: neutral[700] }}>{name}</b>.
          <br />
          Do you want to proceed?
        </div>
      </Box>
    </Dialog>
  );
};

export default JoinTribeModal;
