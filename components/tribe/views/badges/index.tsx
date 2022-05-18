import { useState } from 'react';
import { useRouter } from 'next/router';

// components
import { Overlay, Query } from 'components/common';
import BadgeView from './badge';
import Sidebar from './navigation';

// hooks
import { useTribeBadges } from 'hooks/tribe/badge';

// types
import type { TribeBadge } from 'tools/types/tribe';

enum View {
  Badge,
  Home,
}

const BadgesView = () => {
  const [selectedBadge, setSelectedBadge] = useState<TribeBadge | null>(null);

  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  const { back } = useRouter();
  const tribeBadges = useTribeBadges(tribeID);

  const renderView = () => {
    if (selectedBadge === null) {
      if (tribeBadges.length === 0) {
        return <h1>No Badges View</h1>;
      }

      return (
        <h1>
          No Badge Selected (for some reason) might never happend but still
        </h1>
      );
    }

    return <BadgeView badge={selectedBadge} />;
  };

  return (
    <Overlay title="Badges Managment" onClose={back}>
      <div>
        <Sidebar setSelectedBadge={setSelectedBadge} />
        {renderView()}
      </div>
    </Overlay>
  );
};

const BadgesViewProxy = () => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  return (
    <Query
      api={`/core-api/tribe/${tribeID}/vault`}
      options={{
        fetcher: () => ({
          badges: [],
        }),
      }}
      loader={null}
    >
      {() => (
        <div>
          <BadgesView />
        </div>
      )}
    </Query>
  );
};
export default BadgesViewProxy;
