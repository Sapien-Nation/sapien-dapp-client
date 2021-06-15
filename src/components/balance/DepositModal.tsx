import { useState } from 'react';

// mui
import { Box, Button, Typography } from '@material-ui/core';

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

const DepositModal = ({ onClose }: Props) => {
  const [step, setStep] = useState(Step.DepositMetamask);

  const handleSteps = () => {
    switch (step) {
      case Step.DepositMetamask:
        return setStep(Step.DepositSuccess);
      case Step.DepositSuccess:
        return onClose();
      default:
        return null;
    }
  };

  const renderFields = () => {
    switch (step) {
      case Step.DepositMetamask: {
        return (
          <>
            <Typography sx={{ marginY: 2 }} variant="h2">
              Deposit to balance
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod
              magna tempor morbi condimentum.
            </Typography>
            <Button
              fullWidth
              sx={{
                marginY: 4,
                bgcolor: black,
                '.MuiButton-label': {
                  gap: 1,
                },
              }}
              variant="contained"
              onClick={() => handleSteps()}
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
              sx={{ marginTop: 4, marginBottom: 1.5, lineHeight: 1.6 }}
              variant="h2"
            >
              You have successfully deposited 1,995.00 SPN to your balance
            </Typography>
            <Typography sx={{ color: darkGrey }} variant="body2">
              The funds will appear in your balance shortly
            </Typography>
            <Button
              sx={{
                marginY: 6,
              }}
              variant="contained"
              onClick={() => handleSteps()}
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
      sx={{ '.MuiPaper-root': { maxWidth: 510 } }}
      onClose={onClose}
    >
      {renderFields()}
    </Dialog>
  );
};

export default DepositModal;
