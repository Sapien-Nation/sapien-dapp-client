// components
import { Image, PageHeaderSkeleton, Query } from 'components/common';

// mui
import { Avatar, Box, Button, Typography } from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

// TODO remove
import { getDirectMessageHeader } from 'utils/poc';

interface Props {
  messageID: string;
}

const Header = ({ messageID }: Props) => {
  return (
    <Box className="card--rounded-white" padding={0.8}>
      <Query
        api={`/api/v3/message/${messageID}`}
        loader={<PageHeaderSkeleton />}
        options={{
          fetcher: () => getDirectMessageHeader(messageID).profile,
        }}
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
                    border: '3px solid white',
                  }}
                  variant="circle"
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
                    <Typography variant="h2">{message.displayName}</Typography>
                    <Typography color="textSecondary" variant="button">
                      @{message?.username}
                    </Typography>
                  </Box>
                  <Box
                    alignItems="baseline"
                    display="flex"
                    style={{ gap: '14px' }}
                  >
                    <Typography color="textSecondary" variant="button">
                      {message?.followersCount} Followers
                    </Typography>
                    <Typography color="textSecondary" variant="button">
                      {message?.followingCount} Following
                    </Typography>
                    <Typography color="textSecondary" variant="button">
                      {message?.postsCount} Posts
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" style={{ gap: '10px', marginLeft: 'auto' }}>
                  <Button
                    aria-label="Follow or Unfollow a message"
                    variant="outlined"
                    onClick={() => {}}
                  >
                    {message.isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  <Button
                    aria-label="Follow or Unfollow a message"
                    variant="outlined"
                    onClick={() => {}}
                  >
                    <NotificationsNoneIcon color="primary" />
                  </Button>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Query>
    </Box>
  );
};

export default Header;
