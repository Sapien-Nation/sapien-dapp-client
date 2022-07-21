// components
import { Query } from 'components/common';
import { DiscoveryCard, DiscoveryPlaceholder } from 'components/tribe';

// types
import type { NextPage } from 'next';
import type { DiscoveryTribe } from 'tools/types/tribe';

const DiscoveryPage: NextPage = () => {
  return (
    <div className="bg-sapien-neutral-800 lg:rounded-3xl p-5 flex-1 overflow-auto">
      <h1 className="sr-only">Discovery Tribes Page</h1>
      <Query api="/core-api/tribe/discovery" loader={<DiscoveryPlaceholder />}>
        {(tribes: Array<DiscoveryTribe>) => (
          <ul
            aria-label="Tribes list"
            className="grid gap-8 grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          >
            {tribes.map((tribe) => (
              <DiscoveryCard key={tribe.id} tribe={tribe} />
            ))}
          </ul>
        )}
      </Query>
    </div>
  );
};

export default DiscoveryPage;
