import { useState } from 'react';

// types
import type { Theme } from '@material-ui/core/styles';

// mui
import {
  Avatar,
  Box,
  createStyles,
  Collapse,
  Drawer,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core';

// context
import { useNavigation } from 'context/tribes';

// styles
import { background, outline, white } from 'styles/colors';

// assets
import { AddIcon, ArrowIcon, BadgeStore, TribeName } from '../assets/svg';

// utils
import { formatTimestampToRelative } from 'utils/date';

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
      marginTop: `${theme.spacing(1.5)}`
    },
    avatar: {
      height: theme.spacing(4.5),
      width: theme.spacing(4.5),
      color: white,
      borderRadius: 10,
      border: `2px solid ${outline}`,
      '& img': {
        padding: `${theme.spacing(0.3)}`,
        borderRadius: '9px'
      }
    },
    collapseButton: {
      padding: 0
    },
    addChannelButton: {
      padding: `${theme.spacing(0.6)}`,
      marginLeft: `${theme.spacing(1)}`,
      backgroundColor: background
    }
  });
});

const TribeNavigation: React.FC = () => {
  const [navigation, setNavigation] = useNavigation();
  const [showChannels, setShowChannels] = useState(true);

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
          <Typography variant="h5" style={{ marginLeft: '1.5rem' }}>
            {navigation?.tribe?.name}
          </Typography>
        </Box>
        <Box display="flex" padding={2}>
          <BadgeStore />
          <Typography variant="h5" style={{ marginLeft: '1.5rem' }}>
            Badge Store
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={2}
          py={1}
        >
          <Box display="flex" alignItems="center">
            <Typography variant="h5">Channels</Typography>
            <IconButton
              classes={{
                root: classes.addChannelButton
              }}
              aria-label="add channels"
            >
              <AddIcon />
            </IconButton>
          </Box>
          <IconButton
            disableRipple
            aria-label="show channels"
            style={{
              transform: showChannels ? '' : 'rotate(180deg)'
            }}
            classes={{
              root: classes.collapseButton
            }}
            onClick={() => setShowChannels(!showChannels)}
          >
            <ArrowIcon />
          </IconButton>
        </Box>
        <Collapse in={showChannels} timeout="auto" unmountOnExit>
          {navigation?.tribe?.channels.map((channel) => (
            <Box
              display="flex"
              py={1}
              px={2}
              justifyContent="space-between"
              key={channel.id}
              onClick={() => setNavigation({ ...navigation, channel })}
            >
              <Box display="flex">
                <Avatar
                  alt={channel.name}
                  src={channel.image}
                  variant="square"
                  classes={{
                    root: classes.avatar
                  }}
                  imgProps={{
                    height: '4rem',
                    width: '4rem'
                  }}
                />
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  marginLeft={1.2}
                >
                  <Typography variant="body1">{channel.name}</Typography>
                  <Typography variant="body2">
                    {channel.memberCount} members
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2">
                {formatTimestampToRelative(channel.lastUpdate)}
              </Typography>
            </Box>
          ))}
        </Collapse>
      </nav>
    </Drawer>
  );
};

export default TribeNavigation;
