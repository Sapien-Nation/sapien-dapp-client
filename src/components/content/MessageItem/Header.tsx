import Link from 'next/link';
import { useState } from 'react';

// mui
import { Box, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import {
  ArrowRight as ArrowIcon,
  Delete as DeleteIcon,
  MoreHoriz as MoreIcon,
  Public as GlobeIcon,
} from '@material-ui/icons';

// utils
import { formatTimestampToRelative } from 'utils/date';

interface Props {
  content: any;
  variant: 'detail' | 'feed';
  onDelete: () => void;
}

const Header = ({ content, onDelete }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { createdAt } = content;

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
          <Typography color="textSecondary" component="span" variant="h6">
            {formatTimestampToRelative(createdAt)} ago
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
