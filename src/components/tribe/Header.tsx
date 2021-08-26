import { useState } from 'react';

import { useCopyToClipboard } from 'react-use';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

// components
import { Image, PageHeaderSkeleton, Query } from 'components/common';

// hooks
import { getTribe } from 'hooks';

// mui
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Typography,
} from '@material-ui/core';

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

// types
import type { Tribe } from 'tools/types/tribe/view';

interface Props {
  isMainSquare?: boolean;
  tribeID: string;
}

const Header = ({ isMainSquare, tribeID }: Props) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [copyToClipboardState, copyToClipboard] = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();
  const { query } = useRouter();
  const { squareID, tribeSquareID } = query;
  const { squares } = getTribe(String(squareID));
  const selectedSquare = squares.find(({ id }) => id === tribeSquareID);
  const copy = () => {
    copyToClipboard(window.location.href);
    if (copyToClipboardState.error) {
      enqueueSnackbar(copyToClipboardState.error.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
    } else {
      enqueueSnackbar('Copied!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        preventDuplicate: true,
      });
    }
  };

  return (
    <Box className="card--rounded-white" padding={0.8}>
      <Query api={`/api/v3/tribe/${tribeID}`} loader={<PageHeaderSkeleton />}>
        {(tribe: Tribe) => (
          <>
            <Image
              alt={tribe.name}
              fallbackImage={tribe.cover_original}
              src={tribe.cover}
              style={{
                width: '100%',
                height: 200,
                objectFit: 'cover',
                borderRadius: '1.6rem',
              }}
            />
            <Box paddingBottom={3.5} paddingX={3.2} whiteSpace="pre-wrap">
              <Box
                alignItems="flex-end"
                display="flex"
                position="relative"
                top="-3rem"
              >
                <Avatar
                  alt={tribe.name}
                  src={tribe.avatar}
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 16,
                    border: '3px solid white',
                  }}
                  variant="rounded"
                >
                  {tribe.avatar_original ? (
                    <img
                      alt={tribe.name}
                      className="MuiAvatar-img"
                      src={tribe.avatar_original}
                    />
                  ) : (
                    tribe.name[0].toUpperCase()
                  )}
                </Avatar>
                <Box display="grid" paddingLeft={3} style={{ gap: 8 }}>
                  <Box
                    alignItems="baseline"
                    display="flex"
                    style={{ gap: '14px' }}
                  >
                    <Typography variant="h2">{tribe.name}</Typography>
                    <Typography color="textSecondary" variant="button">
                      {isMainSquare
                        ? `@${tribe.identifier}`
                        : `#${selectedSquare.name}`}
                    </Typography>
                  </Box>
                  <Box
                    alignItems="baseline"
                    display="flex"
                    style={{ gap: '14px' }}
                  >
                    <Typography color="textSecondary" variant="button">
                      {tribe.followersCount} Followers
                    </Typography>
                    <Typography color="textSecondary" variant="button">
                      {tribe.membersCount} Members
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" style={{ gap: '10px', marginLeft: 'auto' }}>
                  <ButtonGroup
                    disableElevation
                    aria-label="split button"
                    color="primary"
                    variant="contained"
                  >
                    <Button aria-label="Invite users">Invite</Button>
                    <Button
                      aria-label="Copy invitation link"
                      color="primary"
                      size="small"
                      onClick={() => copy()}
                    >
                      <FileCopyOutlinedIcon fontSize="small" />
                    </Button>
                  </ButtonGroup>
                  <Button
                    aria-label="Follow or Unfollow tribe"
                    variant="outlined"
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                </Box>
              </Box>
              <Typography color="textSecondary" variant="body2">
                {tribe.description}
              </Typography>
            </Box>
          </>
        )}
      </Query>
    </Box>
  );
};

export default Header;
