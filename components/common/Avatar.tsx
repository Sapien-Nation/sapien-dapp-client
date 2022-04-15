// context
import { useAuth } from 'context/user';

const Avatar = () => {
  const { me } = useAuth();

  return (
    <div className="bg-sapien-neutral-200 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center">
      {me.displayName[0].toUpperCase()}
    </div>
  );
};

export default Avatar;
