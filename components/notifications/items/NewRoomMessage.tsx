// types
import type { Notification } from 'tools/types/notifications';

interface Props {
  notification: Notification;
}

const NewRoomMessage = ({ notification }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="bg-sapien-neutral-800 text-sm p-3 rounded-xl mb-4 w-full">
        {notification.payload}
      </div>
    </div>
  );
};

export default NewRoomMessage;
