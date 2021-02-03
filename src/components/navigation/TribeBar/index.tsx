import { useState } from 'react';

// types
import { Tribe } from 'types/tribe';
import { Theme } from '@material-ui/core/styles';

// context
import { useTribeNavigation } from 'context/tribes';

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
      height: '4.5rem',
      width: '4.5rem',
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
      height: '1.9rem',
      width: '2rem',
      fontSize: '1rem',
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
  setShowCreateTribeModal: (show: boolean) => void;
}

const TribeBar: React.FC<Props> = ({ tribes, setShowCreateTribeModal }) => {
  const [tribeNavigation, setTribeNavigation] = useTribeNavigation();
  const classes = useStyles();

  return (
    <>
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
              marginBottom="2rem"
              key={tribe.id}
              onClick={() => setTribeNavigation(tribe)}
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
                      tribe.id === tribeNavigation?.id ? white : darkPurple
                  }}
                  variant="square"
                  classes={{
                    root: classes.avatar
                  }}
                />
              </Badge>
            </Box>
          ))}
          <Box display="flex" justifyContent="center" marginBottom="2rem">
            <Avatar
              alt="Discover Tribe"
              variant="square"
              classes={{
                root: classes.avatarItems
              }}
            >
              <ExploreIcon />
            </Avatar>
          </Box>
          <Box
            onClick={() => setShowCreateTribeModal(true)}
            display="flex"
            justifyContent="center"
            marginBottom="2rem"
          >
            <Avatar
              alt="Create Tribe"
              variant="square"
              classes={{
                root: classes.avatarItems
              }}
            >
              <AddIcon />
            </Avatar>
          </Box>
        </nav>
      </Drawer>
    </>
  );
};

export default TribeBar;
