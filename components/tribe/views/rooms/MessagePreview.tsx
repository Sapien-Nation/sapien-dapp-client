import Linkify from 'linkify-react';
import { useRouter } from 'next/router';

// hooks
import { useRoomMembers } from 'hooks/room';

// helpers
import { formatDateRelative } from 'utils/date';

// utils
import { getUserIDFromNode, isNodeUserMention } from 'slatejs/utils';

// types
import type { RoomMessage } from 'tools/types/room';

interface Props {
  message: RoomMessage;
}

const MessagePreview = ({
  message: {
    sender: { avatar, username },
    createdAt,
    content,
  },
}: Props) => {
  const { query } = useRouter();

  const roomMembers = useRoomMembers(query.viewID as string);

  const renderContent = () => {
    const elements = content.split('\n\n');

    return elements.map((node, index) => {
      return node
        .split(' ')
        .map((singleNode) => {
          if (isNodeUserMention(singleNode)) {
            const userID = getUserIDFromNode(singleNode);
            const user = roomMembers.find(({ id }) => id === userID);
            if (user) {
              return (
                <span className="align-baseline rounded bg-sapien text-white text-extrabold text-xs cursor-pointer">
                  {' '}
                  @{user.username}{' '}
                </span>
              );
            }
            return ` ${singleNode} `;
          }
          return ` ${singleNode} `;
        })
        .concat(index === elements.length - 1 ? '' : '\n\n');
    });
  };

  return (
    <div className="py-2 bg-gray-800 rounded-md px-6 flex justify-between items-start group mt-4">
      <div className="flex space-x-3">
        <>
          {avatar ? (
            <img
              className="h-10 w-10 rounded-full"
              src={avatar}
              alt=""
              data-testid="message-avatar"
            />
          ) : (
            <div
              className="bg-sapien-neutral-200 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
              data-testid="message-avatar"
            >
              {username[0].toUpperCase()}
            </div>
          )}
        </>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-extrabold">{username}</h3>
            <time
              data-testid="message-timestamp"
              className="text-xs text-white"
            >
              {formatDateRelative(createdAt)}
            </time>
          </div>
          <p className="text-sm text-white/80 group whitespace-pre-line break-all">
            <Linkify
              tagName="p"
              options={{
                attributes: {
                  onClick: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  },
                },
                className: { url: 'underline text-blue-500' },
              }}
            >
              {renderContent()}
            </Linkify>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessagePreview;
