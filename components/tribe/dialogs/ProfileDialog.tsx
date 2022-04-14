// components
import { Dialog } from 'components/common';

interface Props {
  profileID: string;
  onClose: () => void;
}

const ProfileDialog = ({ profileID, onClose }: Props) => {
  return (
    <Dialog show isFetching={false} onClose={onClose}>
      <div className="bg-sapien-neutral-600 rounded-xl mb-4 bg-gray-900">
        <div className="bg-gradient-to-r bg-sapien-neutral-200 h-28 shadow-md rounded-lg relative flex justify-center items-center py-4" />
        <div className="flex flex-col md:flex-row py-4">
          <div className="relative ml-4 flex flex-col items-center">
            <div className="w-20 h-20 -mt-16 rounded-full flex-shrink-0 bg-sapien-neutral-200 shadow shadow-sapien-neutral-600 flex items-center justify-center font-extrabold text-xl">
              user
            </div>
            <h1 className="text-md mt-2">johndoe</h1>
          </div>
        </div>
        <h2 className="text-sm mb-2">User info</h2>
        <div className="border-t border-gray-800 pt-4">
          <p className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </Dialog>
  );
};

export default ProfileDialog;
