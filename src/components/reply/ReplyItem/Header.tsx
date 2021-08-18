import Link from 'next/link';
import { useState } from 'react';

// mui
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  MoreHoriz as MoreIcon,
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
    fontSize: '1.2rem',
    height: '100%',
    fontWeight: 'bold',
  },
  avatar: {
    width: '3.2rem',
    height: '3.2rem',
  },
}));

interface Props {
  reply: Content;
  onDelete: () => void;
}

const Header = ({ reply, onDelete }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const classes = useStyles();

  const { author, canDelete, createdAt } = reply;

  return (
    <>
      <Box alignItems="center" display="flex" justifyContent="space-between">
        <Box
          alignItems="center"
          display="flex"
          flexWrap="wrap"
          style={{ gap: 8 }}
        >
          <Avatar
            alt="Tribe Image"
            className={classes.avatar}
            src={author.avatar}
          >
            {author.displayName?.[0].toUpperCase()}
          </Avatar>
          <Link href="/">
            <a>
              <Typography component="span" variant="button">
                {author.displayName}
                <Typography
                  color="textSecondary"
                  component="span"
                  style={{ marginLeft: '1rem' }}
                  variant="button"
                >
                  @{author.userName}
                </Typography>
              </Typography>
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
              aria-label="Reply options"
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
            <IconButton aria-label="Delete reply">
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
