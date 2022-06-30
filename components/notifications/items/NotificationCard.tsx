// hooks
import { ProfileTribeChannel } from 'tools/types/tribe';

// types
import { useRoomDetails } from 'hooks/room';

interface Props {
  children: React.ReactElement;
  tribe: Partial<ProfileTribeChannel>;
  roomId?: string;
}

const NotificationCard = ({ children, tribe, roomId = null }: Props) => {
  const room = useRoomDetails(roomId);

  return (
    <div className="flex flex-col bg-sapien-neutral-400 rounded-xl mb-4">
      {tribe.name && (
        <div className="flex flex-row p-3">
          {tribe.avatar ? (
            <img
              className="w-16 h-16 rounded-lg text-gray-400 bg-gray-900 group-hover:text-gray-500"
              alt={''}
              src={tribe.avatar}
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-gray-700 font-bold text-black group-hover:text-gray-500 flex items-center justify-center">
              {tribe.name[0].toUpperCase()}
            </div>
          )}
          <div className="flex flex-col justify-center sm:ml-2">
            <h1 className="text-m text-left sm:text-left font-semibold">
              {tribe.name}
            </h1>
            <h2
              className={`${
                room?.name ? 'visible' : 'invisible'
              } text-xs text-gray-500 mb-4 sm:mb-0`}
            >
              {room?.name}
            </h2>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default NotificationCard;
