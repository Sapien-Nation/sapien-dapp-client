import _last from 'lodash/last';
import Link from 'next/link';

// types
import type { Notification } from 'tools/types/notifications';

interface Props {
  notification: Notification;
}

const BadgeGrantPropose = ({ notification }: Props) => {
  const tribe = {
    avatar: '',
    id: notification.tribeId,
    name: _last(notification.payload.split(' ')),
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="bg-sapien-neutral-800 text-sm p-3 rounded-xl mb-4 w-full break-words">
        {notification.payload}{' '}
        <Link href={`/tribes/${tribe.id}/badges`} passHref>
          <a className="underline">{tribe.name}</a>
        </Link>
      </div>
    </div>
  );
};

export default BadgeGrantPropose;
