import { useState } from 'react';

// next
import Image from 'next/image';
import Link from 'next/link';

// context
import { useAuth } from 'context/user';

// mui
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@material-ui/core';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { me, logout } = useAuth();

  return (
    <AppBar color="inherit" elevation={0} position="relative">
      <Toolbar variant="dense">
        <Box marginLeft="auto">
          {me ? (
            <IconButton
              aria-controls="user-profile"
              aria-haspopup="true"
              aria-label={me.username}
              color="inherit"
              edge="end"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              <Avatar alt={me.username}>
                <Image
                  alt={me.username}
                  height={40}
                  src={me.avatar}
                  width={40}
                />
              </Avatar>
            </IconButton>
          ) : (
            <Link passHref href="/auth#login">
              <Button color="primary" variant="contained">
                Login
              </Button>
            </Link>
          )}
        </Box>
      </Toolbar>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id="user-profile"
        open={Boolean(anchorEl)}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            logout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
