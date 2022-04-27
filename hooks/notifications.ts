import { cloneDeep } from 'lodash';
import { useCallback } from 'react';
import { useSWRConfig } from 'swr';

// constants
import { NotificationType } from 'tools/types/notifications';

// hooks
import { useSocketEvent } from 'hooks/socket';

// types
import type { Notification } from 'tools/types/notifications';
import type { ProfileTribe } from 'tools/types/tribe';

export const useUserNotifications = () => {
  const { cache } = useSWRConfig();

  const tribes: Array<ProfileTribe> = cache.get('/core-api/profile/tribes');
  const {
    notifications,
  }: { count: number; notifications: Array<Notification> } = cache.get(
    '/core-api/notification/all'
  );

  return tribes.reduce<Record<string, Array<Notification>>>(
    (accumulator, { id }) => {
      accumulator[id] = [];
      return accumulator;
    },
    {}
  );
};

export const useNotificationsListener = () => {
  const { mutate } = useSWRConfig();

  const handleNotification = useCallback(
    ({ data }: { data: Notification }) => {
      mutate(
        '/core-api/notification/all',
        ({ notifications }: { notifications: Array<Notification> }) => ({
          count: notifications.length + 1,
          notifications: [
            {
              ...data,
              to: {
                ...data.to,
                seen: false,
              },
            },
            ...notifications,
          ],
        }),
        false
      );
    },
    [mutate]
  );

  useSocketEvent(NotificationType.ChannelInvite, handleNotification);
  useSocketEvent(NotificationType.JoinRequestResolved, handleNotification);
  useSocketEvent(NotificationType.NewReply, handleNotification);
  useSocketEvent(NotificationType.ReportPost, handleNotification);
  useSocketEvent(NotificationType.Mentioned, handleNotification);
  useSocketEvent(NotificationType.BadgeUser, handleNotification);
  useSocketEvent(NotificationType.BadgePost, handleNotification);
  useSocketEvent(NotificationType.SendSPNUser, handleNotification);
  useSocketEvent(NotificationType.SendSPNPost, handleNotification);
  useSocketEvent(NotificationType.DepositSPN, handleNotification);
  useSocketEvent(NotificationType.WithdrawSPN, handleNotification);
  useSocketEvent(NotificationType.BadgePurchasedForAdmin, handleNotification);
  useSocketEvent(NotificationType.BadgePurchased, handleNotification);
  useSocketEvent(
    NotificationType.BadgePriceUpdatedForAdmin,
    handleNotification
  );
  useSocketEvent(NotificationType.LeaveTribe, handleNotification);
  useSocketEvent(NotificationType.SapienBadgeReceived, handleNotification);
};

export const useTribeNotifications = (
  tribeID: string
): {
  notifications: Array<Notification>;
  unreadNotifications: Array<Notification>;
} => {
  const { cache } = useSWRConfig();

  const tribes: Array<ProfileTribe> = cache.get('/core-api/profile/tribes');
  const {
    notifications,
  }: { count: number; notifications: Array<Notification> } = cache.get(
    '/core-api/notification/all'
  );

  const allNotifications = tribes.reduce<Record<string, Array<Notification>>>(
    (accumulator, { id }) => {
      accumulator[id] = [];
      return accumulator;
    },
    {}
  );

  const tribeNotifications: Array<Notification> = allNotifications[tribeID];
  return {
    notifications: tribeNotifications,
    unreadNotifications: tribeNotifications.filter(({ to }) => to.seen),
  };
};
