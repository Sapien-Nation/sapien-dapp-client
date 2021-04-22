// types
import type { Channel } from 'tools/types/channel';

// next
import Image from 'next/image';
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
import { black, darkGrey, outline, purple, white } from 'styles/colors';

// utils
import { formatTimestampToRelative } from 'utils/date';

const useStyles = makeStyles(() => {
  return createStyles({
    avatar: {
      color: white,
      backgroundColor: 'inherit',
      borderRadius: 15,
      border: `2px solid ${outline}`,
      boxSizing: 'content-box',
      padding: '3px',
    },
    avatarImage: {
      borderRadius: '10px',
    },
  });
});

interface Props {
  channels: Array<Channel>;
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
                color: id === channel.id ? white : darkGrey,
                backgroundColor: id === channel.id ? purple : white,
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
                  <Image
                    alt={channel.name}
                    className={classes.avatarImage}
                    height={40}
                    quality={100}
                    src={channel.image}
                    width={40}
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
                      color: id === channel.id ? white : black,
                    }}
                    variant="body4"
                  >
                    {channel.name}
                  </Typography>
                  <Typography
                    style={{
                      color: id === channel.id ? white : darkGrey,
                    }}
                    variant="tooltip"
                  >
                    {channel.membersCount} members
                  </Typography>
                </Box>
              </Box>
              <Typography
                style={{
                  color: id === channel.id ? white : darkGrey,
                }}
                variant="tooltip"
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
