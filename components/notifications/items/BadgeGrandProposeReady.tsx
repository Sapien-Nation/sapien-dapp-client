import { ArrowRightIcon } from '@heroicons/react/outline';
import Link from 'next/link';

// components
import NotificationCard from './NotificationCard';

// types
import type { Notification } from 'tools/types/notifications';

interface Props {
  notification: Notification;
}

const explorerURL = process.env.NEXT_PUBLIC_EXPLORER_BASE_URL;
const BadgeGrandProposeReady = ({ notification }: Props) => {
  const transactionID = notification.payload.split(' ')[2];

  return (
    <NotificationCard
      tribe={notification.extra.tribe}
      roomId={notification.extra.roomId}
    >
      <div className="bg-sapien-neutral-600 p-3 rounded-xl mb-4 w-full">
        <p>
          Transaction{' '}
          <a
            target="_blank"
            className="underline text-sm"
            rel="noreferrer"
            href={`${explorerURL}${transactionID}`}
          >
            {transactionID.slice(0, 4)}...${transactionID.slice(-4)}{' '}
          </a>{' '}
          is ready to be executed{' '}
        </p>
        <Link href={`/tribes/${notification.tribeId}/badges`}>
          <a className="text-xs flex gap-1 mt-2 items-center">
            Go to badges managment{' '}
            <ArrowRightIcon aria-hidden="true" className="w-4 h-4" />
          </a>
        </Link>
      </div>
    </NotificationCard>
  );
};

export default BadgeGrandProposeReady;
