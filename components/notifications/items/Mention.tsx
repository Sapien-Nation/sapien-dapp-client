// types
import type { Notification } from 'tools/types/notifications';
import TribeHeader from 'components/common/TribeHeader';

// hooks
import { useTribe } from 'hooks/tribe';

interface Props {
  notification: Notification;
}

const Mention = ({ notification }: Props) => {
  const tribe = useTribe(notification.tribeId);
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <TribeHeader tribe={tribe} />
      <div className="bg-sapien-neutral-800 text-sm p-3 rounded-xl mb-4 w-full">
        TODO: mention goes here
      </div>
    </div>
  );
};

export default Mention;
