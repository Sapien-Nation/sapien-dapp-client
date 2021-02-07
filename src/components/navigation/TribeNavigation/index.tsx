import { useState } from 'react';

// types
import type { Theme } from '@material-ui/core/styles';

// next
import Image from 'next/image';

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
      background: 'inherit',
      height: theme.spacing(4.5),
      width: theme.spacing(4.5),
      color: white,
      borderRadius: 10,
      border: `2px solid ${outline}`
    },
    avatarImage: {
      padding: `${theme.spacing(0.3)} !important`,
      borderRadius: '9px'
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
      anchor="left"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
      variant="permanent"
    >
      <nav className={classes.nav}>
        <Box display="flex" padding={2}>
          <TribeName />
          <Typography style={{ marginLeft: '1.5rem' }} variant="h5">
            {navigation?.tribe?.name}
          </Typography>
        </Box>
        <Box display="flex" padding={2}>
          <BadgeStore />
          <Typography style={{ marginLeft: '1.5rem' }} variant="h5">
            Badge Store
          </Typography>
        </Box>
        <Box
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          px={2}
          py={1}
        >
          <Box alignItems="center" display="flex">
            <Typography variant="h5">Channels</Typography>
            <IconButton
              aria-label="add channels"
              classes={{
                root: classes.addChannelButton
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <IconButton
            disableRipple
            aria-label="show channels"
            classes={{
              root: classes.collapseButton
            }}
            style={{
              transform: showChannels ? '' : 'rotate(180deg)'
            }}
            onClick={() => setShowChannels(!showChannels)}
          >
            <ArrowIcon />
          </IconButton>
        </Box>
        <Collapse unmountOnExit in={showChannels} timeout="auto">
          {navigation?.tribe?.channels.map((channel) => (
            <Box
              key={channel.id}
              display="flex"
              justifyContent="space-between"
              px={2}
              py={1}
              onClick={() => setNavigation({ ...navigation, channel })}
            >
              <Box display="flex">
                <Avatar
                  alt={channel.name}
                  classes={{
                    root: classes.avatar
                  }}
                  variant="square"
                >
                  <Image
                    className={classes.avatarImage}
                    height={40}
                    src={channel.image}
                    width={40}
                  />
                </Avatar>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
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
