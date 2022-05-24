import { useRouter } from 'next/router';

// components
import { Query } from 'components/common';
import BadgeCard from './BadgeCard';

// constants
import { BadgeTypes } from 'tools/constants/tribe';

// hooks
import { useTribe } from 'hooks/tribe';

// mocks
import { mockTribeDiscoveryBadge } from 'tools/mocks/tribe';

// json
import DefaultBadgesJSON from './DefaultBadges.json';

// types
import type { TribeBadge, TribeDiscoveryBadge } from 'tools/types/tribe';

interface Props {
  onSelect: (badge: TribeBadge) => void;
}

const Search = ({ onSelect }: Props) => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;
  const { avatar } = useTribe(tribeID);

  const defaultBadges: Array<TribeBadge> = DefaultBadgesJSON.badges.map(
    (badge) => ({
      image: avatar,
      type: BadgeTypes.Normal,
      ...badge,
    })
  );

  return (
    <div>
      <section>
        <h2 className="text-lg text-sapien-neutral-200">Sapien Badges</h2>
        <div className="space-y-3 mt-3">
          {defaultBadges.map((badge) => {
            return (
              <BadgeCard
                badge={badge}
                onClick={() => onSelect(badge)}
                key={badge.id}
              />
            );
          })}
        </div>
      </section>
      <section className="mt-5">
        <h2 className="text-lg text-sapien-neutral-200">
          Tribes by the community
        </h2>
        <Query
          api="/core-api/tribes/badges"
          loader={null}
          options={{
            fetcher: () => [
              mockTribeDiscoveryBadge({
                id: '1',
                name: 'The governance badge',
                color: '#ffffff',
                image:
                  'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/0c7c8881-3c6b-4201-b129-62dcac16c23a-110x110.jpeg',
                description: 'Some description',
                type: BadgeTypes.Normal,
              }),
              mockTribeDiscoveryBadge({
                id: '2',
                name: 'The (OTHER) tribe',
                color: '#sapien',
                image:
                  'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/0c7c8881-3c6b-4201-b129-62dcac16c23a-110x110.jpeg',
                description: 'Some description',
                type: BadgeTypes.Normal,
              }),
              mockTribeDiscoveryBadge({
                id: '3',
                name: 'the BBB Badge',
                color: '#sapien',
                image:
                  'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/0c7c8881-3c6b-4201-b129-62dcac16c23a-110x110.jpeg',
                description: 'Some description',
                type: BadgeTypes.Normal,
              }),
            ],
          }}
        >
          {(badges: Array<TribeDiscoveryBadge>) => {
            return (
              <div className="space-y-3 mt-3">
                {badges.map((badge) => {
                  return (
                    <BadgeCard
                      badge={badge}
                      onClick={() => onSelect(badge)}
                      key={badge.id}
                    />
                  );
                })}
              </div>
            );
          }}
        </Query>
      </section>
    </div>
  );
};

export default Search;
