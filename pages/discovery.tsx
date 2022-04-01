// components
import { Head, Query } from 'components/common';
import { DiscoveryCard } from 'components/tribe';

// types
import type { NextPage } from 'next';
import type { DiscoveryTribe } from 'tools/types/tribe';

const DiscoveryPage: NextPage = () => {
  return (
    <>
      <Head title="Discover Tribes" />
      <h1 className="sr-only">Discovery Tribes Page</h1>
      <Query api="/api/v3/tribe/discovery" loader={null}>
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
    </>
  );
};

export default DiscoveryPage;
