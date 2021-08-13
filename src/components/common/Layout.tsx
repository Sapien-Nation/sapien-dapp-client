// mui
import { CssBaseline, NoSsr, makeStyles } from '@material-ui/core';

// Providers
import { WalletProvider } from 'context/wallet';

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
    <div className={classes.root}>
      <Query api="/api/v3/profile/tribes" loader={<LayoutSkeleton />}>
        {() => (
          <>
            <CssBaseline />
            <NoSsr>
              <Sidebar />
            </NoSsr>
            <main>
              <WalletProvider>
                <Navbar />
              </WalletProvider>
              <div>{children}</div>
            </main>
          </>
        )}
      </Query>
    </div>
  );
};

export default Layout;
