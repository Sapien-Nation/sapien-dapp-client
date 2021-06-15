import { useState } from 'react';

// assets
import { Spn as SpnIcon } from 'assets';

// mui
import { Box, Button, Chip, Typography } from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

// styles
import { gray2, darkGrey } from 'styles/colors';

// components
import DepositModal from './DepositModal';

const MyBalance = () => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  return (
    <>
      <Box padding={2}>
        <Box alignItems="center" display="flex" gap={1} mb={1}>
          <SpnIcon size={22} />
          <Typography variant="h2">3,197</Typography>
          <Chip
            label="$13,197"
            sx={{
              bgcolor: gray2,
              color: darkGrey,
            }}
          />
        </Box>
        <Box display="flex" gap={1}>
          <Button
            color="secondary"
            startIcon={<ArrowUpward />}
            sx={{
              color: '#000',
              minHeight: 34,
              maxHeight: 34,
              px: 1,
              border: '2px solid #EDEEF0',
              '.MuiSvgIcon-root': {
                color: '#C4C5CC',
              },
              '&:hover': {
                border: '2px solid #EDEEF0',
              },
            }}
            variant="outlined"
            onClick={() => setShowDepositModal(true)}
          >
            Deposit
          </Button>
          <Button
            color="secondary"
            startIcon={<ArrowDownward />}
            sx={{
              color: '#000',
              minHeight: 34,
              maxHeight: 34,
              px: 1,
              border: '2px solid #EDEEF0',
              '.MuiSvgIcon-root': {
                color: '#C4C5CC',
              },
              '&:hover': {
                border: '2px solid #EDEEF0',
              },
            }}
            variant="outlined"
          >
            Withdraw
          </Button>
        </Box>
      </Box>
      {showDepositModal && (
        <DepositModal onClose={() => setShowDepositModal(false)} />
      )}
    </>
  );
};

export default MyBalance;
