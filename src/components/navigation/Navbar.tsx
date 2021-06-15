import { useState } from 'react';

// next
import Link from 'next/link';

// context
import { useAuth } from 'context/user';

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
} from '@material-ui/core';

// components
import { MyBalance, MyTransactions } from 'components/balance';

const Navbar = () => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [balanceAnchor, setBalanceAnchor] = useState<null | HTMLElement>(null);
  const { me, logout } = useAuth();

  return (
    <AppBar color="inherit" elevation={0} position="relative">
      <Toolbar variant="dense">
        <Box marginLeft="auto">
          {me ? (
            <>
              <Chip
                icon={<SpnIcon />}
                label="3197"
                sx={{
                  bgcolor: 'rgba(98, 0, 234, 0.05)',
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
                  {me.firstName[0]}
                  {me.lastName?.[0]}
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
        id="user-profile"
        open={Boolean(menuAnchor)}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem
          onClick={() => {
            setMenuAnchor(null);
            logout({ email: me.email });
          }}
        >
          Logout
        </MenuItem>
      </Menu>

      <Menu
        keepMounted
        anchorEl={balanceAnchor}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        id="my-balance"
        open={Boolean(balanceAnchor)}
        sx={{
          '.MuiPaper-root': {
            width: 350,
            boxShadow: '0px 20px 40px rgba(51, 51, 51, 0.1)',
            borderRadius: 2,
            padding: '0 !important',
          },
          '.MuiList-root': {
            padding: '0 !important',
          },
        }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setBalanceAnchor(null)}
      >
        <div>
          <MyBalance />
          <Divider sx={{ borderColor: '#EDEEF0 !important', borderWidth: 1 }} />
          <MyTransactions />
        </div>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
