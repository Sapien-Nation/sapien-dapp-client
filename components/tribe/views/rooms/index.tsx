import { useRouter } from 'next/router';

//components
import { Head } from 'components/common';
import Editor from 'components/slate';
import { FeedItem } from 'components/feed';

// hooks
import { useTribeRooms } from 'hooks/tribe';

const messages = [
  {
    id: '1',
    displayName: 'Sabbir Ahmed',
    avatarUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
    message: 'Hey there!',
    createdAt: new Date().toISOString(),
  },
];

const Room = () => {
  const { query } = useRouter();
  const { tribeID, viewID } = query;

  const room = useTribeRooms(tribeID as string).find(({ id }) => id === viewID);

  return (
    <div className="h-full flex flex-col">
      <Head title={room.name} />
      <div className="flex-1 flex flex-col overflow-auto justify-end py-5">
        <h1 className="sr-only">Room View for {room.name}</h1>
        <ul role="list" className="divide-y divide-gray-200">
          {messages.map((message) => (
            <FeedItem key={message.id} {...message} />
          ))}
        </ul>
      </div>
      <div>{/* <Editor onSubmit={() => {}} isFetching={false} /> */}</div>
    </div>
  );
};

export default Room;
