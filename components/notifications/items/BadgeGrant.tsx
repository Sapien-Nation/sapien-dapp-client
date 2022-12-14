import _last from 'lodash/last';
import Link from 'next/link';

// components
import NotificationCard from './NotificationCard';

// types
import type { Notification } from 'tools/types/notifications';

interface Props {
  notification: Notification;
}

const BadgeGrant = ({ notification }: Props) => {
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
        <div className="text-sm p-3 rounded-xl mb-4 w-full break-words">
          {notification.payload.split(' ').slice(0, -1).join(' ')}{' '}
          <Link href={`/tribes/${tribe.id}/home`} passHref>
            <a className="underline">{tribe.name}</a>
          </Link>
        </div>
      </div>
    </NotificationCard>
  );
};

export default BadgeGrant;
