import { XIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useRouter } from 'next/router';

// components
import { ProfileDialog, PublicProfileDialog } from 'components/profile';

// context
import { useAuth } from 'context/user';

// hooks
import { useRoomDetails } from 'hooks/room';

enum Dialog {
  Profile,
  PublicProfile,
}

const Details = ({ handleSidebar }) => {
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const { me } = useAuth();
  const { query } = useRouter();
  const { members } = useRoomDetails(query.viewID as string);

  return (
    <>
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
                  className="flex gap-2 items-center mb-4"
                  onClick={() => {
                    if (me.id === id) {
                      setDialog(Dialog.Profile);
                    } else {
                      setSelectedProfile(id);
                      setDialog(Dialog.PublicProfile);
                    }
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
                      {displayName[0].toUpperCase()}
                    </div>
                  )}
                  <span>
                    {displayName}{' '}
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

      {/* Dialogs */}
      {dialog === Dialog.Profile && (
        <ProfileDialog onClose={() => setDialog(null)} />
      )}

      {dialog === Dialog.PublicProfile && (
        <PublicProfileDialog
          onClose={() => setDialog(null)}
          profileID={selectedProfile}
        />
      )}
    </>
  );
};

export default Details;
