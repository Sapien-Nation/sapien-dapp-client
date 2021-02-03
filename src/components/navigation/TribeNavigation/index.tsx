// types
import type { Theme } from '@material-ui/core/styles';

// mui
import {
  Box,
  createStyles,
  Drawer,
  makeStyles,
  Typography
} from '@material-ui/core';

// assets
import { BadgeStore, TribeName } from '../assets/svg';

const drawerWidth = 228;

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      left: '72px',
      width: drawerWidth,
      backgroundColor: 'white',
      borderRight: 'none'
    },
    nav: {
      cursor: 'pointer',
      gridArea: 'sidebar',
      marginTop: `${theme.spacing(2)}`
    }
  });
});

const TribeNavigation = () => {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="left"
    >
      <nav className={classes.nav}>
        <Box display="flex" padding={2}>
          <TribeName />
          <Box marginLeft={1.5}>
            <Typography variant="h5">Tribe Name</Typography>
          </Box>
        </Box>
        <Box display="flex" padding={2}>
          <BadgeStore />
          <Box marginLeft={1.5}>
            <Typography variant="h5">Badge Store</Typography>
          </Box>
        </Box>
      </nav>
    </Drawer>
  );
};

export default TribeNavigation;
