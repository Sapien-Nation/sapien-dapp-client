// types
import type { Theme } from '@material-ui/core';

// mui
import { CssBaseline, NoSsr, makeStyles } from '@material-ui/core';

// context
import { useAuth } from 'context/user';

// components
import { Navbar, Sidebar } from 'components/navigation';

interface Props {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: ({ isLoggedIn }: { isLoggedIn: boolean }) => ({
    display: isLoggedIn ? 'grid' : 'block',
    gridTemplateAreas: "'sidebar sidebar main'",
    gridTemplateColumns: '72px 228px auto',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#fff',
    '& main > div': {
      padding: theme.spacing(3.6),
    },
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
        <Navbar />
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Layout;
