import { useRouter } from 'next/router';

// components
import { Query } from 'components/common';

// hooks
import { useTribePrivateRooms } from 'hooks/tribe';

// types
import type { TribeBadge } from 'tools/types/tribe';

interface Props {
  badge: TribeBadge;
}

const PermissionsForm = ({ badge }: Props) => {
  const privateRooms = useTribePrivateRooms();

  if (privateRooms.length === 0) {
    return <span>Tell user to create a new private room</span>;
  }

  return <h1>TODO show list of private rooms</h1>;
};

export const PermissionsFormProxy = ({ badge }: Props) => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  return (
    <Query api={`/core-api/tribe/${tribeID}/rooms?type=PRIVATE`} loader={null}>
      {() => <PermissionsForm badge={badge} />}
    </Query>
  );
};
export default PermissionsFormProxy;
