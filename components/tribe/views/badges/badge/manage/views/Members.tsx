import { useRouter } from 'next/router';

// components
import { Query } from 'components/common';

// hooks
import { useBadgeTransactions } from 'hooks/tribe/badge';

// types
import type { DraftBadge } from '../../../types';

interface Props {
  badge: DraftBadge;
}

const MembersView = ({ badge }: Props) => {
  const badgeTransactions = useBadgeTransactions(badge.id);

  console.log(badgeTransactions);
  return <h1>Members View</h1>;
};

const MembersFormProxy = ({ badge }: Props) => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  return (
    <Query api={`/core-api/tribe/${tribeID}/members`} loader={null}>
      {() => (
        <Query api={`/core-api/tribe/${tribeID}/safe/transactions`}>
          {() => <MembersView badge={badge} />}
        </Query>
      )}
    </Query>
  );
};

export default MembersFormProxy;
