import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useLocalStorage } from 'react-use';
import Link from 'next/link';
import { useRouter } from 'next/router';

// api
import { connectWallet } from 'api/spn-wallet';
import { logout } from 'api/authentication';

// context
import { useAuth } from 'context/user';
import { useWallet } from 'context/wallet';

// utils
import { formatSpn } from 'utils/spn';

// assets
import { Spn as SpnIcon } from 'assets';

// mui
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  makeStyles,
} from '@material-ui/core';

// components
import { MyBalance, MyTransactions } from 'components/balance';

const useStyles = makeStyles(() => ({
  paper: {
    width: 350,
    boxShadow: '0px 20px 40px rgba(51, 51, 51, 0.1)',
    borderRadius: 2,
    padding: '0 !important',
  },
  list: {
    padding: '0 !important',
  },
}));

const Navbar = () => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [balanceAnchor, setBalanceAnchor] = useState<null | HTMLElement>(null);
  const classes = useStyles();
  const { query } = useRouter();
  const [tokens] = useLocalStorage<{
    token: string;
    torus: string;
  }>('tokens');
  const { clearSession, me } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { wallet, setWallet } = useWallet();

  useEffect(() => {
    const walletWeb3 = async () => {
      if (tokens && Boolean(me) && query?.squareID && Boolean(!wallet))
        try {
          const walletConnected = await connectWallet(tokens.torus, me.id);
          setWallet(walletConnected);
        } catch (error) {
          enqueueSnackbar(error);
        }
    };
    walletWeb3();
  }, [me, query]);

  const handleLogout = async () => {
    try {
      setMenuAnchor(null);
      await logout({ email: me.email });

      clearSession();
    } catch (err) {
      enqueueSnackbar(err.message);
    }
  };

  return (
    <AppBar color="inherit" elevation={0} position="relative">
      <Toolbar variant="dense">
        <Box marginLeft="auto">
          {me ? (
            <>
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
                onClick={(event) => setBalanceAnchor(event.currentTarget)}
              />
              <IconButton
                aria-controls="user-profile"
                aria-haspopup="true"
                aria-label={me.username}
                color="inherit"
                edge="end"
                onClick={(event) => setMenuAnchor(event.currentTarget)}
              >
                <Avatar alt={me.username}>
                  {me.firstName?.[0]?.toUpperCase()}
                </Avatar>
              </IconButton>
            </>
          ) : (
            <Link passHref href="/login">
              <Button color="primary" variant="contained">
                Login
              </Button>
            </Link>
          )}
        </Box>
      </Toolbar>
      <Menu
        keepMounted
        anchorEl={menuAnchor}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        getContentAnchorEl={null}
        id="user-profile"
        open={Boolean(menuAnchor)}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      <Menu
        keepMounted
        anchorEl={balanceAnchor}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        classes={{
          paper: classes.paper,
          list: classes.list,
        }}
        getContentAnchorEl={null}
        id="my-balance"
        open={Boolean(balanceAnchor)}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setBalanceAnchor(null)}
      >
        <div>
          <MyBalance wallet={wallet} />
          <Divider
            style={{ borderColor: '#EDEEF0 !important', borderWidth: 1 }}
          />
          <MyTransactions />
        </div>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
