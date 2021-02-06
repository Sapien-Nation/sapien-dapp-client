// types
import type { Tribe } from 'types/tribe';
import type { Theme } from '@material-ui/core/styles';

// context
import { useNavigation } from 'context/tribes';

// styles
import { dark, darkPurple, white } from 'styles/colors';

// mui
import {
  Avatar,
  Badge,
  Box,
  createStyles,
  Drawer,
  makeStyles
} from '@material-ui/core';
import {
  AddRounded as AddIcon,
  ExploreRounded as ExploreIcon
} from '@material-ui/icons';

const drawerWidth = 72;

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: dark
    },
    nav: {
      cursor: 'pointer',
      gridArea: 'sidebar',
      marginTop: `${theme.spacing(2)}`
    },
    avatar: {
      height: theme.spacing(4.5),
      width: theme.spacing(4.5),
      color: white,
      borderRadius: 10,
      border: '2px solid',
      '& img': {
        padding: `${theme.spacing(0.3)}`,
        borderRadius: '9px'
      }
    },
    badge: {
      top: '4px',
      height: theme.spacing(1.9),
      width: theme.spacing(2),
      fontSize: theme.spacing(1),
      border: `3px solid ${dark}`
    },
    avatarItems: {
      color: white,
      backgroundColor: 'rgba(249, 249, 250, 0.1)',
      borderRadius: '9px',
      '& svg': {
        padding: `${theme.spacing(0.3)}`
      }
    }
  });
});

interface Props {
  tribes: Array<Tribe>;
  setShowCreateTribeModal: () => void;
}

const TribeBar: React.FC<Props> = ({ tribes, setShowCreateTribeModal }) => {
  const [navigation, setNavigation] = useNavigation();
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
        {tribes.map((tribe) => (
          <Box
            display="flex"
            justifyContent="center"
            marginBottom={2}
            key={tribe.id}
            onClick={() => setNavigation({ ...navigation, tribe })}
          >
            <Badge
              classes={{
                badge: classes.badge
              }}
              badgeContent={tribe.notificationNumber}
              color="error"
            >
              <Avatar
                alt={tribe.name}
                src={tribe.image}
                style={{
                  borderColor:
                    tribe.id === navigation?.tribe?.id ? white : darkPurple
                }}
                variant="square"
                classes={{
                  root: classes.avatar
                }}
                imgProps={{
                  width: '4rem',
                  height: '4rem'
                }}
              />
            </Badge>
          </Box>
        ))}
        <Box display="flex" justifyContent="center" marginBottom={2}>
          <Avatar
            alt="Discover Tribe"
            variant="square"
            classes={{
              root: classes.avatarItems
            }}
            imgProps={{
              width: '4rem',
              height: '4rem'
            }}
          >
            <ExploreIcon />
          </Avatar>
        </Box>
        <Box
          onClick={setShowCreateTribeModal}
          display="flex"
          justifyContent="center"
          marginBottom={2}
        >
          <Avatar
            alt="Create Tribe"
            variant="square"
            classes={{
              root: classes.avatarItems
            }}
            imgProps={{
              width: '4rem',
              height: '4rem'
            }}
          >
            <AddIcon />
          </Avatar>
        </Box>
      </nav>
    </Drawer>
  );
};

export default TribeBar;
