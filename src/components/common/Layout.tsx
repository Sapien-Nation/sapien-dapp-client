// mui
import { CssBaseline, NoSsr, makeStyles } from '@material-ui/core';

// context
import { useAuth } from 'context/user';

// components
import { Navbar, Sidebar } from 'components/navigation';
import { LayoutSkeleton, Query } from 'components/common';

interface Props {
  children: React.ReactNode;
}

const useStyles = makeStyles(() => ({
  root: ({ isLoggedIn }: { isLoggedIn: boolean }) => ({
    display: isLoggedIn ? 'grid' : 'block',
    gridTemplateAreas: "'sidebar sidebar main'",
    gridTemplateColumns: '72px 228px auto',
    minHeight: '100vh',
    backgroundColor: '#fff',
  }),
}));

const Layout = ({ children }: Props) => {
  const { me } = useAuth();
  const classes = useStyles({ isLoggedIn: Boolean(me) });

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
