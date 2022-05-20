// components
import { Query } from 'components/common';

// constants
import { BadgeTypes } from 'tools/constants/tribe';

// hooks
import { useSapienTribe } from 'hooks/tribe';

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
  const { avatar } = useSapienTribe();

  const defaultBadges: Array<TribeBadge> = DefaultBadgesJSON.badges.map(
    (badge, index) => ({
      id: String(index),
      image: avatar,
      type: BadgeTypes.Normal,
      ...badge,
    })
  );

  return (
    <div>
      <section>
        {defaultBadges.map((badge) => {
          return (
            <button onClick={() => onSelect(badge)} key={badge.id}>
              Add badge {badge.name}
            </button>
          );
        })}
      </section>
      <section>
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
            <div>
              {badges.map((badge) => {
                return (
                  <button onClick={() => onSelect(badge)} key={badge.id}>
                    Add badge {badge.name}
                  </button>
                );
              })}
            </div>;
          }}
        </Query>
      </section>
    </div>
  );
};

export default Search;
