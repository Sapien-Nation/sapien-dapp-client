// components
import { Head, Query } from 'components/common';
import { DiscoveryCard } from 'components/tribe';

// types
import type { NextPage } from 'next';
import type { DiscoveryTribe } from 'tools/types/tribe';

// mocks
import { mockDiscoveryTribe } from 'tools/mocks/tribe';

const DiscoveryPage: NextPage = () => {
  return (
    <>
      <Head title="Discover Tribes" />
      <h1 className="sr-only">Discovery Tribes Page</h1>
      <Query
        api="/api/v3/discovery"
        options={{
          fetcher: () => [
            mockDiscoveryTribe({
              description:
                'A tribe is a group of people who live and work together in a shared geographical area. A tribe has a common culture, dialect and religion. They also have a strong sense of unity. The tribe is usually headed by a chief.',
            }),
            mockDiscoveryTribe({
              description:
                'A tribe is a group of people who live and work together in a shared geographical area. A tribe has a common culture, dialect and religion. They also have a strong sense of unity. The tribe is usually headed by a chief.',
            }),
            mockDiscoveryTribe({
              description:
                'A tribe is a group of people who live and work together in a shared geographical area. A tribe has a common culture, dialect and religion. They also have a strong sense of unity. The tribe is usually headed by a chief.',
            }),
            mockDiscoveryTribe({
              description:
                'A tribe is a group of people who live and work together in a shared geographical area. A tribe has a common culture, dialect and religion. They also have a strong sense of unity. The tribe is usually headed by a chief.',
            }),
            mockDiscoveryTribe({
              description:
                'A tribe is a group of people who live and work together in a shared geographical area. A tribe has a common culture, dialect and religion. They also have a strong sense of unity. The tribe is usually headed by a chief.',
            }),
            mockDiscoveryTribe({
              description:
                'A tribe is a group of people who live and work together in a shared geographical area. A tribe has a common culture, dialect and religion. They also have a strong sense of unity. The tribe is usually headed by a chief.',
            }),
          ],
        }}
      >
        {(tribes: Array<DiscoveryTribe>) => {
          return (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
              {tribes.map((tribe) => (
                <DiscoveryCard key={tribe.id} tribe={tribe} />
              ))}
            </div>
          );
        }}
      </Query>
    </>
  );
};

export default DiscoveryPage;
