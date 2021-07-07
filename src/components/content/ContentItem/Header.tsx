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
  ArrowRight as ArrowIcon,
  Delete as DeleteIcon,
  Groups as GroupIcon,
  MoreHoriz as MoreIcon,
  Public as GlobeIcon,
} from '@material-ui/icons';

// styles
import { primary } from 'styles/colors';

// types
import type { Content } from 'tools/types/content';

// utils
import { formatTimestampToRelative } from 'utils/date';

const useStyles = makeStyles(() => ({
  chipRoot: {
    color: primary[800],
    backgroundColor: primary[100],
    padding: '0.2rem 0.8rem',
    borderRadius: '9rem',
  },
  avatar: {
    width: '3.2rem',
    height: '3.2rem',
  },
}));

interface Props {
  content: Content;
  onDelete: () => void;
}

const Header = ({ content, onDelete }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const classes = useStyles();

  const { canDelete, createdAt, group, tribe, owner } = content;

  return (
    <>
      <Box alignItems="center" display="flex" justifyContent="space-between">
        <Box
          alignItems="center"
          display="flex"
          justifyContent="center"
          style={{ gap: 8 }}
        >
          <Avatar
            alt="Tribe Image"
            className={classes.avatar}
            src={owner.avatar}
          >
            {owner.displayName?.[0].toUpperCase()}
          </Avatar>
          <Link href="/">
            <a>
              <Typography>
                {owner.displayName} @{owner.userName}
              </Typography>
            </a>
          </Link>
          <ArrowIcon color="action" />
          <GlobeIcon color="action" style={{ fontSize: '1.4rem' }} />
          <Typography>{group.name}</Typography>
          <Link href="/">
            <a>
              <Chip
                classes={{
                  root: classes.chipRoot,
                }}
                color="primary"
                icon={<GroupIcon color="primary" />}
                label={tribe.name}
                size="small"
              />
            </a>
          </Link>
        </Box>

        <Box alignItems="center" display="flex" justifyContent="flex-end">
          <Typography color="textSecondary" component="span" variant="h6">
            {formatTimestampToRelative(createdAt)}
          </Typography>
          {canDelete && (
            <IconButton
              aria-controls="post-menu"
              aria-haspopup="true"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              <MoreIcon color="action" />
            </IconButton>
          )}
        </Box>
      </Box>

      <Menu
        keepMounted
        MenuListProps={{
          'aria-labelledby': 'Post Option Buttons',
        }}
        anchorEl={anchorEl}
        id="post-menu"
        open={Boolean(anchorEl)}
        style={{ marginLeft: '0.5rem' }}
        onClick={() => setAnchorEl(null)}
        onClose={() => setAnchorEl(null)}
      >
        {canDelete && (
          <MenuItem onClick={onDelete}>
            <IconButton>
              <DeleteIcon color="error" />
            </IconButton>
            <Typography color="error">Delete</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default Header;
