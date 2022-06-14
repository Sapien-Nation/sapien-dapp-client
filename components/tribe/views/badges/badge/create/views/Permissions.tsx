import { XIcon } from '@heroicons/react/solid';
import { Disclosure } from '@headlessui/react';
import { matchSorter } from 'match-sorter';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

// components
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

  const tribeAvailablesPrivateRooms = useTribePrivateRooms();

  // https://github.com/react-hook-form/react-hook-form/issues/5054
  const {
    append,
    fields: fieldsRooms,
    remove,
  } = useFieldArray({ control, name: 'rooms' });

  if (tribeAvailablesPrivateRooms.length === 0) {
    return <h1></h1>;
  }

  return (
    <div className="w-full">
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
                            tribeAvailablesPrivateRooms.findIndex(
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
            {matchSorter(tribeAvailablesPrivateRooms, searchTerm, {
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

      <ol>
        {fieldsRooms.map((fieldRoom, index) => (
          <li key={fieldRoom.id}>
            <fieldset className="space-y-5">
              <legend className="sr-only">Permissions</legend>
              <div className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="read"
                    aria-describedby="permissions-read"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    {...register(`rooms.${index}.data.read`)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="read" className="font-medium text-gray-700">
                    Read
                  </label>
                  <p id="permissions-read" className="text-gray-500">
                    This permissions gives the owner of the badge read access
                  </p>
                </div>
              </div>

              <div className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="write"
                    aria-describedby="permissions-write"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    {...register(`rooms.${index}.data.write`)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="offers" className="font-medium text-gray-700">
                    Write
                  </label>
                  <p id="offers-description" className="text-gray-500">
                    This permissions gives the owner of the badge write access
                  </p>
                </div>
              </div>
            </fieldset>
          </li>
        ))}
      </ol>
    </div>
  );
};

const PermissionsFormProxy = () => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  return (
    <Query api={`/core-api/tribe/${tribeID}/rooms?type=PRIVATE`} loader={null}>
      {() => <PermissionsForm />}
    </Query>
  );
};

export default PermissionsFormProxy;
