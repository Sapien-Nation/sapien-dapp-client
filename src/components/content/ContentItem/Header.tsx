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
  Edit as EditIcon,
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
  },
}));

interface Props {
  content: Content;
  onEdit: () => void;
  onDelete: () => void;
}

const Header = ({ content, onEdit, onDelete }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const classes = useStyles();

  const { canEdit, canDelete, createdAt, group, tribe, owner } = content;

  return (
    <>
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
          <ArrowIcon />
          <GlobeIcon fontSize="small" />
          <Typography>{group.name}</Typography>
          <Chip
            classes={{
              root: classes.chipRoot,
            }}
            color="primary"
            icon={<GroupIcon color="primary" />}
            label={tribe.name}
            size="small"
          />
        </Box>

        <div>
          {formatTimestampToRelative(createdAt)}
          {canEdit && canDelete && (
            <IconButton
              aria-controls="post-menu"
              aria-haspopup="true"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              <MoreIcon />
            </IconButton>
          )}
        </div>
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
        onClose={() => setAnchorEl(null)}
      >
        {canEdit && (
          <MenuItem onClick={onEdit}>
            <IconButton>
              <EditIcon />
            </IconButton>
            Edit
          </MenuItem>
        )}
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
