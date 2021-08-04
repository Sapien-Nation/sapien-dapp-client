import React from 'react';

// components
import NotificationItem from './NotificationItem';
import NotificationListHeader from './NotificationListHeader';

const NotificationMenu = () => {
  const notificationsMock = [
    {
      id: 1,
      avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
      description: 'John Cena commented on your post',
      time: 'about one hour',
      type: 'comment',
      read: false,
    },
    {
      id: 2,
      avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
      description: 'John Cena commented on your post',
      time: '5 hours ago',
      type: 'post',
      read: true,
    },
    {
      id: 3,
      avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
      description: 'John Cena commented on your post',
      time: 'a few seconds ago',
      type: 'trade',
      read: true,
    },
    {
      id: 4,
      avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
      description: 'John Cena commented on your post',
      time: 'a few seconds ago',
      type: 'tag',
      read: true,
    },
  ];

  return (
    <div style={{ height: '100%' }}>
      <NotificationListHeader />
      {notificationsMock?.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationMenu;
