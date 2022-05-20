import { ArrowNarrowRightIcon } from '@heroicons/react/solid';

// helpers
import { formatDateRelative } from 'utils/date';

// types
import type { ISOString } from 'tools/types/common';

interface Props {
  createdAt: ISOString;
  username: string;
}

const JoinARoomMessage = ({ createdAt, username }: Props) => {
  const renderRandomMessage = () => {
    // TODO figured out message
    const hour = new Date(createdAt).getHours();
    return (
      <>
        Hi <span className="font-bold text-yellow-500">{username}</span> welcome
        to the room 👋{' '}
      </>
    );
  };

  return (
    <li className="hover:bg-gray-800 rounded-md px-6 flex justify-between items-start group">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center">
          <ArrowNarrowRightIcon className="w-6 h-6 text-sapien-60" />
        </div>
        <p className="text-sm text-white/80 group whitespace-pre-line">
          {renderRandomMessage()}
          <span className="ml-2 text-xs">{formatDateRelative(createdAt)}</span>
        </p>{' '}
      </div>
    </li>
  );
};

export default JoinARoomMessage;
