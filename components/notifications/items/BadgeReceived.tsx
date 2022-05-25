// types
import type { Notification } from 'tools/types/notifications';
import TribeHeader from '../TribeHeader';

// hooks
import { useTribe } from 'hooks/tribe';

interface Props {
  notification: Notification;
}

const BadgeReceived = ({ notification }: Props) => {
  const tribe = useTribe(notification.tribeId);
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <TribeHeader tribe={tribe} />
      <div className="bg-sapien-neutral-800 text-sm p-3 rounded-xl mb-4 w-full">
        @{notification.by.username} has granted you the owner badge.
      </div>
    </div>
  );
};

export default BadgeReceived;
