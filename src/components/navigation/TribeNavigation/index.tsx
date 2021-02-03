// types
import { Tribe } from 'types/tribe';
import { Theme } from '@material-ui/core/styles';

// mui
import {
  createStyles,
  Drawer,
  makeStyles,
  Box,
  Typography
} from '@material-ui/core';

// icons
import { BadgeStore, TribeName } from 'components/navigation/assets/svg';

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
interface Props {
  tribes?: Array<Tribe>;
}

const TribeNavigation: React.FC<Props> = () => {
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
        <Box display="flex" padding="2rem">
          <TribeName />
          <Box marginLeft="1.5rem">
            <Typography variant="h5">Tribe Name</Typography>
          </Box>
        </Box>
        <Box display="flex" padding="2rem">
          <BadgeStore />
          <Box marginLeft="1.5rem">
            <Typography variant="h5">Badge Store</Typography>
          </Box>
        </Box>
      </nav>
    </Drawer>
  );
};

export default TribeNavigation;
