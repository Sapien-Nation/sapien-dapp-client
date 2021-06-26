import { useEffect, useState } from 'react';

// assets
import { Spn as SpnIcon } from 'assets';

// types
import type { Wallet as WalletType } from 'tools/types/wallet';

// mui
import { Box, Button, Chip, Typography } from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

// styles
import { gray2, darkGrey } from 'styles/colors';

// utils
import { formatSpn, formatEthToUsd } from 'utils/spn';

// components
import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';

const MyBalance = ({ wallet }: { wallet: WalletType }) => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [usd, setUsd] = useState('$0');

  useEffect(() => {
    const getAmount = async () => {
      const amount = await formatEthToUsd(Number(wallet?.balance));
      setUsd(amount);
    };
    getAmount();
  }, [wallet]);

  return (
    <>
      <Box padding={2}>
        <Box alignItems="center" display="flex" gap={1} mb={1}>
          <SpnIcon size={22} />
          <Typography variant="h2">
            {formatSpn(Number(wallet?.balance))}
          </Typography>
          <Chip
            label={usd}
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
            onClick={() => setShowWithdrawModal(true)}
          >
            Withdraw
          </Button>
        </Box>
      </Box>
      {showDepositModal && (
        <DepositModal onClose={() => setShowDepositModal(false)} />
      )}
      {showWithdrawModal && (
        <WithdrawModal onClose={() => setShowWithdrawModal(false)} />
      )}
    </>
  );
};

export default MyBalance;
