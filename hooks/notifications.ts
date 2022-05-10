import { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';

// types
import type { Notification } from 'tools/types/notifications';

export const useTribeNotifications = (): {
  unreadNotificationsCount: number;
  unreadNotifications: Array<Notification>;
  notifications: Array<Notification>;
  notificationsCount: number;
} => {
  const { cache } = useSWRConfig();
  const { query } = useRouter();
  const { tribeID } = query;

  const data: { count: number; notifications: Array<Notification> } = cache.get(
    '/core-api/notification/all'
  ) ?? { notifications: [], count: 0 };

  const notifications = data?.notifications.filter(
    ({ tribeId }) => tribeId === tribeID
  );
  const unreadNotifications = notifications.filter(
    ({ to }) => to.seen === false
  );

  return {
    notifications,
    notificationsCount: notifications.length,
    unreadNotifications,
    unreadNotificationsCount: unreadNotifications.length,
  };
};
