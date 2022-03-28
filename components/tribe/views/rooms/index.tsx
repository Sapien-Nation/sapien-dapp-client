import { Head } from 'components/common';
import { useRouter } from 'next/router';

// hooks
import { useRoom } from 'hooks/room';

const Room = () => {
  const { query } = useRouter();
  const { tribeID, viewID } = query;

  const room = useRoom(tribeID as string, viewID as string);

  if (room === null) return <h1>TODO Error View</h1>;

  return (
    <>
      <Head title={room.name} />
      <h1 className="sr-only">Room View for {room.name}</h1>
      <h1>TODO room data for {room.name}</h1>
    </>
  );
};

export default Room;
