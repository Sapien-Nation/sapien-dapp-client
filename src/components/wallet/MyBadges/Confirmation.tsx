import { useFormContext } from 'react-hook-form';

// styles
import { primary, neutral } from 'styles/colors';

// mui
import { Avatar, Box, Button, IconButton, Typography } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

// types
import type { Badge as BadgeType } from 'tools/types/wallet/badge';

// emums
import { MyBadgesSteps } from '../WalletEnums';

interface Props {
  currentBadge: BadgeType;
  currentReceiver: any;
  setShowTabsMenu: (showTab: boolean) => void;
  setStep: (step: MyBadgesSteps) => void;
  setTransition: (transition: string) => void;
}

const Confirmation = ({
  currentBadge,
  currentReceiver,
  setShowTabsMenu,
  setStep,
  setTransition,
}: Props) => {
  const { watch } = useFormContext();
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
              setTransition('back');
              setShowTabsMenu(false);
              setStep(MyBadgesSteps.Receivers);
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
            <Typography variant="button">{currentReceiver.name}</Typography>
            <Typography variant="overline">@marryrob</Typography>
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
            {currentBadge.name} (x{watchBadgesAmount})
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
          type="submit"
          variant="contained"
          onClick={() => {
            setShowTabsMenu(true);
          }}
        >
          Gift Token
        </Button>
      </Box>
    </Box>
  );
};

export default Confirmation;
