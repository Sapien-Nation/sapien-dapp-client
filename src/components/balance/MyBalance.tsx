import { useEffect, useState } from 'react';

// assets
import { Spn as SpnIcon } from 'assets';

// types
import type { Wallet as WalletType } from 'tools/types/wallet';

// mui
import { Box, Button, Chip, Typography, makeStyles } from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

// styles
import { gray2, darkGrey } from 'styles/colors';

// utils
import { formatSpn, formatEthToUsd } from 'utils/spn';

// components
import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';

const useStyles = makeStyles(() => ({
  actionButton: {
    color: '#000',
    minHeight: 34,
    maxHeight: 34,
    px: 1,
    border: '2px solid #EDEEF0',
    '&:hover': {
      border: '2px solid #EDEEF0',
    },
  },
  svgIcon: {
    color: '#C4C5CC',
  },
}));

const MyBalance = ({ wallet }: { wallet: WalletType }) => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [usd, setUsd] = useState('$0');
  const classes = useStyles();
  useEffect(() => {
    const getAmount = async () => {
      const amount = await formatEthToUsd(Number(wallet?.balance || 0));
      setUsd(amount);
    };
    getAmount();
  }, [wallet]);

  return (
    <>
      <Box padding={2}>
        <Box
          alignItems="center"
          display="flex"
          mb={2}
          style={{
            gap: 10,
          }}
        >
          <SpnIcon size={22} />
          <Typography variant="h2">
            {formatSpn(Number(wallet?.balance || 0))}
          </Typography>
          <Chip
            label={usd}
            style={{
              backgroundColor: gray2,
              color: darkGrey,
            }}
          />
        </Box>
        <Box display="flex" style={{ gap: 10 }}>
          <Button
            classes={{
              root: classes.actionButton,
            }}
            color="secondary"
            startIcon={
              <ArrowUpward
                classes={{
                  root: classes.svgIcon,
                }}
              />
            }
            variant="outlined"
            onClick={() => setShowDepositModal(true)}
          >
            Deposit
          </Button>
          <Button
            classes={{
              root: classes.actionButton,
            }}
            color="secondary"
            startIcon={
              <ArrowDownward
                classes={{
                  root: classes.svgIcon,
                }}
              />
            }
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
