import { useState } from 'react';

import { useCopyToClipboard } from 'react-use';
import { useSnackbar } from 'notistack';

// components
import { Image, PageHeaderSkeleton, Query } from 'components/common';

// mui
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Typography,
} from '@material-ui/core';

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

interface Props {
  messageID: string;
}

const Header = ({ messageID }: Props) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [copyToClipboardState, copyToClipboard] = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();

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
      <Query
        api={`/api/v3/message/${messageID}`}
        loader={<PageHeaderSkeleton />}
      >
        {(message: any) => (
          <>
            <Image
              alt={message.description}
              fallbackImage={message.cover_original}
              src={message.cover}
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
                  alt={message.name}
                  src={message.avatar}
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 16,
                    border: '3px solid white',
                  }}
                  variant="rounded"
                >
                  {message.avatar_original ? (
                    <img
                      alt={message.name}
                      className="MuiAvatar-img"
                      src={message.avatar_original}
                    />
                  ) : (
                    message.name[0].toUpperCase()
                  )}
                </Avatar>
                <Box display="grid" paddingLeft={3} style={{ gap: 8 }}>
                  <Box
                    alignItems="baseline"
                    display="flex"
                    style={{ gap: '14px' }}
                  >
                    <Typography variant="h2">{message.name}</Typography>
                  </Box>
                  <Box
                    alignItems="baseline"
                    display="flex"
                    style={{ gap: '14px' }}
                  >
                    <Typography color="textSecondary" variant="button">
                      {message.membersCount} Members
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" style={{ gap: '10px', marginLeft: 'auto' }}>
                  <ButtonGroup
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
                    aria-label="Follow or Unfollow a message"
                    variant="outlined"
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                </Box>
              </Box>
              <Typography color="textSecondary" variant="body2">
                {message.description}
              </Typography>
            </Box>
          </>
        )}
      </Query>
    </Box>
  );
};

export default Header;
