import { XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

// hooks
import { useRoomDetails } from 'hooks/room';

const Details = ({ handleSidebar }) => {
  const { query } = useRouter();
  const { members } = useRoomDetails(query.viewID as string);

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
          {members.map(({ avatar, displayName, id }, index) => {
            return (
              <li
                data-testid="room-detail-member"
                key={id}
                className="flex gap-2 items-center mb-4 cursor-pointer"
                onClick={() => {
                  // if (me.id === id) {ss
                  //   setDialog(Dialog.Profile);
                  // } else {
                  //   setSelectedProfile(id);
                  //   setDialog(Dialog.PublicProfile);
                  // }
                }}
              >
                {avatar ? (
                  <img
                    className="w-10 h-10 rounded-full flex-shrink-0"
                    src={avatar}
                    alt=""
                  />
                ) : (
                  <div className="bg-sapien-neutral-200 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center">
                    {displayName ? displayName[0].toUpperCase() : 'A'}
                  </div>
                )}
                <span>
                  {displayName || 'No Name'}{' '}
                  <span className="text-xs">
                    {index === 0 ? '(Admin)' : ''}
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
