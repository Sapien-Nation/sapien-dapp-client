// mui
import { CssBaseline, NoSsr, makeStyles } from '@material-ui/core';

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
  const me = null;
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
