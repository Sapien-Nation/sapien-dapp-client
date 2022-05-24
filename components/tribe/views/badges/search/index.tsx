import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { matchSorter } from 'match-sorter';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

// components
import { Select, Query } from 'components/common';
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

const TRIBES = [
  {
    id: '1',
    value: 'All tribes',
    name: 'All tribes',
  },
  {
    id: '2',
    value: 'Good News',
    name: 'Good News',
  },
  {
    id: '3',
    value: 'Airtime',
    name: 'Airtime',
  },
];

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
  { id: 7, name: 'Caroline Schultz' },
  { id: 8, name: 'Mason Heaney' },
  { id: 9, name: 'Claudie Smitham' },
  { id: 10, name: 'Emil Schaefer' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  onSelect: (badge: TribeBadge) => void;
}

const Search = ({ onSelect }: Props) => {
  const { query } = useRouter();
  const [selected, setSelected] = useState(TRIBES[0]);
  const [tribeSearchTerm, setTribeSearchTerm] = useState('');
  const [badgeSearchTerm, setBadgeSearchTerm] = useState('');

  const tribeID = query.tribeID as string;
  const { avatar, name } = useTribe(tribeID);

  const defaultBadges: Array<TribeBadge> = DefaultBadgesJSON.badges.map(
    (badge) => ({
      image: avatar,
      sourceTribeName: name,
      type: BadgeTypes.Normal,
      ...badge,
    })
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-8 items-end sm:items-center">
        <div className="p-1 w-full flex border border-sapien-neutral-400 bg-sapien-neutral-500 placeholder-sapien-neutral-200 rounded-full grow">
          <input
            autoFocus
            placeholder="Search Badges"
            className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-white placeholder-sapien-neutral-200"
            onChange={(event) => setBadgeSearchTerm(event.target.value)}
          />
        </div>
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              <div className="relative w-64">
                <Listbox.Button className="relative w-full border bg-sapien-neutral-500 pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 border-sapien-neutral-400 rounded-md shadow-sm">
                  <span className="block truncate">{selected.name}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="flex flex-col absolute z-10 mt-1 w-full shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm bg-sapien-neutral-900">
                    <div className="p-1 w-full flex border border-sapien-neutral-400 bg-sapien-neutral-500 placeholder-sapien-neutral-200 sticky top-0 rounded-t-md">
                      <input
                        autoFocus
                        placeholder="Search Tribe"
                        className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-white placeholder-sapien-neutral-200"
                        onChange={(event) =>
                          setTribeSearchTerm(event.target.value)
                        }
                      />
                    </div>
                    <div className="overflow-auto flex-1">
                      {matchSorter(TRIBES, tribeSearchTerm, {
                        keys: ['name'],
                      }).map((tribe) => {
                        return (
                          <Listbox.Option
                            key={tribe.id}
                            className={({ active }) =>
                              classNames(
                                active ? 'bg-gray-800' : '',
                                'cursor-default select-none relative py-2 pl-3 pr-9 text-white'
                              )
                            }
                            value={tribe}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={classNames(
                                    selected ? 'font-semibold' : 'font-normal',
                                    'block truncate'
                                  )}
                                >
                                  {tribe.name}
                                </span>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-indigo-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5 text-sapien-green"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        );
                      })}
                    </div>
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
      <section>
        <h2 className="text-lg text-sapien-neutral-200">Badges</h2>
        <div className="space-y-3 mt-3">
          {matchSorter(defaultBadges, badgeSearchTerm, {
            keys: ['name'],
          }).map((badge) => (
            <BadgeCard
              badge={badge}
              onClick={() => onSelect(badge)}
              key={badge.id}
            />
          ))}
        </div>
      </section>
      {/* <section className="mt-5">
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
                numberOfUsage: 100,
                sourceTribeName: 'Airtime',
              }),
              mockTribeDiscoveryBadge({
                id: '2',
                name: 'The (OTHER) tribe',
                color: '#sapien',
                image:
                  'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/0c7c8881-3c6b-4201-b129-62dcac16c23a-110x110.jpeg',
                description: 'Some description',
                type: BadgeTypes.Normal,
                numberOfUsage: 280,
                sourceTribeName: 'TIBIA MMROPG',
              }),
              mockTribeDiscoveryBadge({
                id: '3',
                name: 'the BBB Badge',
                color: '#sapien',
                image:
                  'https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/0c7c8881-3c6b-4201-b129-62dcac16c23a-110x110.jpeg',
                description: 'Some description',
                type: BadgeTypes.Normal,
                numberOfUsage: 200,
                sourceTribeName: 'Good News',
              }),
            ],
          }}
        >
          {(badges: Array<TribeDiscoveryBadge>) => {
            return (
              <div className="space-y-3 mt-3">
                {matchSorter(badges, badgeSearchTerm, {
                  keys: ['name'],
                }).map((badge) => (
                  <BadgeCard
                    badge={badge}
                    onClick={() => onSelect(badge)}
                    key={badge.id}
                  />
                ))}
              </div>
            );
          }}
        </Query>
      </section> */}
    </div>
  );
};

export default Search;
