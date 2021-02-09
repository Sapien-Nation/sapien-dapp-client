import { useState } from 'react';

// next
import Image from 'next/image';

// mui
import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar
} from '@material-ui/core';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <AppBar color="inherit" elevation={0} position="relative">
      <Toolbar variant="dense">
        <IconButton
          aria-controls="user profile"
          aria-haspopup="true"
          aria-label="account of current user"
          color="inherit"
          edge="end"
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <Avatar>
            <Image height={40} src="/fixtures/normal/slowpoke.jpg" width={40} />
          </Avatar>
        </IconButton>
      </Toolbar>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id="user profile"
        open={Boolean(anchorEl)}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => {}}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
