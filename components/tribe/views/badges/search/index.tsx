import { useRouter } from 'next/router';
import { matchSorter } from 'match-sorter';
import { Fragment, useState } from 'react';
import Lottie from 'react-lottie-player';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useSWRConfig } from 'swr';

// api
import { addTribeFromDiscovery } from 'api/tribe';

// assets
import { ContributorBadge } from 'assets';
import EmptyJSON from '../lottie/empty.json';
import CatEmptyJSON from '../lottie/CatEmpty.json';

// context
import { useToast } from 'context/toast';

// components
import { Query } from 'components/common';

// hooks
import { useUpgradedTribes } from 'hooks/tribe';

// types
import type { DiscoverBadge } from 'tools/types/tribe';

interface Props {
  onAdd: (badge: any) => void;
}

const Search = ({ onAdd }: Props) => {
  const upgradedTribes = useUpgradedTribes();

  const [selected, setSelected] = useState(upgradedTribes[0]);
  const [selectedBadgeID, setSelectedBadgeID] = useState<string | null>(null);
  const [tribeSearchTerm, setTribeSearchTerm] = useState('');
  const [badgesSearchTerm, setBadgesSearchTerm] = useState('');

  const toast = useToast();
  const { query } = useRouter();
  const { mutate } = useSWRConfig();

  const tribeID = query.tribeID as string;

  const handleAddBadge = async (badge) => {
    setSelectedBadgeID(badge.id);
    try {
      await addTribeFromDiscovery(tribeID, badge.id);

      mutate(
        `/core-api/tribe/${tribeID}/badges`,
        (data) => {
          return {
            ...data,
            otherBadges: [
              ...data.otherBadges,
              {
                ...badge,
                tribeId: selected.id,
                parentId: badge.id,
                tribeName: selected.name,
              },
            ],
          };
        },
        false
      );

      onAdd(badge);
    } catch (err) {
      toast({ message: err });
    }
    setSelectedBadgeID(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-8 items-end sm:items-center">
        <div className="p-1 w-full flex border border-sapien-neutral-400 bg-sapien-neutral-500 placeholder-sapien-neutral-200 rounded-full grow">
          <input
            autoFocus
            value={badgesSearchTerm}
            placeholder="Search Badges"
            className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-white placeholder-sapien-neutral-200"
            onChange={(event) => setBadgesSearchTerm(event.target.value)}
          />
        </div>
        <Listbox
          value={selected}
          onChange={(tribe) => {
            setTribeSearchTerm('');
            setBadgesSearchTerm('');

            setSelected(tribe);
          }}
        >
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
                      {matchSorter(upgradedTribes, tribeSearchTerm, {
                        keys: ['name'],
                      }).map((tribe) => {
                        return (
                          <Listbox.Option
                            key={tribe.id}
                            className={({ active }) =>
                              active
                                ? 'bg-gray-800 cursor-default select-none relative py-2 pl-3 pr-9 text-white'
                                : 'cursor-default select-none relative py-2 pl-3 pr-9 text-white'
                            }
                            value={tribe}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={
                                    selected
                                      ? 'font-semibold block truncate'
                                      : 'font-normal block truncate'
                                  }
                                >
                                  {tribe.name}
                                </span>

                                {selected ? (
                                  <span
                                    className={
                                      active
                                        ? 'text-white absolute inset-y-0 right-0 flex items-center pr-4'
                                        : 'text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4'
                                    }
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
      <section className="space-y-3 mt-3">
        <Query
          api={`/core-api/tribe/${selected.id}/badges/discover?forTribeId=${tribeID}`}
        >
          {(badges: Array<DiscoverBadge>) => {
            if (badges.length === 0) {
              return (
                <div className="flex flex-col items-center mt-8">
                  <h1>No Public Badges for this tribe</h1>
                  <Lottie
                    animationData={EmptyJSON}
                    play
                    className="w-40 h-40"
                  />
                </div>
              );
            }

            const filteredBadges = matchSorter(badges, badgesSearchTerm, {
              keys: ['name'],
            });

            if (filteredBadges.length === 0) {
              return (
                <div className="flex flex-col items-center mt-8">
                  <h1>No Badges for search &quot;{badgesSearchTerm}&quot;</h1>
                  <Lottie
                    animationData={CatEmptyJSON}
                    play
                    className="w-40 h-40"
                  />
                </div>
              );
            }
            return (
              <>
                {filteredBadges.map((badge) => (
                  <div
                    className="rounded-md bg-sapien-neutral-600 flex p-5 gap-3"
                    key={badge.id}
                  >
                    {badge.avatar ? (
                      <img
                        src={badge.avatar}
                        alt={badge.avatar}
                        style={{ borderColor: badge.color }}
                        className="w-12 h-12 object-cover rounded-full border-2"
                      />
                    ) : (
                      <ContributorBadge className="w-8 h-8" />
                    )}
                    <div className="flex flex-1 gap-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-md">
                          {selected.name} - {badge.name}
                        </h3>
                        <p className="text-sapien-neutral-200">
                          {badge.description}
                        </p>
                      </div>
                      <div className="flex justify-end flex-col">
                        <button
                          disabled={selectedBadgeID !== null}
                          className="bg-gray-800 text-gray-300 px-5 py-2 rounded-md"
                          onClick={() => handleAddBadge(badge)}
                        >
                          {selectedBadgeID === badge.id
                            ? 'Adding...'
                            : 'Add Badge'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            );
          }}
        </Query>
      </section>
    </div>
  );
};

export default Search;
