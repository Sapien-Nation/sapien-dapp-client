import { XIcon } from '@heroicons/react/solid';
import { Disclosure } from '@headlessui/react';
import { matchSorter } from 'match-sorter';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import Lottie from 'react-lottie-player';

// assets
import NoPrivateRoomsJSONLottie from '../../../lottie/NoPrivateRooms.json';

// components
import { CreatePrivateRoomDialog } from '../../dialogs';
import { Query } from 'components/common';

// hooks
import { useTribePrivateRooms } from 'hooks/tribe';

enum Dialog {
  CreatePrivateRoom,
}

const PermissionsForm = () => {
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { control, register } = useFormContext();

  const tribeAvailablePrivateRooms = useTribePrivateRooms();

  // https://github.com/react-hook-form/react-hook-form/issues/5054
  const {
    append,
    fields: fieldsRooms,
    remove,
  } = useFieldArray({ control, name: 'rooms' });

  if (tribeAvailablePrivateRooms.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center gap-3 px-3 py-4">
          <span className="text-lg text-gray-300">
            You dont have any private Room
          </span>
          <span className="text-sm text-gray-300/40">
            You need at least 1 private room so you can explore the power of
            Badge Permissions
          </span>
          <Lottie
            animationData={NoPrivateRoomsJSONLottie}
            play
            loop={false}
            className="h-60 -mt-6"
          />
          <button
            onClick={() => setDialog(Dialog.CreatePrivateRoom)}
            type="button"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sapien hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Create First Private Room
          </button>
        </div>
        {dialog === Dialog.CreatePrivateRoom && (
          <CreatePrivateRoomDialog onClose={() => setDialog(null)} />
        )}
      </>
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="text-right m-2">
          <button
            onClick={() => setDialog(Dialog.CreatePrivateRoom)}
            type="button"
            className="py-1 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sapien hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Create Private Room
          </button>
        </div>
        <div className="flex flex-col items-center relative">
          <div className="w-full">
            <div className="p-1 flex border border-sapien-neutral-400 bg-sapien-neutral-500 placeholder-sapien-neutral-200 rounded">
              <div className="flex flex-auto flex-wrap">
                {fieldsRooms.map((fieldRoom) => {
                  return (
                    <div
                      key={fieldRoom.id}
                      className="flex justify-center items-center m-1 font-medium py-1 px-4  rounded-full text-primary-700 bg-[#6200ea] border border-primary-300 "
                    >
                      <div className="text-xs text-white font-semibold mr-2 leading-none max-w-full flex-initial">
                        {fieldRoom.name}
                      </div>
                      <div className="flex flex-auto flex-row-reverse text-white ml-1">
                        <button
                          type="button"
                          onClick={() => {
                            remove(
                              fieldsRooms.findIndex(
                                (room) => room.id === fieldRoom.roomID
                              )
                            );
                          }}
                        >
                          <XIcon className="w-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div className="flex-1">
                  <input
                    autoFocus
                    placeholder="Search Rooms"
                    className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-white placeholder-sapien-neutral-200"
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="shadow z-40 w-full lef-0 rounded max-h-select overflow-y-auto">
            <div className="flex flex-col w-full">
              {matchSorter(tribeAvailablePrivateRooms, searchTerm, {
                keys: ['name'],
              }).map((room) => {
                const selectedFieldRoomIndex = fieldsRooms.findIndex(
                  (fieldRoom) => fieldRoom.roomID === room.id
                );
                const isSelected = selectedFieldRoomIndex >= 0;
                return (
                  <div
                    key={room.id}
                    className={
                      isSelected
                        ? 'py-2 px-3 cursor-pointer bg-gray-900 hover:bg-gray-800 border-transparent border-l-2 border-sapien'
                        : 'py-2 px-3 cursor-pointer bg-gray-900 hover:bg-gray-800 border-transparent border-l-2'
                    }
                    onClick={() => {
                      if (isSelected) {
                        remove(selectedFieldRoomIndex);
                      } else {
                        append({
                          ...room,
                          roomID: room.id,
                        });
                      }
                    }}
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

        <ol className="p-3 space-y-3">
          <h2 className="text-gray-400 my-3 font-semibold text-lg">
            Permissions
          </h2>
          {fieldsRooms.map((fieldRoom, index) => (
            <li key={fieldRoom.id}>
              <h3 className="text-gray-300">{fieldRoom.name}</h3>
              <fieldset className="space-y-3">
                <legend className="sr-only">Permissions</legend>
                <div className="relative flex items-center">
                  <div className="flex items-center h-5">
                    <input
                      id="read"
                      aria-describedby="permissions-read"
                      type="checkbox"
                      className="focus:ring-sapien-80 h-4 w-4 text-primary border-gray-300 rounded"
                      {...register(`rooms.${index}.data.read`)}
                    />
                  </div>
                  <div className="ml-3 text-base">
                    <label htmlFor="read" className="font-medium text-gray-500">
                      Read{' '}
                      <span className="text-sm">
                        (This permissions gives the owner of the badge read
                        access)
                      </span>
                    </label>
                  </div>
                </div>

                <div className="relative flex items-center">
                  <div className="flex items-center h-5">
                    <input
                      id="write"
                      aria-describedby="permissions-write"
                      type="checkbox"
                      className="focus:ring-sapien-80 h-4 w-4 text-primary border-gray-300 rounded"
                      {...register(`rooms.${index}.data.write`)}
                    />
                  </div>
                  <div className="ml-3 text-base">
                    <label
                      htmlFor="write"
                      className="font-medium text-gray-500"
                    >
                      Write{' '}
                      <span className="text-sm">
                        (This permissions gives the owner of the badge write
                        access)
                      </span>
                    </label>
                  </div>
                </div>
              </fieldset>
            </li>
          ))}
        </ol>
      </div>
      {dialog === Dialog.CreatePrivateRoom && (
        <CreatePrivateRoomDialog onClose={() => setDialog(null)} />
      )}
    </>
  );
};

const PermissionsFormProxy = () => {
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
      {() => <PermissionsForm />}
    </Query>
  );
};

export default PermissionsFormProxy;
