import { useRouter } from 'next/router';

// components
import { Query } from 'components/common';

const MembersView = () => {
  return <h1>Members View</h1>;
};

const MembersFormProxy = () => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  // TODO fetch gnosis transactions
  return (
    <Query api={`/core-api/tribe/${tribeID}/members`} loader={null}>
      {() => <MembersView />}
    </Query>
  );
};

export default MembersFormProxy;
