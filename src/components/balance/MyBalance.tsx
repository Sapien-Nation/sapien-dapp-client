import { useState } from 'react';

// assets
import { Spn as SpnIcon } from 'assets';

// types
import type { Wallet as WalletType } from 'tools/types/wallet';

// mui
import {
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  History as HistoryIcon,
} from '@material-ui/icons';

// utils
import { formatSpn } from 'utils/spn';

// components
import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';

const MyBalance = ({ wallet }: { wallet: WalletType }) => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  return (
    <>
      <Box padding={2.4}>
        <Box
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          style={{
            gap: 10,
          }}
        >
          <Box alignItems="center" display="flex">
            <Typography variant="h2">Wallet</Typography>
            <IconButton
              aria-label="toggle wallet menu"
              style={{
                padding: 1,
                marginLeft: 6,
              }}
              onClick={(event) => setMenuAnchor(event.currentTarget)}
            >
              {menuAnchor ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            <Menu
              keepMounted
              PaperProps={{
                style: {
                  boxShadow: '0px 15px 30px rgba(56, 49, 67, 0.08)',
                },
              }}
              anchorEl={menuAnchor}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              getContentAnchorEl={null}
              id="user-profile"
              open={Boolean(menuAnchor)}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              onClose={() => setMenuAnchor(null)}
            >
              <MenuItem>
                <ArrowUpwardIcon fontSize="small" /> Deposit
              </MenuItem>
              <MenuItem>
                <ArrowDownwardIcon fontSize="small" /> Widthdraw
              </MenuItem>
              <MenuItem>
                <HistoryIcon fontSize="small" /> Transaction History
              </MenuItem>
            </Menu>
          </Box>
          <Chip
            icon={<SpnIcon style={{ marginLeft: 10 }} />}
            label={formatSpn(Number(wallet?.balance || 0))}
            style={{
              backgroundColor: 'rgba(98, 0, 234, 0.05)',
              borderRadius: 90,
              color: '#6200EA',
              fontSize: 16,
              fontWeight: 'bold',
              height: 40,
              padding: 1,
            }}
          />
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
