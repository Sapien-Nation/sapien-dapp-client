import Link from 'next/link';
import { useRouter } from 'next/router';

// mui
import {
  Avatar,
  Box,
  createStyles,
  List,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core';

// styles
import { black, darkGrey, gray3 } from 'styles/colors';

// utils
import { formatTimestampToRelative } from 'utils/date';

const useStyles = makeStyles(() => {
  return createStyles({
    avatar: {
      color: '#fff',
      backgroundColor: 'inherit',
      borderRadius: 15,
      border: `2px solid ${gray3}`,
      boxSizing: 'content-box',
      padding: '3px',
    },
    avatarImage: {
      borderRadius: '10px',
    },
  });
});

interface Props {
  channels: Array<any>;
}

const Channels = ({ channels }: Props) => {
  const classes = useStyles();
  const router = useRouter();
  const { id, tribeid } = router.query;

  return (
    <List aria-label="Channels list" role="list">
      {channels.map((channel) => (
        <ListItem
          key={channel.id}
          button
          disableGutters
          disableRipple
          component="li"
          role="listitem"
        >
          <Link href={`/client/${tribeid}/channel/${channel.id}`}>
            <Box
              aria-label={channel.name}
              display="flex"
              justifyContent="space-between"
              role="button"
              style={{
                margin: '0 .65rem',
                padding: '1rem',
                width: '100%',
                color: id === channel.id ? '#fff' : darkGrey,
                backgroundColor: id === channel.id ? '#6200EA' : '#fff',
                borderRadius: '1rem',
              }}
            >
              <Box display="flex">
                <Avatar
                  alt={channel.name}
                  classes={{
                    root: classes.avatar,
                  }}
                  variant="square"
                >
                  <img
                    alt={channel.name}
                    className="MuiAvatar-img"
                    src={channel.avatarImage}
                  />
                </Avatar>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  marginLeft={1.2}
                >
                  <Typography
                    style={{
                      color: id === channel.id ? '#fff' : black,
                    }}
                  >
                    {channel.name}
                  </Typography>
                  <Typography
                    style={{
                      color: id === channel.id ? '#fff' : darkGrey,
                    }}
                  >
                    {channel.membersCount} members
                  </Typography>
                </Box>
              </Box>
              <Typography
                style={{
                  color: id === channel.id ? '#fff' : darkGrey,
                }}
              >
                {formatTimestampToRelative(channel.lastUpdateAt)}
              </Typography>
            </Box>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default Channels;
