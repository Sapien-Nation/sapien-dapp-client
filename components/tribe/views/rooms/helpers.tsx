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
                <span className="px-1 align-baseline rounded-[.25rem] bg-sapien/60 hover:bg-sapien/100 text-white font-semibold text-md cursor-pointer">
                  {' '}
                  @{user.username}
                </span>{' '}
              </>
            );
          } else {
            return (
              <>
                <span className="px-1 align-baseline rounded-[.25rem] bg-sapien/60 hover:bg-sapien/100 text-white font-semibold text-md cursor-pointer">
                  {' '}
                  {userID.replaceAll('-', '')}
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
                  <a className="px-0.5 align-baseline rounded-sm bg-sapien text-white font-semibold text-md cursor-pointer">
                    {' '}
                    # {room.name}
                  </a>
                </Link>{' '}
              </>
            );
          } else {
            return (
              <>
                <span className="px-0.5 align-baseline rounded-sm bg-sapien text-white font-semibold text-md cursor-pointer">
                  {' '}
                  # deleted_room
                </span>{' '}
              </>
            );
          }
        }

        if (singleNode.startsWith('**') && singleNode.endsWith('**')) {
          return (
            <>
              <strong className="prose prose-xl">
                {' '}
                {singleNode.replaceAll('**', '')}
              </strong>{' '}
            </>
          );
        }

        if (singleNode.startsWith('~~') && singleNode.endsWith('~~')) {
          return (
            <>
              <span className="line-through">
                {' '}
                {singleNode.replaceAll('~~', '')}
              </span>{' '}
            </>
          );
        }

        if (singleNode.startsWith('_') && singleNode.endsWith('_')) {
          return (
            <>
              <em className="underline"> {singleNode.replaceAll('_', '')}</em>{' '}
            </>
          );
        }

        if (singleNode.startsWith('`') && singleNode.endsWith('`')) {
          return (
            <>
              <code className=" bg-sapien-neutral-400 px-1 py-1">
                {' '}
                {singleNode.replaceAll('`', '')}
              </code>{' '}
            </>
          );
        }

        if (singleNode.startsWith('@everyone')) {
          return (
            <>
              <span className="px-0.5 align-baseline rounded-sm bg-sapien text-white font-semibold text-md cursor-pointer">
                {' '}
                {singleNode}
              </span>{' '}
            </>
          );
        }

        return ` ${singleNode} `;
      })
      .concat(index === elements.length - 1 ? '' : '\n\n');
  });
};
