import { mutate } from 'swr';

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

// utils
import { formatTimestampToRelative } from 'utils/date';

// api
import { markAsRead } from 'api/notification';

// types
import type { ISOString } from 'tools/types/common';

import { checkType } from './checkType';

interface Props {
  notification: {
    id: string;
    avatar: string;
    payload: string;
    time: string;
    type: string;
    status: string;
    insertedAt: ISOString;
  };
}

const NotificationItem = ({ notification }: Props) => {
  const { id, avatar, payload, insertedAt, type, status } = notification;
  console.log('noti', notification);
  const variant = checkType(type);

  console.log('variant', variant);

  const makeNotificationRead = async () => {
    await markAsRead(id);
    mutate(
      '/api/v3/notification/all',
      (data) => {
        const updatedNotifications = data?.notifications.map((notification) => {
          if (notification.id === id) {
            notification.status = 'R';
          }
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
      display="flex"
      marginBottom={0.5}
      paddingLeft={1.6}
      paddingRight={1.6}
      paddingY={1.5}
      style={{
        backgroundColor: status === 'U' ? red[50] : 'inherit',
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
            color={status === 'U' ? 'error' : 'textSecondary'}
            variant={status === 'U' ? 'caption' : 'overline'}
          >
            {formatTimestampToRelative(insertedAt)} ago
          </Typography>
          {status === 'U' && (
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
