// mui
import { Box, CssBaseline, NoSsr, makeStyles } from '@material-ui/core';

// Providers
import { WalletProvider } from 'context/wallet';

// context
import { useAuth } from 'context/user';

// components
import { Navbar, Sidebar } from 'components/navigation';

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
      <CssBaseline />
      <NoSsr>
        <Sidebar />
      </NoSsr>
      <main>
        <WalletProvider>
          <Navbar />
        </WalletProvider>
        <Box paddingRight={29}>{children}</Box>
      </main>
    </div>
  );
};

export default Layout;
