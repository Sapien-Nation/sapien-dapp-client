import { useRouter } from 'next/router';

// components
import { Query } from 'components/common';
import BadgeCard from './BadgeCard';

// constants
import { BadgeTypes } from 'tools/constants/tribe';

// hooks
import { useTribe } from 'hooks/tribe';

// mocks
import { mockTribeBadge } from 'tools/mocks/tribe';

// json
import DefaultBadgesJSON from './DefaultBadges.json';

// types
import type { TribeBadge } from 'tools/types/tribe';

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
        <h1>Default Badges (from JSON)</h1>

        {defaultBadges.map((badge) => {
          return (
            <BadgeCard
              badge={badge}
              onClick={() => onSelect(badge)}
              key={badge.id}
            />
          );
        })}
      </section>
      <section>
        <h1>Tribe Badges (from API)</h1>
        <Query
          api="/core-api/tribes/badges"
          loader={null}
          options={{
            fetcher: () => [
              mockTribeBadge({
                name: 'The governance badge',
                color: '#ffffff',
                description: 'Some description',
                type: BadgeTypes.Normal,
              }),
              mockTribeBadge({
                name: 'The (OTHER) tribe',
                color: '#sapien',
                description: 'Some description',
                type: BadgeTypes.Normal,
              }),
              mockTribeBadge({
                name: 'the BBB Badge',
                color: '#sapien',
                description: 'Some description',
                type: BadgeTypes.Normal,
              }),
            ],
          }}
        >
          {(badges: Array<TribeBadge>) => {
            return (
              <div>
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
