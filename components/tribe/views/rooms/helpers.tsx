import Link from 'next/link';

// utils
import {
  getRoomlIDFromNode,
  getUserIDFromNode,
  isNodeRoomMention,
  isNodeUserMention,
} from 'slatejs/utils';

export const renderContent = (
  content: string,
  users = [],
  rooms = [],
  tribeID: string
) => {
  const elements = content.split('\n\n');
  return elements.map((node, index) => {
    return node
      .split(' ')
      .map((singleNode) => {
        if (isNodeUserMention(singleNode)) {
          const userID = getUserIDFromNode(singleNode);
          const user = users.find(({ id }) => id === userID);
          if (user) {
            return (
              <>
                <span className="px-0.5 align-baseline rounded-sm bg-sapien text-white font-semibold text-xs cursor-pointer">
                  {' '}
                  @{user.username}
                </span>{' '}
              </>
            );
          } else {
            return (
              <>
                <span className="px-0.5 align-baseline rounded-sm bg-sapien text-white font-semibold text-xs cursor-pointer">
                  {' '}
                  @{userID.replaceAll('-', '')}
                </span>{' '}
              </>
            );
          }
        }

        if (isNodeRoomMention(singleNode)) {
          const roomID = getRoomlIDFromNode(singleNode);
          const room = rooms.find(({ id }) => id === roomID);
          if (room) {
            return (
              <>
                <Link href={`/tribes/${tribeID}/${room.id}`} passHref>
                  <a className="px-0.5 align-baseline rounded-sm bg-sapien text-white font-semibold text-xs cursor-pointer">
                    {' '}
                    # {room.name}
                  </a>
                </Link>{' '}
              </>
            );
          } else {
            return (
              <>
                <span className="px-0.5 align-baseline rounded-sm bg-sapien text-white font-semibold text-xs cursor-pointer">
                  {' '}
                  # deleted_room
                </span>{' '}
              </>
            );
          }
        }

        return ` ${singleNode} `;
      })
      .concat(index === elements.length - 1 ? '' : '\n\n');
  });
};
