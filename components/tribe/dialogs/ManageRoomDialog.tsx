import { SearchIcon, XIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { matchSorter } from 'match-sorter';
import { useState } from 'react';

// components
import { Dialog, Query } from 'components/common';

// context
import { useToast } from 'context/toast';

// hooks
import { useTribeRoom } from 'hooks/tribe';

// assets
import { ContributorBadge } from 'assets';

import { useRoomBadges } from 'hooks/tribe/badge';

// types
import { RoomBadge } from 'tools/types/room';

interface Props {
  onClose: () => void;
  roomID: string;
}

const ManageRoomDialog = ({ onClose, roomID }: Props) => {
  const roomBadges = useRoomBadges(roomID);
  const [badges, setBadges] = useState<Array<RoomBadge>>(roomBadges);
  const [searchTerm, setSearchTerm] = useState('');

  const toast = useToast();
  const { query } = useRouter();

  const tribeID = query.tribeID as string;
  const room = useTribeRoom(tribeID, roomID);

  const handleUpdateRoom = async () => {
    try {
      onClose();
    } catch (err) {
      toast({
        message: err,
      });
    }
  };

  return (
    <Dialog
      show
      isFetching={false}
      onClose={onClose}
      title="Manage Room"
      onConfirm={handleUpdateRoom}
      confirmLabel="Confirm"
    >
      <div className="flex flex-col">
        <div className="flex flex-row py-2 gap-4">
          <p className="flex flex-1 pl-1 text-center text-gray-400">
            Who can access #{room.name}?
          </p>
        </div>
        <div>
          <div className="w-full pl-2">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search"
                name="search"
                type="search"
                autoComplete="off"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search Badges"
                className="block w-full pl-10 pr-3 py-2 mt-2 border border-sapien-neutral-200 text-white bg-gray-800 leading-5 placeholder-sapien-neutral-200 rounded-full grow focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="absolute w-full cursor-pointer z-10 bg-gray-800 mt-3 border-b border-sapien-neutral-200">
            {matchSorter(searchTerm ? badges : [], searchTerm, {
              keys: ['name'],
            }).map((badge) => (
              <div
                key={badge.id}
                className="border-t border-l border-r border-sapien-neutral-200 py-2 px-3 flex w-full items-center gap-1.5 text-gray-300 hover:bg-gray-700"
                onClick={() => {
                  setSearchTerm('');
                }}
              >
                {badge.avatar ? (
                  <img
                    src={badge.avatar}
                    alt={badge.name}
                    style={{ borderColor: badge.color }}
                    className="w-8 h-8 object-cover rounded-full border-2"
                  />
                ) : (
                  <ContributorBadge className="w-8 h-8" />
                )}
                <span className="ml-2 text-ellipsis truncate flex-1 text-left">
                  {badge.name} - {badge.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <ul className="pl-1 py-2 cursor-pointer -mr-2">
          {badges.map((badge) => {
            return (
              <li key={badge.id}>
                <div className="group border border-sapien-neutral-200 mt-4 py-2 px-3 rounded-lg flex items-center gap-1.5 text-gray-300 hover:bg-gray-800">
                  {badge.avatar ? (
                    <img
                      src={badge.avatar}
                      alt={badge.name}
                      style={{ borderColor: badge.color }}
                      className="w-8 h-8 object-cover rounded-full border-2"
                    />
                  ) : (
                    <ContributorBadge className="w-8 h-8" />
                  )}
                  <span className="ml-2 text-ellipsis truncate flex-1 text-left">
                    {badge.name} - {badge.name}
                  </span>
                  <button
                    className="px-2 hidden group-hover:block"
                    onClick={() => {
                      console.log(
                        badges.filter((badge) => badge.id !== badge.id)
                      );
                    }}
                  >
                    <XIcon className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Dialog>
  );
};

const ManageRoomDialogProxy = ({ roomID, onClose }: Props) => {
  return (
    <Query api={`/core-api/room/${roomID}/badges`}>
      {() => <ManageRoomDialog roomID={roomID} onClose={onClose} />}
    </Query>
  );
};

export default ManageRoomDialogProxy;
