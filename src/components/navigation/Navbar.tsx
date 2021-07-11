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

// assets
import { Spn as SpnIcon } from 'assets';

// mui
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Fade,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Popover,
  Toolbar,
} from '@material-ui/core';

// components
import { WalletMenu } from 'components/wallet';

const useStyles = makeStyles(() => ({
  paper: {
    height: 600,
    width: 366,
    filter: 'drop-shadow(0px 15px 40px rgba(56, 49, 67, 0.1))',
    borderRadius: 10,
    padding: '0 !important',
    position: 'absolute',
    transform: 'translateX(-6px) translateY(-24px)',
  },
  list: {
    height: '100%',
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
          enqueueSnackbar(error, {
            variant: 'error',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
          });
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
      enqueueSnackbar(err.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    }
  };

  return (
    <AppBar color="inherit" elevation={0} position="relative">
      <Toolbar style={{ minHeight: 97 }}>
        <Box marginLeft="auto">
          {me ? (
            <>
              <Chip
                icon={<SpnIcon style={{ marginLeft: 10 }} />}
                label={Number(wallet?.balance || 0)}
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
      <Popover
        TransitionComponent={Fade}
        anchorEl={balanceAnchor}
        classes={{
          paper: classes.paper,
        }}
        id="wallet"
        open={Boolean(balanceAnchor)}
        onClose={() => setBalanceAnchor(null)}
      >
        <WalletMenu wallet={wallet} />
      </Popover>
    </AppBar>
  );
};

export default Navbar;
