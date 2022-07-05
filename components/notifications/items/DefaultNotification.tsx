// components
import NotificationCard from './NotificationCard';

// types
import type { Notification } from 'tools/types/notifications';

interface Props {
  notification: Notification;
}

const DefaultNotification = ({ notification }: Props) => {
  return (
    <NotificationCard
      tribe={notification.extra.tribe}
      roomId={notification.extra.roomId}
    >
      <div className="flex flex-col justify-center items-center w-full">
        <div className="text-sm p-3 rounded-xl mb-4 w-full break-words">
          {notification.payload}
        </div>
      </div>
    </NotificationCard>
  );
};

export default DefaultNotification;
