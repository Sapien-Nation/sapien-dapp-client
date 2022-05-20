import { useLocalStorage } from 'react-use';

// constants
import { notifications } from './constants';

export const useUnreadNotifications = () => {
  const [readedNotifications, setReadedNotifications] = useLocalStorage<
    Array<Number>
  >('readNotifications', []);

  return {
    count: notifications.length - readedNotifications.length,
    readedNotifications,
    setReadedNotifications,
  };
};
