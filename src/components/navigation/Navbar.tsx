import useSWR from 'swr';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useLocalStorage } from 'react-use';
import { useRouter } from 'next/router';

// api
import { connectWallet } from 'api/spn-wallet';
import { logout, refresh } from 'api/authentication';
import { notificationInstance } from 'api';

// context
import { useAuth } from 'context/user';
import { useWallet } from 'context/wallet';

// assets
import { Spn as SpnIcon } from 'assets';

// mui
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Chip,
  Fade,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Popover,
  Toolbar,
  Theme,
} from '@material-ui/core';
import { NotificationsNone } from '@material-ui/icons';

// components
import { WalletMenu } from 'components/wallet';
import { NotificationMenu } from 'components/notification';
import { Search } from 'components/search';

import type { UserNotificationResult } from 'tools/types/notification';

const fetcher = (url: string) =>
  notificationInstance.get(url).then((res) => res.data);

const useStyles = makeStyles<Theme>(() => ({
  paper: {
    height: 600,
    width: 366,
    filter: 'drop-shadow(0px 15px 40px rgba(56, 49, 67, 0.1))',
    borderRadius: 10,
    padding: '0 !important',
    position: 'absolute',
    top: '5px !important',
    left: 'auto !important',
    right: '110px !important',
  },
  notification: {
    width: 449,
    filter: 'drop-shadow(0px 20px 40px rgba(51, 51, 51, 0.1))',
    borderRadius: 10,
    padding: '20px 16px 16px',
    position: 'absolute',
    transform: 'translateX(-6px) translateY(-24px)',
  },
  list: {
    height: '100%',
    padding: '0 !important',
  },
  inputRoot: {
    borderRadius: 90,
    paddingBottom: '8px',
  },
  navBar: ({
    isDiscoveryPage,
  }: {
    asPath: string;
    isDiscoveryPage: boolean;
  }) => ({
    width: `${!isDiscoveryPage ? `calc(100% - 300px)` : 'calc(100% - 72px)'}`,
  }),
}));

const Navbar = () => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] =
    useState<null | HTMLElement>(null);
  const { query, asPath } = useRouter();
  const { data: notificationData } = useSWR<UserNotificationResult>(
    '/api/v3/notification/all',
    {
      fetcher,
    }
  );
  const isDiscoveryPage = Boolean(asPath.includes('discovery'));
  const classes = useStyles({ isDiscoveryPage });
  const [tokens] = useLocalStorage<{
    token: string;
    torus: string;
    refresh: string;
  }>('tokens');
  const { newUser, setNewUser, clearSession, me } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { wallet, setWallet, walletOpen, setWalletOpen } = useWallet();

  useEffect(() => {
    const walletWeb3 = async () => {
      if (tokens && Boolean(me) && Boolean(!wallet))
        try {
          const walletConnected = await connectWallet(
            tokens.torus,
            me.id,
            newUser
          );
          setWallet(walletConnected);
          setNewUser(false);
        } catch (error) {
          try {
            const { token } = await refresh(tokens.refresh, 'torus');
            const walletConnected = await connectWallet(token, me.id, newUser);
            setWallet(walletConnected);
            setNewUser(false);
          } catch (err) {
            // TODO add Sentry ERROR
            console.log('Wallet Error:', err);
          }
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

  if (!me) return null;

  const unreadNotifications = notificationData?.notifications?.filter(
    (notification) => {
      return notification.to.seen === false;
    }
  );

  return (
    <AppBar
      className={classes.navBar}
      color="inherit"
      elevation={0}
      position="fixed"
    >
      <Toolbar style={{ minHeight: 97 }}>
        <Search />
        <Box marginLeft="auto">
          <>
            <Chip
              disabled={!wallet}
              icon={<SpnIcon style={{ marginLeft: 10 }} />}
              label={!wallet ? '...' : Number(wallet?.balance) / 1e6 || 0}
              style={{
                backgroundColor: 'rgba(98, 0, 234, 0.05)',
                borderRadius: 90,
                color: '#6200EA',
                fontSize: 16,
                fontWeight: 'bold',
                height: 40,
                padding: 1,
              }}
              onClick={() => setWalletOpen(true)}
            />
            <IconButton
              aria-controls="notifications"
              aria-haspopup="true"
              aria-label="Notifications"
              edge="end"
              style={{ backgroundColor: '#E5E5E5', margin: '0 22px' }}
              onClick={(event) => setNotificationsAnchor(event.currentTarget)}
            >
              <Badge
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={unreadNotifications?.length || 0}
                color="error"
              >
                <NotificationsNone />
              </Badge>
            </IconButton>
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
        classes={{
          paper: classes.paper,
        }}
        id="wallet"
        open={Boolean(walletOpen)}
        onClose={() => setWalletOpen(false)}
      >
        <WalletMenu wallet={wallet} />
      </Popover>
      <Menu
        keepMounted
        PaperProps={{
          style: {
            maxHeight: 680,
          },
        }}
        anchorEl={notificationsAnchor}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        classes={{
          paper: classes.notification,
        }}
        getContentAnchorEl={null}
        id="notifications"
        open={Boolean(notificationsAnchor)}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setNotificationsAnchor(null)}
      >
        <NotificationMenu data={notificationData} />
      </Menu>
    </AppBar>
  );
};

export default Navbar;
