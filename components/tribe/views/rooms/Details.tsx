import { useRouter } from 'next/router';

// hooks
import { useRoomDetails } from 'hooks/room';

const Details = () => {
  const { query } = useRouter();

  const { members } = useRoomDetails(query.viewID as string);

  return (
    <aside className="w-72 h-full overflow-auto border-l border-gray-700">
      <>
        <div className="border-b border-gray-700 h-10 px-5 mb-5 w-full flex items-center">
          <h3 className="text-md  text-sapien-neutral-400 font-bold ">
            Members ({members.length})
          </h3>
        </div>
        <ul className="px-5">
          {members.map(({ avatar, displayName, id }) => {
            return (
              <li key={id} className="flex gap-2 items-center mb-4">
                {avatar ? (
                  <img
                    className="w-10 h-10 rounded-full flex-shrink-0"
                    src={avatar}
                    alt=""
                  />
                ) : (
                  <div className="bg-sapien-neutral-200 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center">
                    {displayName[0].toUpperCase()}
                  </div>
                )}
                <span>{displayName}</span>
              </li>
            );
          })}
        </ul>
      </>
    </aside>
  );
};

export default Details;
