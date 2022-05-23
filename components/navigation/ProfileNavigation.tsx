import Link from 'next/link';

const DiscoveryNavigation = () => {
  return (
    <div className="w-full">
      <div>
        <span className="px-4 py-2 mt-4 text-xs w-full flex justify-between items-center uppercase text-sapien-neutral-200 font-bold">
          Profile Settings
        </span>
        <nav className="mt-2">
          <Link href="/profile" passHref>
            <a>General</a>
          </Link>
          <Link href="/profile/passport" passHref>
            <a>Passport</a>
          </Link>
          <Link href="/profile/badges" passHref>
            <a>Badges</a>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default DiscoveryNavigation;
