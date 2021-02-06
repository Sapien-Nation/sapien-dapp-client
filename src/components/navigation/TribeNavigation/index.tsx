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
import { background, black, darkGrey, outline, white } from 'styles/colors';

// assets
import { AddIcon, ArrowIcon, BadgeStore, TribeName } from '../assets/svg';

// mocks
import type { Channel } from 'types/channel';

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
    },
    channelPrimary: {
      color: black,
      fontSize: '1.4rem'
    },
    channelSecondary: {
      color: darkGrey,
      fontSize: '1.2rem'
    }
  });
});

interface Props {
  channels: Array<Channel>;
}

const TribeNavigation: React.FC<Props> = ({ channels }) => {
  const [navigation] = useNavigation();
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
          <Box marginLeft={1.5}>
            <Typography variant="h5">{navigation?.tribe.name}</Typography>
          </Box>
        </Box>
        <Box display="flex" padding={2}>
          <BadgeStore />
          <Box marginLeft={1.5}>
            <Typography variant="h5">Badge Store</Typography>
          </Box>
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
              transform: !showChannels ? 'rotate(180deg)' : null
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
          {channels.map((channel) => (
            <Box
              display="flex"
              py={1}
              px={2}
              justifyContent="space-between"
              key={channel.id}
            >
              <Box display="flex">
                <Avatar
                  alt={channel.name}
                  src={channel.image}
                  variant="square"
                  classes={{
                    root: classes.avatar
                  }}
                />
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  marginLeft={1.2}
                >
                  <Typography
                    classes={{
                      root: classes.channelPrimary
                    }}
                  >
                    {channel.name}
                  </Typography>
                  <Typography
                    classes={{
                      root: classes.channelSecondary
                    }}
                  >
                    227 members
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography
                  classes={{
                    root: classes.channelSecondary
                  }}
                >
                  23 min
                </Typography>
              </Box>
            </Box>
          ))}
        </Collapse>
      </nav>
    </Drawer>
  );
};

export default TribeNavigation;
