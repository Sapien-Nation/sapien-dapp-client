import { useSWRConfig } from 'swr';

// types
import type { Notification } from 'tools/types/notifications';

export const useGlobalNotifications = (): {
  notifications: Array<Notification>;
  unread: number;
} => {
  const { cache } = useSWRConfig();

  return cache.get('/core-api/notification/all');
};
