// components
import TribeNotificationHeader from './TribeNotificationHeader';

// types
import type { Notification } from 'tools/types/notifications';

interface Props {
  notification: Notification;
}

const BadgeReceived = ({ notification }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <TribeNotificationHeader tribe={notification.extra.tribe} />
      <div className="bg-sapien-neutral-800 text-sm p-3 rounded-xl mb-4 w-full">
        @{notification.by.username} has granted you the owner badge.
      </div>
    </div>
  );
};

export default BadgeReceived;
