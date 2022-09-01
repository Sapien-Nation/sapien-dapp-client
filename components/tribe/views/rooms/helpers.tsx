import Link from 'next/link';

// utils
import {
  getRoomlIDFromNode,
  getUserIDFromNode,
  isNodeRoomMention,
  isNodeUserMention,
} from 'slatejs/utils';

export const TAG_CLASS =
  'px-1 align-baseline rounded-[.25rem] bg-sapien/60 hover:bg-sapien/100 text-white font-semibold text-md cursor-pointer';

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
        // mentions
        // @user
        if (isNodeUserMention(singleNode)) {
          const userID = getUserIDFromNode(singleNode);
          const user = users.find(({ id }) => id === userID);
          if (user) {
            return <span className={TAG_CLASS}>@{user.username?.trim()}</span>;
          } else {
            return (
              <span className={TAG_CLASS}>{userID.replaceAll('-', '')}</span>
            );
          }
        }

        // # channel
        if (isNodeRoomMention(singleNode)) {
          const roomID = getRoomlIDFromNode(singleNode);
          const room = rooms.find(({ id }) => id === roomID);
          if (room) {
            return (
              <Link href={`/tribes/${tribeID}/${room.id}`} passHref>
                <a className={TAG_CLASS}># {room.name?.trim()}</a>
              </Link>
            );
          } else {
            return <span className={TAG_CLASS}># deleted_room</span>;
          }
        }

        // text formatting
        // bold
        if (singleNode.startsWith('**') && singleNode.endsWith('**')) {
          return (
            <strong className="prose prose-xl">
              {singleNode.replaceAll('**', '')}
            </strong>
          );
        }

        // line-through
        if (singleNode.startsWith('~~') && singleNode.endsWith('~~')) {
          return (
            <span className="line-through">
              {singleNode.replaceAll('~~', '')}
            </span>
          );
        }

        // underline
        if (singleNode.startsWith('_') && singleNode.endsWith('_')) {
          return (
            <em className="underline"> {singleNode.replaceAll('_', '')}</em>
          );
        }

        // code
        if (singleNode.startsWith('`') && singleNode.endsWith('`')) {
          return (
            <code className=" bg-sapien-neutral-400 px-1 py-1">
              {singleNode.replaceAll('`', '')}
            </code>
          );
        }

        if (singleNode.startsWith('@everyone')) {
          return <span className={TAG_CLASS}>{singleNode}</span>;
        }

        return ` ${singleNode} `;
      })
      .concat(index === elements.length - 1 ? '' : '\n\n');
  });
};
