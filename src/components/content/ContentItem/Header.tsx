import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

// mui
import {
  Avatar,
  Box,
  Chip,
  Divider,
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
  content: Content;
  variant: 'detail' | 'feed';
  onDelete: () => void;
}

const Header = ({ content, onDelete, variant }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const classes = useStyles();

  const { canDelete, createdAt, deletedAt, group, tribe, owner } = content;
  const { asPath } = useRouter();

  return (
    <>
      <Box alignItems="center" display="flex" justifyContent="space-between">
        <Box
          alignItems="center"
          display="flex"
          flexWrap="wrap"
          style={{ gap: 8 }}
        >
          {deletedAt ? (
            <>
              <Link
                passHref
                href={
                  variant === 'detail'
                    ? asPath
                    : `${asPath}/content/${content.id}`
                }
              >
                <Typography color="textSecondary" component="a" variant="h6">
                  This post was removed by the owner
                </Typography>
              </Link>
              <Divider flexItem light orientation="vertical" />
            </>
          ) : (
            <>
              <Avatar
                alt="Tribe Image"
                className={classes.avatar}
                src={owner.avatar}
              >
                {owner.displayName?.[0].toUpperCase()}
              </Avatar>
              <Link href="/">
                <a>
                  <Typography component="span" variant="button">
                    {owner.displayName}
                    <Typography
                      color="textSecondary"
                      component="span"
                      style={{ marginLeft: '1rem' }}
                      variant="button"
                    >
                      @{owner.userName}
                    </Typography>
                  </Typography>
                </a>
              </Link>
              <ArrowIcon color="action" />
              <GlobeIcon color="action" style={{ fontSize: '1.4rem' }} />
              <Typography component="span" variant="h4">
                {group.name}
              </Typography>
            </>
          )}
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
