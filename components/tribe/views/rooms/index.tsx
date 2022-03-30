import { useRouter } from 'next/router';

//components
import { Head } from 'components/common';

// hooks
import { useTribeRooms } from 'hooks/tribe';

const Room = () => {
  const { query } = useRouter();
  const { tribeID, viewID } = query;

  const room = useTribeRooms(tribeID as string).find(({ id }) => id === viewID);

  return (
    <>
      <Head title={room.name} />
      <h1 className="sr-only">Room View for {room.name}</h1>
      <div>InfiniteScroll Feed Goes here</div>
      <div>
        <span>Editor goes here</span>
      </div>
    </>
  );
};

export default Room;
