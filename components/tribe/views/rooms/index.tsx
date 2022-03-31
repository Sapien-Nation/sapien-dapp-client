import _groupBy from 'lodash/groupBy';
import { useRouter } from 'next/router';

//components
import { Head } from 'components/common';
import { RoomEditor } from 'slatejs';
import { FeedItem } from 'components/feed';

// helpers
import { formatDate, subtractDays } from 'utils/date';

// hooks
import { useTribeRooms } from 'hooks/tribe';

const messages = [
  {
    id: '1',
    authorID: '1000',
    displayName: 'Ethan Escareño',
    avatarUrl: 'https://i.pravatar.cc/80?img=3',
    message:
      'I was wondering, do we have the Figma link for the Create room dialog?',
    createdAt: subtractDays(new Date(), 4).toISOString(),
  },
  {
    id: '2',
    authorID: '1000',
    displayName: 'Ethan Escareño',
    avatarUrl: 'https://i.pravatar.cc/80?img=3',
    message: 'Not sure if we even have a JIRA Ticket',
    createdAt: subtractDays(new Date(), 4).toISOString(),
  },
  {
    id: '3',
    authorID: '1000',
    displayName: 'Ethan Escareño',
    avatarUrl: 'https://i.pravatar.cc/80?img=3',
    message: 'Will need to ask',
    createdAt: subtractDays(new Date(), 4).toISOString(),
  },
  {
    id: '4',
    authorID: '2000',
    displayName: 'Sabbir Ahmed',
    avatarUrl: 'https://i.pravatar.cc/80?img=1',
    message: 'Hey there Ethan!',
    createdAt: subtractDays(new Date(), 4).toISOString(),
  },
  {
    id: '5',
    authorID: '2000',
    displayName: 'Sabbir Ahmed',
    avatarUrl: 'https://i.pravatar.cc/80?img=1',
    message: 'Im not sure :S',
    createdAt: subtractDays(new Date(), 4).toISOString(),
  },
  {
    id: '6',
    authorID: '1000',
    displayName: 'Ethan Escareño',
    avatarUrl: 'https://i.pravatar.cc/80?img=3',
    message: 'Yoyo',
    createdAt: subtractDays(new Date(), 3).toISOString(),
  },
  {
    id: '7',
    authorID: '2000',
    displayName: 'Sabbir Ahmed',
    avatarUrl: 'https://i.pravatar.cc/80?img=1',
    message: 'Sorry about that',
    createdAt: subtractDays(new Date(), 3).toISOString(),
  },
  {
    id: '8',
    authorID: '2000',
    displayName: 'Sabbir Ahmed',
    avatarUrl: 'https://i.pravatar.cc/80?img=1',
    message: 'Maybe Moises know?',
    createdAt: subtractDays(new Date(), 3).toISOString(),
  },
  {
    id: '9',
    authorID: '3000',
    displayName: 'Moises Ocañas',
    avatarUrl: 'https://i.pravatar.cc/80?img=2',
    message: 'Hey guys just see the message',
    createdAt: '2022-03-30T11:42:32.761Z',
  },
  {
    id: '10',
    authorID: '3000',
    displayName: 'Moises Ocañas',
    avatarUrl: 'https://i.pravatar.cc/80?img=2',
    message: 'Yeah i have it, let me find it (=',
    createdAt: '2022-03-30T15:42:32.761Z',
  },
];

const Room = () => {
  const { query } = useRouter();
  const { tribeID, viewID } = query;

  const room = useTribeRooms(tribeID as string).find(({ id }) => id === viewID);

  const feedMessages = _groupBy(messages, ({ createdAt }) =>
    formatDate(createdAt)
  );

  return (
    <div className="h-full flex flex-col">
      <Head title={room.name} />
      <div className="flex-1 overflow-auto py-5">
        <h1 className="sr-only">Room View for {room.name}</h1>
        <ul role="list" className="h-full w-full flex flex-col">
          {Object.keys(feedMessages).map((timestamp) => {
            const timestampMessages = feedMessages[timestamp];
            return (
              <li key={timestamp}>
                <time
                  className="block text-xs overflow-hidden text-gray-500 text-center w-full relative before:w-[48%] before:absolute before:top-2 before:h-[1px] before:block before:bg-gray-800 before:-left-8 after:w-[48%] after:absolute after:top-2 after:h-[1px] after:block after:bg-gray-800 after:-right-8"
                  dateTime={timestamp}
                >
                  {timestamp}
                </time>
                {timestampMessages.map((message, index) => {
                  return (
                    <FeedItem
                      key={message.id}
                      message={message}
                      isAContinuosMessage={
                        timestampMessages[index - 1]?.authorID !==
                        message.authorID
                      }
                    />
                  );
                })}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <RoomEditor onSubmit={() => {}} isFetching={false} />
      </div>
    </div>
  );
};

export default Room;
