import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useFormContext } from 'react-hook-form';

// styles
import { primary, neutral } from 'styles/colors';

// mui
import { Avatar, Box, Button, IconButton, Typography } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

// context
import { useAuth } from 'context/user';
import { useWallet } from 'context/wallet';

// emums
import { MyBadgesSteps } from '../WalletEnums';

const Confirmation = () => {
  const { watch } = useFormContext();
  const { enqueueSnackbar } = useSnackbar();
  const { me } = useAuth();
  const { wallet, walletOpen, dispatchWalletState, globalWalletState } =
    useWallet();
  const [loadingResponse, setLoadingResponse] = useState<boolean>(false);
  const { myBadgesCurrentBadge, myBadgesCurrentReceiver } = globalWalletState;
  const watchBadgesAmount = watch('badgesAmount');
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="space-between"
    >
      <Box display="flex" flexDirection="column" paddingX={2.4} paddingY={2}>
        <div style={{ display: 'flex' }}>
          <IconButton
            aria-label="go back"
            style={{
              padding: 0,
              marginRight: 6,
              marginBottom: 10,
            }}
            onClick={() => {
              // @ts-ignore
              if (walletOpen?.author?.userName) {
                dispatchWalletState({
                  type: 'update',
                  payload: {
                    myBadgesTransition: 'back',
                    showTabsMenu: true,
                    showAuthorToBadge: true,
                    myBadgesStep: MyBadgesSteps.Badges,
                  },
                });
              } else {
                dispatchWalletState({
                  type: 'update',
                  payload: {
                    myBadgesTransition: 'back',
                    showTabsMenu: false,
                    myBadgesStep: MyBadgesSteps.Receivers,
                  },
                });
              }
            }}
          >
            <ArrowBackIcon fontSize="small" style={{ color: neutral[700] }} />
          </IconButton>
          <Typography variant="button">Receiver</Typography>
        </div>
        <Box
          alignItems="center"
          bgcolor={neutral[50]}
          borderRadius={10}
          display="flex"
          marginY={1}
          padding={1.8}
          style={{
            cursor: 'pointer',
          }}
        >
          <Avatar
            alt=""
            src="/fixtures/normal/slowpoke.jpg"
            style={{
              width: 40,
              height: 40,
            }}
          />
          <Box display="flex" flexDirection="column" marginLeft={1}>
            <Typography variant="button">
              {myBadgesCurrentReceiver.displayName}
            </Typography>
            <Typography variant="overline">
              @{myBadgesCurrentReceiver.userName}
            </Typography>
          </Box>
        </Box>
        <Typography
          style={{
            color: neutral[500],
            textTransform: 'uppercase',
            fontWeight: 700,
            lineHeight: 1,
            margin: '1rem 0',
          }}
          variant="overline"
        >
          Will receive
        </Typography>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          style={{
            gap: 10,
          }}
        >
          <Avatar
            alt=""
            imgProps={{
              style: {
                borderRadius: 40,
                padding: 3,
              },
            }}
            src="/fixtures/normal/slowpoke.jpg"
            style={{
              width: 64,
              height: 64,
              border: `2px solid ${primary[800]}`,
            }}
          />
          <Typography variant="subtitle1">
            {myBadgesCurrentBadge.name} (x{watchBadgesAmount})
          </Typography>
          <Typography
            style={{ textAlign: 'center', color: neutral[500] }}
            variant="h6"
          >
            Velit sed turpis tellus curabitur sit habitant sit eget lorem ipsum.
          </Typography>
        </Box>
      </Box>
      <Box
        borderTop="1px solid #EDEEF0"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        padding={2.4}
      >
        <Button
          fullWidth
          color="primary"
          disabled={loadingResponse}
          variant="contained"
          onClick={async () => {
            setLoadingResponse(true);
            try {
              await wallet.transferBadge(
                me.id,
                myBadgesCurrentReceiver.id,
                myBadgesCurrentReceiver.publicAddress,
                watchBadgesAmount,
                myBadgesCurrentBadge.id,
                myBadgesCurrentBadge.blockchainId,
                myBadgesCurrentBadge.userIsAdmin,
                myBadgesCurrentBadge.contentId
              );
              enqueueSnackbar('Success!', {
                variant: 'success',
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right',
                },
              });
              setLoadingResponse(false);
              dispatchWalletState({
                type: 'update',
                payload: {
                  showTabsMenu: true,
                  myBadgesStep: MyBadgesSteps.Badges,
                },
              });
            } catch (error) {
              enqueueSnackbar('Something went wrong.', {
                variant: 'error',
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right',
                },
              });
            }
          }}
        >
          {loadingResponse ? 'Processing...' : 'Gift Token'}
        </Button>
      </Box>
    </Box>
  );
};

export default Confirmation;
