// components
import { Dialog, UserAvatar } from 'components/common';

// context
import { useAuth } from 'context/user';

interface Props {
  onClose: () => void;
}

const ProfileDialog = ({ onClose }: Props) => {
  const { me } = useAuth();

  return (
    <Dialog
      show
      onClose={onClose}
      confirmLabel="Update"
      cancelLabel="Close"
      showCancel={false}
      showConfirm={false}
    >
      <div className="rounded-xl mb-4 bg-transparent">
        <div className="bg-gradient-to-r bg-transparent h-28 shadow-md rounded-lg relative flex justify-center items-center py-4" />
        <div className="flex flex-col md:flex-row py-4 bg-transparent rounded-b-xl mb-4">
          <div className="relative ml-4 flex flex-col items-center">
            <UserAvatar user={me} />
            <h1 className="text-md mt-2">{me.username}</h1>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProfileDialog;
