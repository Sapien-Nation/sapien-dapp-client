// context
import { useAuth } from 'context/user';

// types
import type { User } from 'tools/types/user';
import type { ContentOwner } from 'tools/types/content';

interface Props {
  user: User;
}

const Avatar = ({ user }: Props) => {
  if (user.avatar) {
    return (
      <img
        className="w-10 h-10 rounded-full flex-shrink-0"
        src={user.avatar}
        alt=""
      />
    );
  }

  if (user.passport) {
    return (
      <img
        className="w-10 h-10 rounded-full flex-shrink-0"
        src={user.passport.media}
        alt=""
      />
    );
  }

  // TODO make sure backend set an empty displayName
  if (user.displayName !== ' ') {
    return (
      <div className="bg-sapien-neutral-200 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center">
        {user.displayName[0].toUpperCase()}
      </div>
    );
  }

  return (
    <div className="bg-sapien-neutral-200 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center">
      {user.username[0].toUpperCase()}
    </div>
  );
};

export default Avatar;
