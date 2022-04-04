// helpers
import { formatDateRelative } from 'utils/date';

// types
import type { ISOString } from 'tools/types/common';

interface Message {
  authorID: string;
  id: string;
  avatarUrl: string;
  createdAt: ISOString;
  displayName: string;
  message: string;
}
interface Props {
  isAContinuosMessage: boolean;
  message: Message;
}

const Message = ({
  isAContinuosMessage,
  message: { avatarUrl, createdAt, displayName, message },
}: Props) => {
  return (
    <div className="py-2 hover:bg-gray-800 rounded-md px-6">
      <div className="flex space-x-3">
        {isAContinuosMessage && (
          <img className="h-10 w-10 rounded-full" src={avatarUrl} alt="" />
        )}
        <div className="flex-1 space-y-1">
          {isAContinuosMessage && (
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">{displayName}</h3>
              <p className="text-xs text-gray-500">
                {formatDateRelative(createdAt)}
              </p>
            </div>
          )}
          <p
            className={
              isAContinuosMessage
                ? 'text-sm text-gray-500'
                : 'pl-[52px] text-sm text-gray-500'
            }
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
