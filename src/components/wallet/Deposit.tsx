import { useState } from 'react';

// mui
import { Box, Button, makeStyles, Typography } from '@material-ui/core';

// styles
import { neutral } from 'styles/colors';

// assets
import { MetamaskLogo, DepositSuccess } from 'assets';

// emums
import { View } from './WalletEnums';

enum Step {
  DepositMetamask = 1,
  DepositSuccess,
}

const useStyles = makeStyles(() => ({
  buttonLabel: {
    gap: 10,
  },
  paper: { maxWidth: 510 },
}));

const Deposit = ({ setView }: { setView: (view: View) => void }) => {
  const [step, setStep] = useState(Step.DepositMetamask);

  const classes = useStyles();

  const renderFields = () => {
    switch (step) {
      case Step.DepositMetamask: {
        return (
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="space-between"
          >
            <div style={{ padding: 24 }}>
              <Typography style={{ marginBottom: 30 }} variant="body2">
                To deposit SPN tokens to the platform, install Metamask and
                complete the transaction.
              </Typography>
              <Typography variant="body2">
                The SPN tokens will be deposited to your Sapien Wallet
                automatically.
              </Typography>
            </div>
            <div style={{ padding: 24, borderTop: '1px solid #EDEEF0' }}>
              <Button
                fullWidth
                classes={{
                  label: classes.buttonLabel,
                }}
                style={{
                  backgroundColor: neutral[700],
                  color: 'white',
                }}
                variant="contained"
                onClick={() => setStep(Step.DepositSuccess)}
              >
                <MetamaskLogo /> Deposit with Metamask
              </Button>
            </div>
          </Box>
        );
      }
      case Step.DepositSuccess: {
        return (
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="space-between"
          >
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              height="100%"
              justifyContent="center"
              paddingX={3.5}
              textAlign="center"
            >
              <DepositSuccess />
              <Typography
                style={{ marginTop: 40, marginBottom: 15, lineHeight: 1.6 }}
                variant="body2"
              >
                You have successfully deposited 1,995.00 SPN to your balance
              </Typography>
              <Typography style={{ color: neutral[500] }} variant="h6">
                The funds will appear in your balance shortly
              </Typography>
            </Box>
            <div style={{ padding: 24, borderTop: '1px solid #EDEEF0' }}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => setView(View.Tabs)}
              >
                Thank you!
              </Button>
            </div>
          </Box>
        );
      }
    }
  };

  return <>{renderFields()}</>;
};

export default Deposit;
