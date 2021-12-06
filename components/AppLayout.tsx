import { tw } from 'twind';
import Link from 'next/link';
import { useRouter } from 'next/router';

// components
import { Query, Redirect } from 'components/common';

// context
import { useAuth } from 'context/user';

// types
import type { ProfileTribe } from 'tools/types/tribe';

interface Props {
  children: React.ReactElement;
}

const AppLayout = ({ children }: Props) => {
  const { me } = useAuth();
  const { pathname } = useRouter();

  // Auth Pages
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/logout') ||
    pathname.startsWith('/forgot') ||
    pathname.startsWith('/change-password')
  ) {
    return children;
  }

  if (me === null) {
    return <Redirect path="/login" />;
  }

  if (me) {
    return (
      <div className={tw`relative`}>
        <Query api="/api/v3/profile/tribes">
          {(tribes: Array<ProfileTribe>) => (
            <>
              <main>{children}</main>
              <Link href="/logout">
                <a>Logout</a>
              </Link>
            </>
          )}
        </Query>
      </div>
    );
  }

  return <></>;
};

export default AppLayout;
