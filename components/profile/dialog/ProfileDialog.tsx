// components
import { Dialog } from 'components/common';

// context
import { useAuth } from 'context/user';

interface Props {
  onClose: () => void;
}

const ProfileDialog = ({ onClose }: Props) => {
  const { me } = useAuth();
  return (
    <Dialog show isFetching={false} onClose={onClose}>
      <div className="rounded-xl mb-4 bg-gray-900">
        <div className="bg-gradient-to-r bg-sapien-neutral-200 h-28 shadow-md rounded-lg relative flex justify-center items-center py-4" />
        <div className="flex flex-col md:flex-row py-4">
          <div className="relative ml-4 flex flex-col items-center">
            <div className="w-20 h-20 -mt-16 rounded-full flex-shrink-0 bg-sapien-neutral-200 shadow shadow-sapien-neutral-600 flex items-center justify-center font-extrabold text-xl">
              user
            </div>
            <h1 className="text-md mt-2">{me.displayName}</h1>
          </div>
        </div>
        <h2 className="text-sm mb-2">User info</h2>
        <div className="border-t border-gray-800 pt-4">
          <p className="text-xs text-gray-400">{me.bio}</p>
        </div>
      </div>
    </Dialog>
  );
};

export default ProfileDialog;
