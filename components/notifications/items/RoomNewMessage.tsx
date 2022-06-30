import { renderContent } from 'components/tribe/views/rooms/helpers';
import _last from 'lodash/last';

// components
import NotificationCard from './NotificationCard';

// types
import type { Notification } from 'tools/types/notifications';

interface Props {
  notification: Notification;
}

const RoomNewMessage = ({ notification }: Props) => {
  const tribe = {
    avatar: '',
    id: notification.tribeId,
    name: _last(notification.payload.split(' ')),
  };

  return (
    <NotificationCard
      tribe={notification.extra.tribe}
      roomId={notification.extra.roomId}
    >
      <div className="flex flex-col justify-center items-center w-full">
        <div className="bg-sapien-neutral-400 text-sm p-3 rounded-xl mb-4 w-full break-words">
          {renderContent(
            notification.payload,
            notification.extra?.mentions,
            [],
            notification.tribeId
          )}
        </div>
      </div>
    </NotificationCard>
  );
};

export default RoomNewMessage;
