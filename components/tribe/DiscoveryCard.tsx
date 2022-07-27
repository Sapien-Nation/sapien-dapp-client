import { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

// api
import { joinTribe } from 'api/tribe';

// hooks
import { useToast } from 'context/toast';

// types
import type { DiscoveryTribe } from 'tools/types/tribe';

interface Props {
  tribe: DiscoveryTribe;
}

const DiscoveryCard = ({ tribe }: Props) => {
  const [isFetching, setIsFetching] = useState(false);

  const toast = useToast();
  const { push } = useRouter();
  const { mutate } = useSWRConfig();

  const handleJoinTribe = async () => {
    setIsFetching(true);
    try {
      await joinTribe(tribe.id);

      await mutate('/core-api/user/tribes');

      push(`/tribes/${tribe.id}/home`);
    } catch (error) {
      toast({
        message: error,
      });
    }

    setIsFetching(false);
  };

  return (
    <li
      aria-label={tribe.name}
      className={`relative rounded-xl flex-1 h-320 bg-sapien-neutral-600 hover:bg-sapien-neutral-600/40 cursor-pointer flex flex-col ${
        tribe.isUpgraded ? 'border-2 border-sapien-60' : ''
      }`}
    >
      <div className="flex-1">
        <div className="shadow-md hover:shadow-3xl rounded-lg relative">
          {tribe.cover ? (
            <img
              className="w-full rounded-t-xl -mb-16 h-28 object-cover flex-shrink-0"
              src={tribe.cover}
              alt=""
            />
          ) : (
            <div className="w-full h-28 rounded-t-xl -mb-16 flex-shrink-0 bg-sapien-neutral-400" />
          )}
        </div>
        <div className="relative">
          {tribe.avatar ? (
            <img
              className="w-20 h-20 ml-4 rounded-xl flex-shrink-0"
              src={tribe.avatar}
              alt=""
            />
          ) : (
            <div className="w-20 h-20 ml-4 rounded-xl flex-shrink-0 bg-sapien-40 shadow shadow-sapien-neutral-600" />
          )}
        </div>
        <div className="flex flex-col justify-between px-3 mt-2 h-3/6">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <h1 className="text-lg font-bold gap-2">{tribe.name}</h1>
              {tribe.isUpgraded === true && (
                <CheckCircleIcon className="w-5 h-5 text-sapien-80" />
              )}
            </div>
            <span className="text-xs">
              {tribe.membersCount}{' '}
              {tribe.membersCount > 1 ? 'members' : 'member'}
            </span>
          </div>
          <p className="text-gray-400 overflow-auto truncate">
            {tribe.description || '[No Description]'}
          </p>
          <div className="flex justify-end">
            <button
              onClick={handleJoinTribe}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-primary hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
            >
              {isFetching ? 'Joining' : 'Join'}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default DiscoveryCard;
