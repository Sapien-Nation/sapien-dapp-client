import _last from 'lodash/last';
import Link from 'next/link';

// components
import NotificationCard from './NotificationCard';

// types
import type { Notification } from 'tools/types/notifications';

interface Props {
  notification: Notification;
}

const explorerURL = process.env.NEXT_PUBLIC_EXPLORER_BASE_URL;
const BadgeGrantPropose = ({ notification }: Props) => {
  const tribe = {
    avatar: '',
    id: notification.tribeId,
    name: _last(notification.payload.split(' ')),
  };

  const payloadList = notification.payload.split(' ');
  const transactionID = payloadList[6];

  return (
    <NotificationCard
      tribe={notification.extra.tribe}
      roomId={notification.extra.roomId}
    >
      <div className="flex flex-col justify-center items-center w-full">
        <div className="text-sm p-3 rounded-xl mb-4 w-full break-words">
          New badge transaction proposed by {payloadList[3]}{' '}
          <a
            target="_blank"
            className="underline text-sm"
            rel="noreferrer"
            href={`${explorerURL}${transactionID}`}
          >
            ({transactionID.slice(0, 4)}...{transactionID.slice(-4)})
          </a>{' '}
          for the tribe{' '}
          <Link href={`/tribes/${tribe.id}/badges`} passHref>
            <a className="underline">{tribe.name}</a>
          </Link>{' '}
          is ready to be approved.
        </div>
      </div>
    </NotificationCard>
  );
};

export default BadgeGrantPropose;
