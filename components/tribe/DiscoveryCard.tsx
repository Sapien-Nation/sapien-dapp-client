import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

// api
import { joinTribe } from 'api/tribe';

// hooks
import { useToast } from 'context/toast';

// types
import type { DiscoveryTribe, ProfileTribe } from 'tools/types/tribe';
import { useState } from 'react';

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
      const response = await joinTribe(tribe.id);

      mutate(
        '/core-api/user/tribes',
        (tribes: Array<ProfileTribe>) => [
          tribes[0],
          {
            ...response,
            rooms: [],
          },
          ...tribes.slice(1),
        ],
        false
      );

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
      className={
        isFetching
          ? 'animate-pulse relative rounded-xl flex-1 h-320 bg-sapien-neutral-600 hover:bg-sapien-neutral-600/40 cursor-pointer flex flex-col'
          : 'relative rounded-xl flex-1 h-320 bg-sapien-neutral-600 hover:bg-sapien-neutral-600/40 cursor-pointer flex flex-col'
      }
    >
      <button
        onClick={handleJoinTribe}
        aria-label="Join"
        className="absolute w-full h-full"
      />
      <div className="flex-1">
        <div className="shadow-md hover:shadow-3xl rounded-lg relative">
          {tribe.cover ? (
            <img
              className="w-full rounded-xl -mb-16 h-20 object-cover flex-shrink-0"
              src={tribe.cover}
              alt=""
            />
          ) : (
            <div className="w-full h-20 rounded-xl -mb-16 flex-shrink-0 bg-sapien-neutral-400" />
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
        <div className="px-3 mt-2">
          <h1 className="text-lg font-bold">{tribe.name}</h1>
          <p className="text-gray-400 overflow-hidden h-150">
            {tribe.description || '[No Description]'}
          </p>
          <span className="text-xs">
            {tribe.membersCount} {tribe.membersCount > 1 ? 'members' : 'member'}
          </span>
        </div>
      </div>
    </li>
  );
};

export default DiscoveryCard;
