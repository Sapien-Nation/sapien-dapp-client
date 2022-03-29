import { Head } from 'components/common';
import { useRouter } from 'next/router';

//components
import { ErrorView } from 'components/common';

// hooks
import { useRoom } from 'hooks/room';

const Room = () => {
  const { query } = useRouter();
  const { tribeID, viewID } = query;

  const room = useRoom(tribeID as string, viewID as string);

  if (room === null) {
    return <ErrorView message="There was a problem rendering this room!" />;
  }

  return (
    <>
      <Head title={room.name} />
      <h1 className="sr-only">Room View for {room.name}</h1>
      <h1>TODO room data for {room.name}</h1>
    </>
  );
};

export default Room;
