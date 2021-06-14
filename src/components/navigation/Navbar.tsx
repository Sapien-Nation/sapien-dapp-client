import { useState } from 'react';

// next
import Link from 'next/link';

// context
import { useAuth } from 'context/user';

// mui
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@material-ui/core';

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
                label="3197"
                sx={{
                  bgcolor: 'rgba(98, 0, 234, 0.05)',
                  borderRadius: 90,
                  color: '#6200EA',
                  fontSize: 16,
                  fontWeight: 'bold',
                  height: 40,
                  padding: 10,
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
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setBalanceAnchor(null)}
      >
        <MenuItem>Balance content</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
