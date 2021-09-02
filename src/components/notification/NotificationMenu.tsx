import React from 'react';

// components
import NotificationItem from './NotificationItem';
import NotificationListHeader from './NotificationListHeader';

// hooks
import { useSocketEvent } from 'hooks/socket';
import { Typography } from '@material-ui/core';

interface Props {
  data: any;
}

const NotificationMenu = ({ data }: Props) => {
  useSocketEvent('ping', (event) => {
    console.log(event);
  });

  if (!data || data.length < 1) {
    return (
      <div style={{ height: 'auto' }}>
        <Typography
          color="textSecondary"
          component="span"
          style={{ marginBottom: '1rem', padding: '0 1rem' }}
          variant="subtitle1"
        >
          Notifications empty
        </Typography>
      </div>
    );
  }

  return (
    <div style={{ height: 680 }}>
      <NotificationListHeader />
      {data.notifications?.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationMenu;
