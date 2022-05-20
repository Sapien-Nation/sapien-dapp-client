import { useRouter } from 'next/router';

// hooks
import { useTribeMembers } from 'hooks/tribe';

const MembersForm = () => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  const tribeMembers = useTribeMembers(tribeID);
  return (
    <div>
      <h1>TODO Members form {tribeMembers.length}</h1>
    </div>
  );
};

export default MembersForm;
