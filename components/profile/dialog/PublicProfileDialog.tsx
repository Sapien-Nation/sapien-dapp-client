// components
import { Dialog, Query } from 'components/common';

// types
import { PublicProfile } from 'tools/types/user';

interface Props {
  profileID: string;
  onClose: () => void;
}

const PublicProfileDialog = ({ profileID, onClose }: Props) => {
  return (
    <Dialog show isFetching={false} onClose={onClose}>
      <Query api={`/api/v3/user/${profileID}`}>
        {(profile: PublicProfile) => (
          <div className="bg-sapien-neutral-600 rounded-xl mb-4">
            <div className="bg-gradient-to-r bg-sapien-neutral-200 h-28 shadow-md rounded-lg relative flex justify-center items-center py-4" />
            <div className="flex flex-col md:flex-row py-4">
              <div className="relative ml-4 flex flex-col items-center">
                <div className="w-20 h-20 -mt-16 rounded-full flex-shrink-0 bg-sapien-neutral-200 shadow shadow-sapien-neutral-600 flex items-center justify-center font-extrabold text-xl">
                  user
                </div>
                <h1 className="text-md mt-2">{profile.displayName}</h1>
              </div>
            </div>
            <h2 className="text-sm mb-2">User info</h2>
            <div className="border-t border-gray-800 pt-4">
              <p className="text-xs text-gray-400">{profile.bio}</p>
            </div>
          </div>
        )}
      </Query>
    </Dialog>
  );
};

export default PublicProfileDialog;
