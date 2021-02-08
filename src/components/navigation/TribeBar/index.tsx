// types
import type { Tribe } from 'types/tribe';
import type { Theme } from '@material-ui/core/styles';

// next
import Image from 'next/image';

// context
import { useNavigation } from 'context/tribes';

// styles
import { dark, darkPurple, white } from 'styles/colors';

// mui
import {
  Avatar,
  Badge,
  Box,
  Button,
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
      backgroundColor: 'inherit',
      borderRadius: 10,
      border: '2px solid'
    },
    avatarImage: {
      padding: `${theme.spacing(0.3)} !important`,
      borderRadius: '9px'
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
      anchor="left"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
      variant="permanent"
    >
      <nav aria-label="Tribe Bar" className={classes.nav}>
        <div role="list">
          {tribes.map((tribe) => (
            <Box
              key={tribe.id}
              aria-label={tribe.name}
              display="flex"
              justifyContent="center"
              marginBottom={2}
              role="listitem"
              onClick={() => setNavigation({ ...navigation, tribe })}
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
                  imgProps={{
                    width: '4rem',
                    height: '4rem'
                  }}
                  style={{
                    borderColor:
                      tribe.id === navigation?.tribe?.id ? white : darkPurple
                  }}
                  variant="square"
                >
                  <Image
                    alt={tribe.name}
                    className={classes.avatarImage}
                    height={40}
                    src={tribe.image}
                    width={40}
                  />
                </Avatar>
              </Badge>
            </Box>
          ))}
        </div>
        <div style={{ display: 'grid', gap: '20px', justifyContent: 'center' }}>
          <Button aria-label="Discover Tribes" onClick={() => {}}>
            <Avatar
              alt="Discover Tribe"
              classes={{
                root: classes.avatarItems
              }}
              imgProps={{
                width: '4rem',
                height: '4rem'
              }}
              variant="square"
            >
              <ExploreIcon />
            </Avatar>
          </Button>
          <Button aria-label="Create Tribe" onClick={setShowCreateTribeModal}>
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
          </Button>
        </div>
      </nav>
    </Drawer>
  );
};

export default TribeBar;
