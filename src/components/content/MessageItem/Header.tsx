import Link from 'next/link';
import { useState } from 'react';

// mui
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  ArrowRight as ArrowIcon,
  Delete as DeleteIcon,
  MoreHoriz as MoreIcon,
  Public as GlobeIcon
} from '@material-ui/icons';

// styles
import { primary } from 'styles/colors';

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
  content: any;
  variant: 'detail' | 'feed';
  onDelete: () => void;
}

const Header = ({ content, onDelete, variant }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const classes = useStyles();

  const {
    body,
    createdAt,
    seenAt,
    authorId,
    badgesCount,
  } = content;

  return (
    <>
      <Box alignItems="center" display="flex" justifyContent="space-between">
        <Box
          alignItems="center"
          display="flex"
          flexWrap="wrap"
          style={{ gap: 8 }}
        >
          <>
            {/* <Avatar
                alt="Message Image"
                className={classes.avatar}
                src={''}
              >
                {author.displayName?.[0].toUpperCase()}
              </Avatar> */}
            <Link href="/">
              <a>
                <Typography component="span" variant="button">
                  test
                  <Typography
                    color="textSecondary"
                    component="span"
                    style={{ marginLeft: '1rem' }}
                    variant="button"
                  >
                    @test
                  </Typography>
                </Typography>
              </a>
            </Link>
            <ArrowIcon color="action" />
            <GlobeIcon color="action" style={{ fontSize: '1.4rem' }} />
            <Typography component="span" variant="h4">
              test
            </Typography>
          </>
        </Box>

        <Box alignItems="center" display="flex" justifyContent="flex-end">
          <Typography color="textSecondary" component="span" variant="h6" style={{ marginRight: 5 }}>
             Seen {formatTimestampToRelative(seenAt)} •
          </Typography>
          <Typography color="textSecondary" component="span" variant="h6">
            {formatTimestampToRelative(createdAt)}
          </Typography>
          <IconButton
            aria-controls="message-menu"
            aria-haspopup="true"
            aria-label="Message options"
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <MoreIcon color="action" />
          </IconButton>
        </Box>
      </Box>

      <Menu
        keepMounted
        MenuListProps={{
          'aria-labelledby': 'Message Option Buttons',
        }}
        anchorEl={anchorEl}
        id="message-menu"
        open={Boolean(anchorEl)}
        style={{ marginLeft: '0.5rem' }}
        onClick={() => setAnchorEl(null)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={onDelete}>
          <IconButton aria-label="Delete message">
            <DeleteIcon color="error" />
          </IconButton>
          <Typography color="error">Delete</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
