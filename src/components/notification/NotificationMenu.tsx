import React from 'react';

// components
import { Query } from 'components/common';
import NotificationItem from './NotificationItem';
import NotificationListHeader from './NotificationListHeader';

// api
import { notificationInstance } from 'api';

// hooks
import { useSocketEvent } from 'hooks/socket';

const fetcher = (url: string) =>
  notificationInstance.get(url).then((res) => res.data);

const NotificationMenu = () => {
  useSocketEvent('ping', (event) => {
    console.log(event);
  });
  return (
    <div style={{ height: '100%' }}>
      <NotificationListHeader />
      <Query api="/api/v3/notification/all" options={{ fetcher }}>
        {(data) => (
          <>
            {data.notifications?.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </>
        )}
      </Query>
    </div>
  );
};

export default NotificationMenu;
