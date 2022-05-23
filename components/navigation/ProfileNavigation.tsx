import Link from 'next/link';
import { useRouter } from 'next/router';

// context
import { useAuth } from 'context/user';

const DiscoveryNavigation = () => {
  const { asPath, query } = useRouter();
  const { me } = useAuth();
  return (
    <div className="w-full">
      <div>
        <h1 className="font-semibold text-gray-300 text-sm px-1">
          PROFILE SETTING
        </h1>
        <div className="gap-2 mt-5 h-10 font-bold relative w-full cursor-pointer tracking-wide items-center uppercase text-sm flex rounded-lg focus:outline-none px-2 py-2 bg-sapien-neutral-800">
          {me?.avatar ? (
            <img
              src={me.avatar}
              alt={me.displayName}
              className="w-6 rounded-full"
            />
          ) : (
            <div className="bg-sapien-neutral-200 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center">
              {me.username[0].toUpperCase()}
            </div>
          )}
          <span>@{me.username}</span>
        </div>
        <nav className="mt-2 flex flex-col pl-1 py-2 cursor-pointer -mr-2 space-y-1">
          <Link href="/profile" passHref>
            <a
              className={
                asPath === '/profile'
                  ? 'text-gray-300 text-sm bg-sapien-neutral-800 rounded-l-md flex px-2 py-1 items-center font-semibold'
                  : 'text-gray-300 text-sm hover:bg-sapien-neutral-800 rounded-l-md flex px-2 py-1 items-center'
              }
            >
              General
            </a>
          </Link>
          <Link href="/profile/passport" passHref>
            <a
              className={
                asPath === '/profile/passport'
                  ? 'text-gray-300 text-sm bg-sapien-neutral-800 rounded-l-md flex px-2 py-1 items-center font-semibold'
                  : 'text-gray-300 text-sm hover:bg-sapien-neutral-800 rounded-l-md flex px-2 py-1 items-center'
              }
            >
              Passport
            </a>
          </Link>
          <Link href="/profile/badges" passHref>
            <a
              className={
                asPath === '/profile/badges'
                  ? 'text-gray-300 text-sm bg-sapien-neutral-800 rounded-l-md flex px-2 py-1 items-center font-semibold'
                  : 'text-gray-300 text-sm hover:bg-sapien-neutral-800 rounded-l-md flex px-2 py-1 items-center'
              }
            >
              Badges
            </a>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default DiscoveryNavigation;
