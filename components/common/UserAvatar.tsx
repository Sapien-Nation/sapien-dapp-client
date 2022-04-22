// context
import { useAuth } from 'context/user';

// types
import type { User, UserPassport } from 'tools/types/user';

interface Props {
  user: User;
  passport?: UserPassport;
}

const UserAvatar = ({ user, passport }: Props) => {
  if (passport.image) {
    return (
      <img
        className="w-10 h-10 rounded-full flex-shrink-0"
        src={passport.image}
        alt=""
      />
    );
  }

  if (user.avatar) {
    return (
      <img
        className="w-10 h-10 rounded-full flex-shrink-0"
        src={user.avatar}
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

export default UserAvatar;
