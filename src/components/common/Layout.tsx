import { useRouter } from 'next/router';

// mui
import { CssBaseline, NoSsr, makeStyles } from '@material-ui/core';

// context
import { useAuth } from 'context/user';

// components
import { Navbar, Sidebar } from 'components/navigation';
import { LayoutSkeleton, Redirect, Query } from 'components/common';

interface Props {
  children: React.ReactNode;
}

const useStyles = makeStyles(() => ({
  root: ({
    isLoggedIn,
    isDiscoveryPage,
  }: {
    isLoggedIn: boolean;
    isDiscoveryPage: boolean;
  }) => ({
    display: isLoggedIn ? 'grid' : 'block',
    gridTemplateAreas: "'sidebar sidebar main'",
    gridTemplateColumns: `72px ${isDiscoveryPage ? '15' : '228'}px auto`,
    minHeight: '100vh',
    backgroundColor: '#fff',
  }),
}));

const Layout = ({ children }: Props) => {
  const { me } = useAuth();
  const { asPath } = useRouter();
  const isDiscoveryPage = Boolean(asPath.includes('discovery'));
  const classes = useStyles({ isLoggedIn: Boolean(me), isDiscoveryPage });

  if (me === undefined) return <></>;

  if (me === null) return <Redirect to="/register" />;

  return (
    <>
      <CssBaseline />
      <Query api="/api/v3/profile/tribes" loader={<LayoutSkeleton />}>
        {() => (
          <div className={classes.root}>
            <NoSsr>
              <Sidebar />
            </NoSsr>
            <main>
              <Navbar />
              <div>{children}</div>
            </main>
          </div>
        )}
      </Query>
    </>
  );
};

export default Layout;
