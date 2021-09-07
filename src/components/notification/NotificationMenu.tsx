import React, { useCallback } from 'react';
import { mutate } from 'swr';

// components
import NotificationItem from './NotificationItem';
import NotificationListHeader from './NotificationListHeader';

// hooks
import { useSocketEvent } from 'hooks/socket';
import { Typography } from '@material-ui/core';

// Enum
import { EventType } from 'tools/types/notification';

interface Props {
  data: any;
}

const NotificationMenu = ({ data }: Props) => {
  const handleNotification = useCallback((event) => {
    mutate(
      '/api/v3/notification/all',
      (data) => {
        const eventData = event.data;
        eventData.type = event.type;
        eventData.to.seen = false;
        const updatedNotifications = [eventData, ...data?.notifications];
        return {
          count: ++data.count,
          notifications: updatedNotifications,
        };
      },
      false
    );
  }, []);

  useSocketEvent(EventType.ChannelInvite, (event) => {
    handleNotification(event);
  });
  useSocketEvent(EventType.JoinRequestResolved, (event) => {
    handleNotification(event);
  });
  useSocketEvent(EventType.NewReply, (event) => {
    handleNotification(event);
  });
  useSocketEvent(EventType.ReportPost, (event) => {
    handleNotification(event);
  });
  useSocketEvent(EventType.Mentioned, (event) => {
    handleNotification(event);
  });
  useSocketEvent(EventType.BadgeUser, (event) => {
    handleNotification(event);
  });
  useSocketEvent(EventType.BadgePost, (event) => {
    handleNotification(event);
  });
  useSocketEvent(EventType.SendSPNUser, (event) => {
    handleNotification(event);
  });
  useSocketEvent(EventType.SendSPNPost, (event) => {
    handleNotification(event);
  });
  useSocketEvent(EventType.DepositSPN, (event) => {
    handleNotification(event);
  });
  useSocketEvent(EventType.WithdrawSPN, (event) => {
    handleNotification(event);
  });
  useSocketEvent(EventType.BadgePurchasedForAdmin, (event) => {
    handleNotification(event);
  });
  useSocketEvent(EventType.BadgePurchased, (event) => {
    handleNotification(event);
  });
  useSocketEvent(EventType.BadgePriceUpdatedForAdmin, (event) => {
    handleNotification(event);
  });
  useSocketEvent(EventType.leaveTribe, (event) => {
    handleNotification(event);
  });
  useSocketEvent(EventType.SapienBadgeReceived, (event) => {
    handleNotification(event);
  });

  if (!data || data.length < 1) {
    return (
      <Typography
        color="textSecondary"
        component="li"
        style={{ marginBottom: '1rem', padding: '0 1rem' }}
        variant="subtitle1"
      >
        Notifications empty
      </Typography>
    );
  }

  return (
    <>
      <NotificationListHeader />
      {data.notifications?.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </>
  );
};

export default NotificationMenu;
