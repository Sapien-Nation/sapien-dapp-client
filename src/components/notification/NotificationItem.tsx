import { mutate } from 'swr';
import { cloneDeep } from 'lodash';

// colors
import { neutral, red } from 'styles/colors';

// mui
import { Avatar, Badge, Box, Typography } from '@material-ui/core';

// utils
import { formatTimestampToRelative } from 'utils/date';

// api
import { markAsRead } from 'api/notification';

// types
import type { UserEventData } from 'tools/types/notification';

import { checkType } from './checkType';

const NotificationItem = ({
  notification,
}: {
  notification: UserEventData;
}) => {
  const {
    id,
    avatar,
    payload,
    insertedAt,
    to: { seen },
    type,
  } = notification;
  const variant = checkType(type);

  const makeNotificationRead = async () => {
    await markAsRead(id);
    mutate(
      '/api/v3/notification/all',
      (data) => {
        const updatedNotifications = data?.notifications.map((notification) => {
          const notificationData = cloneDeep(notification);
          if (notificationData.id === id) {
            notificationData.to.seen = true;
          }
          return notificationData;
        });
        return {
          count: data.count,
          notifications: updatedNotifications,
        };
      },
      false
    );
    return;
  };

  return (
    <Box
      alignItems="center"
      borderRadius={16}
      component="li"
      display="flex"
      marginBottom={0.5}
      paddingLeft={1.6}
      paddingRight={1.6}
      paddingY={1.5}
      style={{
        backgroundColor: !seen ? red[50] : 'inherit',
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
            backgroundColor: variant?.color,
            height: 64,
            width: 64,
          }}
        >
          {variant?.icon}
        </Avatar>
      </Badge>
      <Box display="flex" flexDirection="column" marginLeft={2.4}>
        {payload}
        <Box>
          <Typography
            color={!seen ? 'error' : 'textSecondary'}
            variant={!seen ? 'caption' : 'overline'}
          >
            {formatTimestampToRelative(insertedAt)} ago
          </Typography>
          {!seen && (
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
