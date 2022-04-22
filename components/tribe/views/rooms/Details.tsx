import { XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

// constats
import { RoomMemberType } from 'tools/constants/rooms';

// hooks
import { useRoomDetails } from 'hooks/room';

const Details = ({ handleSidebar }) => {
  const { query } = useRouter();
  const { members } = useRoomDetails(query.viewID as string);

  const renderMemberAvatar = (avatar: string, displayName: string) => {
    if (avatar) {
      return (
        <img
          className="w-10 h-10 rounded-full flex-shrink-0"
          src={avatar}
          alt=""
        />
      );
    }

    if (displayName === ' ') {
      return (
        <img
          className="w-10 h-10 rounded-full flex-shrink-0"
          src="https://d151dmflpumpzp.cloudfront.net/thumbnails/tribes/avatar/93383885-f529-46cb-9709-9421e0c7395e-110x110.png"
          alt=""
        />
      );
    }

    return (
      <div className="bg-sapien-neutral-200 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center">
        {displayName[0].toUpperCase()}
      </div>
    );
  };

  return (
    <aside className="w-72 h-full overflow-auto border-l border-gray-700">
      <div className="absolute -left-10 top-0 bg-sapien-red-700/50 lg:hidden">
        <button
          type="button"
          className="flex items-center justify-center h-10 w-10 focus:outline-none"
          onClick={handleSidebar}
        >
          <span className="sr-only">Close sidebar</span>
          <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
        </button>
      </div>
      <>
        <div className="border-b border-gray-700 h-10 px-5 mb-5 w-full flex items-center">
          <h3 className="text-md  text-sapien-neutral-400 font-bold ">
            Members ({members.length})
          </h3>
        </div>
        <ul className="px-5">
          {members.map(({ avatar, displayName, id, userType }, index) => {
            return (
              <li
                data-testid="room-detail-member"
                key={id}
                className="flex gap-2 items-center mb-4 cursor-pointer"
              >
                {renderMemberAvatar(avatar, displayName)}
                <span>
                  {displayName === ' ' ? 'Sapien User' : displayName}{' '}
                  <span className="text-xs">
                    {userType === RoomMemberType.Admin ? '(Admin)' : ''}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </>
    </aside>
  );
};

export default Details;
