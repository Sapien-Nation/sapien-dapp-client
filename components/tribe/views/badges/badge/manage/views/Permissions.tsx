import { useState } from 'react';
import { useRouter } from 'next/router';
import Lottie from 'react-lottie-player';

// assets
import NoPrivateRoomsJSONLottie from '../../../lottie/NoPrivateRooms.json';

// components
import { CreatePrivateRoomDialog } from '../../dialogs';
import { Query } from 'components/common';

// hooks
import { useTribePrivateRooms } from 'hooks/tribe';

// types
import type { TribeBadge } from 'tools/types/tribe';

interface Props {
  badge: TribeBadge;
}

const PermissionsForm = ({ badge }: Props) => {
  const privateRooms = useTribePrivateRooms();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (privateRooms.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center gap-5 px-3 py-4">
          <span className="text-lg text-gray-300">
            No private rooms found for this badge
          </span>
          <Lottie
            animationData={NoPrivateRoomsJSONLottie}
            play
            loop={false}
            className="h-60 -mt-6"
          />
          <button
            onClick={() => setIsDialogOpen(true)}
            type="button"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sapien hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Create Private Room
          </button>
        </div>
        {isDialogOpen && (
          <CreatePrivateRoomDialog
            badgeID={badge.id}
            onClose={() => setIsDialogOpen(false)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="text-right m-2">
        <button
          onClick={() => setIsDialogOpen(true)}
          type="button"
          className="py-1 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sapien hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Create Private Room
        </button>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full">
          <div className="p-1 flex border border-sapien-neutral-400 bg-sapien-neutral-500 placeholder-sapien-neutral-200 rounded">
            <div className="flex flex-auto flex-wrap">
              {privateRooms.map((room) => {
                return (
                  <div
                    key={room.id}
                    className="flex justify-center items-center m-1 font-medium py-1 px-4  rounded-full text-primary-700 bg-[#6200ea] border border-primary-300 "
                  >
                    <div className="text-xs text-white font-semibold mr-2 leading-none max-w-full flex-initial">
                      {room.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="shadow z-40 w-full lef-0 rounded max-h-select overflow-y-auto">
          <div className="flex flex-col w-full">
            {privateRooms.map((room) => {
              return (
                <div
                  key={room.id}
                  className="py-2 px-3 cursor-pointer bg-gray-900 hover:bg-gray-800 border-transparent border-l-2 border-sapien"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">{room.name}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {isDialogOpen && (
        <CreatePrivateRoomDialog
          badgeID={badge.id}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
};

export const PermissionsFormProxy = ({ badge }: Props) => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  const Loader = () => {
    return (
      <div className="w-full h-72 border-sapien-neutral-400 bg-sapien-neutral-500 placeholder-sapien-neutral-200 rounded-md"></div>
    );
  };

  return (
    <Query
      api={`/core-api/tribe/${tribeID}/rooms?type=PRIVATE`}
      loader={<Loader />}
    >
      {() => <PermissionsForm badge={badge} />}
    </Query>
  );
};
export default PermissionsFormProxy;
