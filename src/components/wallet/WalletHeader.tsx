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
  ArrowBack as ArrowBackIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  History as HistoryIcon,
} from '@material-ui/icons';

// styles
import { neutral } from 'styles/colors';

// utils
import { formatSpn } from 'utils/spn';

// emums
import View from './ViewEnum';

interface Props {
  wallet: WalletType;
  setView: (view: View) => void;
  currentView: View;
}

const WalletHeader = ({ wallet, setView, currentView }: Props) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const renderWalletActions = () => {
    switch (currentView) {
      case View.Deposit:
        return (
          <>
            <IconButton
              aria-label="go back"
              style={{
                padding: 0,
                marginRight: 6,
              }}
              onClick={() => setView(View.Tokens)}
            >
              <ArrowBackIcon style={{ color: neutral[700] }} />
            </IconButton>
            <Typography variant="h2">Deposit</Typography>
          </>
        );
      case View.Withdraw:
        return (
          <>
            <IconButton
              aria-label="go back"
              style={{
                padding: 0,
                marginRight: 6,
              }}
              onClick={() => setView(View.Tokens)}
            >
              <ArrowBackIcon style={{ color: neutral[700] }} />
            </IconButton>
            <Typography variant="h2">Withdraw</Typography>
          </>
        );
      case View.Transactions:
        return (
          <>
            <IconButton
              aria-label="go back"
              style={{
                padding: 0,
                marginRight: 6,
              }}
              onClick={() => setView(View.Tokens)}
            >
              <ArrowBackIcon style={{ color: neutral[700] }} />
            </IconButton>
            <Typography variant="h2">Transactions</Typography>
          </>
        );
      default:
        return (
          <>
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
              MenuListProps={{
                style: {
                  padding: 0,
                },
              }}
              PaperProps={{
                style: {
                  borderRadius: 10,
                  boxShadow: '0px 15px 30px rgba(56, 49, 67, 0.08)',
                },
              }}
              anchorEl={menuAnchor}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              getContentAnchorEl={null}
              id="wallet-actions"
              open={Boolean(menuAnchor)}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              onClose={() => setMenuAnchor(null)}
            >
              <MenuItem
                style={{
                  fontSize: 14,
                  color: neutral[700],
                  gap: 10,
                  margin: 5,
                  borderRadius: 5,
                }}
                onClick={() => {
                  setView(View.Deposit);
                  setMenuAnchor(null);
                }}
              >
                <ArrowUpwardIcon
                  fontSize="small"
                  style={{
                    color: neutral[400],
                  }}
                />{' '}
                Deposit
              </MenuItem>
              <MenuItem
                style={{
                  fontSize: 14,
                  color: neutral[700],
                  gap: 10,
                  margin: 5,
                  borderRadius: 5,
                }}
                onClick={() => {
                  setView(View.Withdraw);
                  setMenuAnchor(null);
                }}
              >
                <ArrowDownwardIcon
                  fontSize="small"
                  style={{
                    color: neutral[400],
                  }}
                />{' '}
                Withdraw
              </MenuItem>
              <MenuItem
                style={{
                  fontSize: 14,
                  color: neutral[700],
                  gap: 10,
                  margin: 5,
                  borderRadius: 5,
                }}
                onClick={() => {
                  setView(View.Transactions);
                  setMenuAnchor(null);
                }}
              >
                <HistoryIcon
                  fontSize="small"
                  style={{
                    color: neutral[400],
                  }}
                />{' '}
                Transaction History
              </MenuItem>
            </Menu>
          </>
        );
    }
  };
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
            {renderWalletActions()}
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
    </>
  );
};

export default WalletHeader;
