import { ArrowNarrowRightIcon } from '@heroicons/react/solid';

// helpers
import { formatDateRelative } from 'utils/date';

// types
import type { RoomMessage } from 'tools/types/room';

interface Props {
  message: RoomMessage;
}

const JoinARoomMessage = ({ message }: Props) => {
  const renderRandomMessage = () => {
    // TODO figured out message
    const hour = new Date(message.createdAt).getHours();
    return (
      <>
        Hi{' '}
        <span className="font-extrabold text-yellow-500">
          {message.sender.username}
        </span>{' '}
        welcome to the Room 👋{' '}
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
          <span className="ml-2 text-xs">
            {formatDateRelative(message.createdAt)}
          </span>
        </p>{' '}
      </div>
    </li>
  );
};

export default JoinARoomMessage;
