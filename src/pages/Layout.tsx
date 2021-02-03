/* istanbul ignore file */
// mui
import { makeStyles } from '@material-ui/core';

interface Props {
  children: React.ReactNode;
}

const useStyles = makeStyles(() => ({
  root: () => ({
    display: 'grid',
    gridTemplateAreas: "'sidebar main'",
    gridTemplateColumns: '72px 228px auto',
    height: '100vh',
    width: '100vw'
  })
}));

const Layout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default Layout;
