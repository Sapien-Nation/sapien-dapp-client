// components
import { SEO, Query } from 'components/common';
import { DiscoveryCard, DiscoveryPlaceholder } from 'components/tribe';

// types
import type { NextPage } from 'next';
import type { DiscoveryTribe } from 'tools/types/tribe';

const DiscoveryPage: NextPage = () => {
  return (
    <div className="bg-sapien-neutral-800 lg:rounded-3xl p-5 flex-1">
      <SEO title="Discover Tribes" />
      <h1 className="sr-only">Discovery Tribes Page</h1>
      <Query api="/api/v3/tribe/discovery" loader={<DiscoveryPlaceholder />}>
        {(tribes: Array<DiscoveryTribe>) => (
          <ul
            aria-label="Tribes list"
            className="grid gap-4 grid-cols-discovery-grid"
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
