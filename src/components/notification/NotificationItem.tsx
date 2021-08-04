// colors
import { blue, green, neutral, primary, red, secondary } from 'styles/colors';

//icons
import {
  ChatBubbleOutline,
  LocalOffer,
  PeopleOutline,
  SyncAlt,
} from '@material-ui/icons';

// mui
import { Avatar, Badge, Box, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';

interface Props {
  notification: {
    avatar: string;
    description: string;
    time: string;
    type: string;
    read: boolean;
  };
}

const NotificationItem = ({ notification }: Props) => {
  const { avatar, description, time, type, read } = notification;
  const [variant, setVariant] = useState({
    color: '',
    icon: null,
  });
  const [isRead, setIsRead] = useState(read);

  useEffect(() => {
    const checkType = () => {
      switch (type) {
        case 'comment':
          return setVariant({
            color: green[200],
            icon: <ChatBubbleOutline style={{ color: green[700] }} />,
          });
        case 'post':
          return setVariant({
            color: primary[200],
            icon: <PeopleOutline style={{ color: primary[700] }} />,
          });
        case 'trade':
          return setVariant({
            color: secondary[200],
            icon: <SyncAlt style={{ color: secondary[700] }} />,
          });
        case 'tag':
          return setVariant({
            color: blue[200],
            icon: <LocalOffer style={{ color: blue[700] }} />,
          });
        default:
          return setVariant({
            color: secondary[200],
            icon: <SyncAlt style={{ color: secondary[700] }} />,
          });
      }
    };
    checkType();
  }, [type]);

  const makeNotificationRead = () => {
    if (!isRead) {
      setTimeout(() => setIsRead(true), 1000);
    }
    return;
  };

  return (
    <Box
      alignItems="center"
      borderRadius={16}
      display="flex"
      paddingLeft={1.8}
      paddingY={1.8}
      style={{
        backgroundColor: !isRead ? red[50] : 'inherit',
      }}
    >
      <Badge
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={
          <Avatar
            alt="test"
            src={avatar}
            style={{
              border: `5px solid ${neutral[50]}`,
              width: 30,
              height: 30,
            }}
          />
        }
        overlap="circle"
      >
        <Avatar
          style={{
            backgroundColor: variant.color,
            height: 64,
            width: 64,
          }}
        >
          {variant.icon}
        </Avatar>
      </Badge>
      <Box display="flex" flexDirection="column" marginLeft={2.4}>
        {description}
        <Box>
          <Typography
            color={!isRead ? 'error' : 'inherit'}
            variant={!isRead ? 'caption' : 'overline'}
          >
            {time}
          </Typography>
          {!isRead && (
            <Typography
              component="span"
              style={{ cursor: 'pointer', marginLeft: 10 }}
              variant="caption"
              onClick={makeNotificationRead}
            >
              Mark as read
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationItem;
