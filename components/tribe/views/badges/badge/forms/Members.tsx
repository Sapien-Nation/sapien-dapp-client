import { XIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { matchSorter } from 'match-sorter';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

// context
import { useAuth } from 'context/user';

// hooks
import { useTribeMembers } from 'hooks/tribe';

const MembersForm = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { me } = useAuth();
  const { query } = useRouter();
  const { setValue, watch } = useFormContext();

  const tribeID = query.tribeID as string;

  const tribeMembers = useTribeMembers(tribeID);

  const [owners] = watch(['owners']);

  console.log(owners);
  return (
    <div className="w-full">
      <div className="flex flex-col items-center relative">
        <div className="w-full">
          <div className="my-2 p-1 flex border border-sapien-neutral-400 bg-sapien-neutral-500 placeholder-sapien-neutral-200 rounded">
            <div className="flex flex-auto flex-wrap">
              {owners.map((address) => {
                const owner = tribeMembers.find(
                  ({ walletAddress }) => walletAddress === address
                );
                return (
                  <div
                    key={owner.id}
                    className="flex justify-center items-center m-1 font-medium py-1 px-4  rounded-full text-primary-700 bg-[#6200ea] border border-primary-300 "
                  >
                    <div className="text-xs text-white font-semibold mr-2 leading-none max-w-full flex-initial">
                      {owner.displayName}
                    </div>
                    {address !== me.walletAddress && (
                      <div className="flex flex-auto flex-row-reverse text-white ml-1">
                        <button
                          onClick={() => {
                            setValue(
                              'owners',
                              owners.filter(
                                ({ id }) => id !== owner.walletAddress
                              )
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
                  placeholder="Search members"
                  className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-white placeholder-sapien-neutral-200"
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="shadow z-40 w-full lef-0 rounded max-h-select overflow-y-auto">
          <div className="flex flex-col w-full">
            {matchSorter(
              tribeMembers.filter(({ id }) => id !== me.walletAddress),
              searchTerm,
              {
                keys: ['displayName'],
              }
            ).map((member) => {
              const isSelected = owners.find(
                (address) => address === member.walletAddress
              );
              return (
                <div
                  key={member.id}
                  className={
                    isSelected
                      ? 'py-2 px-3 cursor-pointer bg-gray-900 hover:bg-gray-800 border-transparent border-l-2 border-sapien'
                      : 'py-2 px-3 cursor-pointer bg-gray-900 hover:bg-gray-800 border-transparent border-l-2'
                  }
                  onClick={() => {
                    if (isSelected) {
                      setValue(
                        'owners',
                        owners.filter(({ id }) => id !== member.id)
                      );
                    } else {
                      setValue('owners', [...owners, member.walletAddress]);
                    }
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {member.avatar && (
                        <img
                          className="w-5 h-5 rounded-full flex-shrink-0"
                          src={member.avatar}
                          alt={member.displayName}
                        />
                      )}
                      {!member.avatar && member.displayName && (
                        <div className="bg-sapien-neutral-200 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center">
                          {member.displayName[0].toUpperCase()}
                        </div>
                      )}
                      {member.displayName}
                    </div>
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

export default MembersForm;
