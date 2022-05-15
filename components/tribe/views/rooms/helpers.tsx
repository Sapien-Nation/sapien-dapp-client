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
              <span className="p-1 align-baseline rounded bg-sapien text-white text-extrabold text-xs cursor-pointer">
                {' '}
                @{user.username}{' '}
              </span>
            );
          } else {
            return (
              <span className="p-1 align-baseline rounded bg-sapien text-white text-extrabold text-xs cursor-pointer">
                {' '}
                @sapien_user{' '}
              </span>
            );
          }
        }

        if (isNodeRoomMention(singleNode)) {
          const roomID = getRoomlIDFromNode(singleNode);
          const room = rooms.find(({ id }) => id === roomID);
          if (room) {
            return (
              <Link href={`/tribes/${tribeID}/${room.id}`} passHref>
                <a className='className="p-1 align-baseline rounded bg-sapien-80 text-white tracking-wide text-extrabold text-md cursor-pointer'>
                  {' '}
                  #{room.name}{' '}
                </a>
              </Link>
            );
          } else {
            return (
              <span className="p-1 align-baseline rounded bg-sapien-80 text-white text-extrabold text-md cursor-pointer">
                {' '}
                #deleted_room{' '}
              </span>
            );
          }
        }

        return ` ${singleNode} `;
      })
      .concat(index === elements.length - 1 ? '' : '\n\n');
  });
};
