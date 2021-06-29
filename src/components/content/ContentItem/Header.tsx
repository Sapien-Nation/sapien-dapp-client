import Link from 'next/link';
import { useState } from 'react';

// mui
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  ArrowRight,
  MoreHoriz,
  Public as Globe,
  Groups,
} from '@material-ui/icons';

// types
import type { ContentOwner } from 'tools/types/content';
import type { ISOString } from 'tools/types/common';

// styles
import { primary, purpleHighLight } from 'styles/colors';

// utils
import { formatTimestampToRelative } from 'utils/date';

const useStyles = makeStyles(() => ({
  chipRoot: {
    color: primary,
    backgroundColor: purpleHighLight,
  },
}));

interface Props {
  createdAt: ISOString;
  groupName: string;
  owner: ContentOwner;
  tribeName: string;
}

const Header = ({ createdAt, groupName, owner, tribeName }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box alignItems="center" display="flex" justifyContent="space-between">
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        style={{ gap: 8 }}
      >
        <Avatar alt="Tribe Image" src={owner.avatar}>
          {owner.displayName?.[0].toUpperCase()}
        </Avatar>
        <Link href="/">
          <a>
            <Typography>
              {owner.displayName} @{owner.userName}
            </Typography>
          </a>
        </Link>
        <ArrowRight />
        <Globe fontSize="small" />
        <Typography>{groupName}</Typography>
        <Chip
          classes={{
            root: classes.chipRoot,
          }}
          color="primary"
          icon={<Groups color="primary" />}
          label={tribeName}
          size="small"
        />
      </Box>

      <div>
        {formatTimestampToRelative(createdAt)}
        <IconButton
          aria-controls="post-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreHoriz />
        </IconButton>
        <Menu
          keepMounted
          MenuListProps={{
            'aria-labelledby': 'Post Option Buttons',
          }}
          anchorEl={anchorEl}
          id="post-menu"
          open={Boolean(anchorEl)}
          style={{ marginLeft: '0.5rem' }}
          onClose={handleClose}
        >
          <MenuItem>Delete</MenuItem>
        </Menu>
      </div>
    </Box>
  );
};

export default Header;
