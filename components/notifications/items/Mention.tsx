// components
import TribeNotificationHeader from './TribeNotificationHeader';

// types
import type { Notification } from 'tools/types/notifications';

interface Props {
  notification: Notification;
}

const Mention = ({ notification }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <TribeNotificationHeader tribe={notification.extra.tribe} />
      <div className="bg-sapien-neutral-800 text-sm p-3 rounded-xl mb-4 w-full">
        TODO: mention goes here
      </div>
    </div>
  );
};

export default Mention;
