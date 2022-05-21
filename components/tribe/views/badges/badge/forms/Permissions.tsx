import { XIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { matchSorter } from 'match-sorter';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

// context
import { useAuth } from 'context/user';

// hooks
import { useTribeRooms } from 'hooks/tribe';

const PermissionsForm = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { query } = useRouter();
  const { setValue, watch } = useFormContext();

  const tribeID = query.tribeID as string;

  const rooms = useTribeRooms(tribeID);

  const [permissions] = watch(['permissions']);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center relative">
        <div className="w-full">
          <div className="my-2 p-1 flex border border-sapien-neutral-400 bg-sapien-neutral-500 placeholder-sapien-neutral-200 rounded">
            <div className="flex flex-auto flex-wrap">
              {permissions.map((permission) => {
                const room = rooms.find(({ id }) => id === permission);
                return (
                  <div
                    key={room.id}
                    className="flex justify-center items-center m-1 font-medium py-1 px-4  rounded-full text-primary-700 bg-[#6200ea] border border-primary-300 "
                  >
                    <div className="text-xs text-white font-semibold mr-2 leading-none max-w-full flex-initial">
                      {room.name}
                    </div>
                    {room.id !== permission && (
                      <div className="flex flex-auto flex-row-reverse text-white ml-1">
                        <button
                          onClick={() => {
                            setValue(
                              'permissions',
                              permissions.filter(({ id }) => id !== permission)
                            );
                          }}
                        >
                          <XIcon className="w-5" />
                        </button>
                      </div>
                    )}
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
            {matchSorter(rooms, searchTerm, {
              keys: ['name'],
            }).map((room) => {
              const isSelected = permissions.find(
                (permission) => permission === room.id
              );
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
                      setValue(
                        'permissions',
                        permissions.filter(({ id }) => id !== room.id)
                      );
                    } else {
                      setValue('permissions', [...permissions, room.id]);
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
    </div>
  );
};

export default PermissionsForm;
