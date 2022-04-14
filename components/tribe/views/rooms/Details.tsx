// context
import { useAuth } from 'context/user';

interface RoomMember {
  avatar: string;
  displayName: string;
  id: string;
}

const Details = () => {
  const { me } = useAuth();
  const members: Array<RoomMember> = [
    { id: me.id, displayName: me.displayName, avatar: me.avatar },
  ];

  return (
    <aside className="w-72 h-full overflow-auto border-l border-gray-700">
      <div className="">
        <div className="border-b border-gray-700 h-10 px-5 mb-5 w-full flex items-center">
          <h3 className="text-md  text-sapien-neutral-400 font-bold ">
            Members ({members.length})
          </h3>
        </div>
        <ul className="px-5">
          {members.map(({ avatar, displayName, id }) => {
            return (
              <li key={id} className="flex gap-2 items-center mb-4">
                <img
                  className="w-10 h-10 rounded-full flex-shrink-0"
                  src={avatar}
                  alt=""
                />
                <span>{displayName}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Details;
