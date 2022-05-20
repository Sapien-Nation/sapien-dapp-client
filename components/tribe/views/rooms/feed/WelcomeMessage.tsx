import { useRouter } from 'next/router';

// helpers
import { formatDate, formatDateRelative } from 'utils/date';

// hooks
import { useRoomDetails } from 'hooks/room';

const WelcomeMessage = () => {
  const { query } = useRouter();

  const roomID = query.viewID as string;
  const { createdAt, name } = useRoomDetails(roomID);

  return (
    <li>
      <time
        className="block text-xs overflow-hidden text-gray-500 text-center w-full relative before:w-48 before:absolute before:top-2 before:h-px before:block before:bg-gray-800 before:-left-8 after:w-48 after:absolute after:top-2 after:h-px after:block after:bg-gray-800 after:-right-8"
        dateTime={createdAt}
        data-testid="timestamp-divider-harambe"
      >
        {formatDate(createdAt)}
      </time>
      <div
        className={`py-2 hover:bg-gray-800 rounded-md px-6 flex justify-between items-start group`}
      >
        <div className="flex space-x-3">
          <img
            className="h-10 w-10 rounded-full"
            src="/images/harambe_sapien.png"
            alt=""
            data-testid="message-avatar"
          />
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold">Harambe at Sapien</h3>
              <time
                data-testid="message-timestamp"
                className="text-xs text-white"
              >
                {formatDateRelative(createdAt)}
              </time>
            </div>
            <p className="text-sm text-white/80 group">
              {`This is the beginning of the conversation on the room: ${name}, say Hi! or Hola!`}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default WelcomeMessage;
