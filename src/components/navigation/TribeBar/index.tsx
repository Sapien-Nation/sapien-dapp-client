// types
import type { Tribe } from 'types/tribe';
import type { Theme } from '@material-ui/core/styles';

// next
import Image from 'next/image';

// context
import { useNavigation } from 'context/tribes';

// constants
import { NavigationTypes } from 'context/tribes';

// styles
import { dark, darkPurple, white } from 'styles/colors';

// mui
import {
  Avatar,
  Badge,
  createStyles,
  Drawer,
  List,
  ListItem,
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
      '& > *': {
        minHeight: theme.spacing(7),
        justifyContent: 'center'
      }
    },
    avatar: {
      color: white,
      backgroundColor: 'inherit',
      borderRadius: 15,
      border: '2px solid',
      boxSizing: 'content-box',
      padding: '3px'
    },
    avatarImage: {
      borderRadius: '10px'
    },
    badge: {
      fontSize: theme.spacing(1),
      top: '6px',
      minWidth: theme.spacing(1.5),
      border: `3px solid ${dark}`,
      height: theme.spacing(1.3),
      boxSizing: 'content-box',
      padding: 0
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
      anchor="left"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
      variant="permanent"
    >
      <List aria-label="Tribe Bar" className={classes.nav} component="nav">
        {tribes.map((tribe) => (
          <ListItem
            key={tribe.id}
            button
            disableGutters
            disableRipple
            aria-label={tribe.name}
            onClick={() =>
              setNavigation({
                main: tribe,
                secondary: tribe.id,
                type: NavigationTypes.Tribe
              })
            }
          >
            <Badge
              badgeContent={tribe.notificationNumber}
              classes={{
                badge: classes.badge
              }}
              color="error"
            >
              <Avatar
                alt={tribe.name}
                classes={{
                  root: classes.avatar
                }}
                style={{
                  borderColor: tribe.id === navigation?.main?.id ? white : darkPurple
                }}
                variant="square"
              >
                <Image
                  alt={tribe.name}
                  className={classes.avatarImage}
                  height={40}
                  quality={100}
                  src={tribe.image}
                  width={40}
                />
              </Avatar>
            </Badge>
          </ListItem>
        ))}
        <ListItem
          button
          disableGutters
          disableRipple
          aria-label="Discover Tribes"
          onClick={() =>
            setNavigation({
              main: null,
              secondary: null,
              type: NavigationTypes.Discovery
            })
          }
        >
          <Badge
            badgeContent={0}
            classes={{
              badge: classes.badge
            }}
            color="error"
          >
            <Avatar
              alt="Discover Tribe"
              classes={{
                root: classes.avatarItems
              }}
              imgProps={{
                width: '4rem',
                height: '4rem'
              }}
              style={{
                borderColor:
                  navigation.type === NavigationTypes.Discovery ? white : darkPurple,
                borderRadius: '9px',
                padding: '0.9rem'
              }}
              variant="square"
            >
              <ExploreIcon />
            </Avatar>
          </Badge>
        </ListItem>
        <ListItem
          button
          disableRipple
          aria-label="Create Tribe"
          onClick={setShowCreateTribeModal}
        >
          <Avatar
            alt="Create Tribe"
            classes={{
              root: classes.avatarItems
            }}
            imgProps={{
              width: '4rem',
              height: '4rem'
            }}
            variant="square"
          >
            <AddIcon aria-label="" />
          </Avatar>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default TribeBar;
