import useSWR from 'swr';

// mui
import { Box, makeStyles } from '@material-ui/core';

// context
import { useAuth } from 'context/user';

// components
import { Navbar, Sidebar } from 'components/navigation';
import { Redirect } from 'components/common';

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
  container: ({ isLoggedIn }: { isLoggedIn: boolean }) => ({
    display: isLoggedIn ? 'grid' : 'block',
    gridTemplateAreas: "'main widgets'",
    gridTemplateColumns: 'auto 290px',
  }),
}));

const Layout = ({ children }: Props) => {
  const { me } = useAuth();
  useSWR('/api/v3/profile/tribes', { initialData: [] });
  const classes = useStyles({ isLoggedIn: Boolean(me) });

  if (me === undefined) return <></>;

  if (me === null) return <Redirect to="/register" />;

  return (
    <div className={classes.root}>
      <Sidebar />
      <main>
        <Navbar />
        <Box className={classes.container}>{children}</Box>
      </main>
    </div>
  );
};

export default Layout;
