import { useState } from 'react';

// mui
import { Box, Button, Typography, makeStyles } from '@material-ui/core';

//components
import { Dialog } from 'components/common';

// styles
import { black, darkGrey } from 'styles/colors';

// assets
import { MetamaskLogo, DepositSuccess } from 'assets';

enum Step {
  DepositMetamask = 1,
  DepositSuccess,
}

interface Props {
  onClose: () => void;
}

const useStyles = makeStyles(() => ({
  buttonLabel: {
    gap: 10,
  },
  paper: { maxWidth: 510 },
}));

const DepositModal = ({ onClose }: Props) => {
  const [step, setStep] = useState(Step.DepositMetamask);

  const classes = useStyles();

  const renderFields = () => {
    switch (step) {
      case Step.DepositMetamask: {
        return (
          <>
            <Typography
              style={{ marginTop: 40, marginBottom: 20 }}
              variant="h2"
            >
              Deposit to balance
            </Typography>
            <Typography style={{ marginBottom: 30 }} variant="body2">
              To deposit SPN tokens to the platform, install Metamask and
              complete the transaction.
            </Typography>
            <Typography variant="body2">
              The SPN tokens will be deposited to your Sapien Wallet
              automatically.
            </Typography>
            <Button
              fullWidth
              classes={{
                label: classes.buttonLabel,
              }}
              style={{
                margin: '4rem 0',
                backgroundColor: black,
                color: 'white',
              }}
              variant="contained"
              onClick={() => setStep(Step.DepositSuccess)}
            >
              <MetamaskLogo /> Deposit with Metamask
            </Button>
          </>
        );
      }
      case Step.DepositSuccess: {
        return (
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            marginTop={6}
            textAlign="center"
          >
            <DepositSuccess />
            <Typography
              style={{ marginTop: 40, marginBottom: 15, lineHeight: 1.6 }}
              variant="h2"
            >
              You have successfully deposited 1,995.00 SPN to your balance
            </Typography>
            <Typography style={{ color: darkGrey }} variant="body2">
              The funds will appear in your balance shortly
            </Typography>
            <Button
              color="primary"
              style={{
                margin: '6rem 0',
              }}
              variant="contained"
              onClick={() => onClose()}
            >
              Back to My Balance
            </Button>
          </Box>
        );
      }
    }
  };

  return (
    <Dialog
      open
      actions={null}
      classes={{ paper: classes.paper }}
      onClose={onClose}
    >
      {renderFields()}
    </Dialog>
  );
};

export default DepositModal;
