import { useRouter } from 'next/router';
import { matchSorter } from 'match-sorter';
import { useSWRConfig } from 'swr';
import { XIcon } from '@heroicons/react/solid';
import { useState } from 'react';

// api
import { deleteRoom } from 'api/room';

// components
import { Dialog } from 'components/common';
import { Search } from 'components/common';
import { Query } from 'components/common';

// context
import { useToast } from 'context/toast';

// hooks
import { useTribeRoom } from 'hooks/tribe';

// types
import type { ProfileTribe } from 'tools/types/tribe';

// assets
import { ContributorBadge } from 'assets';

// mocks
// import { mockRoomBadge } from 'tools/mocks/room';

import { BadgeTypes } from 'tools/constants/tribe';
import { Media } from 'tools/types/common';

export interface RoomBadge {
  color: string;
  id: string;
  description: string;
  name: string;
  type: BadgeTypes;
  owners: Array<string>;
  permissions: Array<string>;
  tribe: {
    id: string;
    name: string;
    avatar: Media;
  };
  numberIssued: number;
}

export const mockRoomBadge = ({
  id = '1000',
  ...rest
}: Partial<RoomBadge> = {}): RoomBadge => ({
  id,
  color: '#6200EA',
  name: `Badge ${id}`,
  description: '',
  tribe: {
    id: '1000',
    name: 'Test Tribe',
    avatar: null,
  },
  numberIssued: 0,
  type: BadgeTypes.Normal,
  owners: [],
  permissions: [],
  ...rest,
});

interface Props {
  badges: Array<RoomBadge>;
  onClose: () => void;
  roomID: string;
}

const mockSearchBadges = [
  mockRoomBadge({ id: '4' }),
  mockRoomBadge({ id: '5' }),
  mockRoomBadge({ id: '6' }),
];

const SearchBadges = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBadges, setSearchBadges] = useState<RoomBadge[] | null>(
    mockSearchBadges
  );

  const { handleSelect } = props;

  return (
    <div>
      <Search
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        {...props}
      />
      {searchTerm && searchBadges.length > 0 && (
        //TODO: fix the width of this, should be as wide as the search bar
        <div className="absolute w-full cursor-pointer z-10 bg-gray-800 mt-3 border-b border-sapien-neutral-200">
          {matchSorter(searchBadges, searchTerm, {
            keys: ['name'],
          }).map((badge) => (
            <div
              key={badge.id}
              className="border-t border-l border-r border-sapien-neutral-200 py-2 px-3 flex w-full items-center gap-1.5 text-gray-300 hover:bg-gray-700"
              onClick={() => {
                handleSelect(badge);
                setSearchTerm('');
              }}
            >
              {badge.tribe.avatar ? (
                <img
                  src={badge.tribe.avatar}
                  alt={badge.name}
                  style={{ borderColor: badge.color }}
                  className="w-8 h-8 object-cover rounded-full border-2"
                />
              ) : (
                <ContributorBadge className="w-8 h-8" />
              )}
              <span className="ml-2 text-ellipsis truncate flex-1 text-left">
                {badge.tribe.name} - {badge.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ManageRoomDialog = ({ onClose, badges, roomID }: Props) => {
  const [roomBadges, setRoomBadges] = useState<RoomBadge[] | null>(badges);
  //const [isAddingRoom, setIsAddingRoom] = useState<boolean>(false);

  const toast = useToast();
  const { query } = useRouter();
  const { mutate } = useSWRConfig();

  const tribeID = query.tribeID as string;
  const room = useTribeRoom(tribeID, roomID);

  const handleSelectBadge = async (badge: RoomBadge) => {
    setRoomBadges([...roomBadges, badge]);
  };

  const handleUpdateRoom = async () => {
    try {
      const badgeIds = roomBadges.map((badge) => badge.id);

      //await updateRoomBadges(roomId, badgeIds);

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
          {/* <button
            type="button"
            className="w-12 self-end rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-primary hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => {setIsAddingRoom(!isAddingRoom)}}
          >
            { isAddingRoom ?
              "Cancel" :
              "Add Badge"
            }
          </button> */}
        </div>
        <SearchBadges
          className="block w-full pl-10 pr-3 py-2 mt-2 border border-sapien-neutral-200 text-white bg-gray-800 leading-5 placeholder-sapien-neutral-200 rounded-full grow focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Search Badges"
          handleSelect={handleSelectBadge}
        />
        <ul className="pl-1 py-2 cursor-pointer -mr-2">
          {roomBadges.map(({ id, name, color, tribe }) => {
            return (
              <li key={id}>
                <div className="group border border-sapien-neutral-200 mt-4 py-2 px-3 rounded-lg flex items-center gap-1.5 text-gray-300 hover:bg-gray-800">
                  {tribe.avatar ? (
                    <img
                      src={tribe.avatar}
                      alt={name}
                      style={{ borderColor: color }}
                      className="w-8 h-8 object-cover rounded-full border-2"
                    />
                  ) : (
                    <ContributorBadge className="w-8 h-8" />
                  )}
                  <span className="ml-2 text-ellipsis truncate flex-1 text-left">
                    {tribe.name} - {name}
                  </span>
                  <button
                    className="px-2 hidden group-hover:block"
                    onClick={() => {
                      setRoomBadges(
                        roomBadges.filter((badge) => badge.id !== id)
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

export default ManageRoomDialog;
