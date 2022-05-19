import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// constants
import { Role } from 'tools/constants/tribe';

// components
import { Overlay, Query } from 'components/common';
import BadgeView from './badge';
import Sidebar from './navigation';

// hooks
import { useTribe } from 'hooks/tribe';
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

  const { role, isUpgraded } = useTribe(tribeID);
  const isTribeOwnerOrTribeAdmin = role === Role.Owner || role === Role.Admin;

  if (isUpgraded === false) {
    return (
      <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden h-full w-full">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg"
            alt="People working on laptops"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-900 mix-blend-multiply" />
        </div>
        <div className="px-4 py-4 flex flex-col gap-4 absolute justify-center items-center w-full text-center h-full">
          {isTribeOwnerOrTribeAdmin === true ? (
            <>
              <p>You need to Upgrade this tribe in order to Manage Badges</p>
              <div className="flex justify-between gap-4">
                <Link passHref href={`/tribes/${tribeID}/upgrade`}>
                  <a className="flex justify-center h-12 items-center py-2 px-4 border-2 rounded-md shadow-sm text-md font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2">
                    Upgrade Tribe
                  </a>
                </Link>
              </div>
            </>
          ) : (
            <p>You don&apos;t have access to see this view </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <Query api={`/core-api/tribe/${tribeID}/badges`} loader={null}>
      {() => <BadgesView />}
    </Query>
  );
};
export default BadgesViewProxy;
