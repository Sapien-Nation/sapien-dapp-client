import { useRouter } from 'next/router';
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
  const { push } = useRouter();

  const tribeId = notification.extra?.tribe.id;
  const roomId = notification.extra?.roomId;

  return (
    <NotificationCard tribe={notification.extra.tribe} roomId={roomId}>
      <div className="flex flex-col justify-center items-center w-full">
        <div
          className={`${
            tribeId && roomId ? 'hover:cursor-pointer hover:bg-slate-100/5' : ''
          } text-sm p-3 rounded-xl mb-4 w-full break-words`}
          onClick={() => {
            if (tribeId && roomId) {
              push(`/tribes/${tribeId}/${roomId}`);
            }
          }}
        >
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
