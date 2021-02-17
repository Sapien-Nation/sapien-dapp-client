import { useState } from 'react';

// types
import type { Theme } from '@material-ui/core/styles';
import type { Tribe } from 'types/tribe';

// next
import Image from 'next/image';

// constants
import { NavigationTypes } from 'context/tribes';

// mui
import {
  Avatar,
  Box,
  createStyles,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  makeStyles,
  Typography
} from '@material-ui/core';

// context
import { useNavigation } from 'context/tribes';

// styles
import { background, black, darkGrey, outline, purple, white } from 'styles/colors';

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
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: `${theme.spacing(1.5)}`
    },
    avatar: {
      color: white,
      backgroundColor: 'inherit',
      borderRadius: 15,
      border: `2px solid ${outline}`,
      boxSizing: 'content-box',
      padding: '3px'
    },
    avatarImage: {
      borderRadius: '10px'
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

interface Props {
  createChanel: () => void;
  tribes: Array<Tribe>;
}

const TribeNavigation: React.FC<Props> = ({ createChanel, tribes }) => {
  const [navigation, setNavigation] = useNavigation();
  const [showChannels, setShowChannels] = useState(true);

  const classes = useStyles();

  const tribe: Tribe = tribes.find(({ id }) => id === navigation.main?.id);

  if (tribe === undefined) return null;

  return (
    <Drawer
      anchor="left"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
      variant="permanent"
    >
      <List aria-label="Tribe Navigation" className={classes.nav} component="nav">
        <ListItem
          button
          disableGutters
          disableRipple
          style={{
            margin: '.65rem',
            display: 'flex',
            padding: '1.5rem',
            backgroundColor:
              navigation?.secondary === navigation?.main?.id ? purple : white,
            borderRadius: '1rem'
          }}
          onClick={() =>
            setNavigation({
              secondary: navigation?.main?.id,
              type: NavigationTypes.Tribe
            })
          }
        >
          <TribeName
            // @ts-ignore
            fill={navigation?.secondary === navigation?.main?.id ? white : darkGrey}
          />
          <Typography
            style={{
              marginLeft: '1.5rem',
              color:
                navigation?.secondary === navigation?.main?.id ? white : darkGrey
            }}
            variant="h5"
          >
            {navigation?.main?.name}
          </Typography>
        </ListItem>
        <ListItem
          button
          disableGutters
          disableRipple
          style={{
            margin: '.65rem',
            display: 'flex',
            padding: '1.5rem',
            backgroundColor:
              navigation?.secondary === 'Badge Store' ? purple : white,
            borderRadius: '1rem'
          }}
          onClick={() =>
            setNavigation({
              secondary: 'Badge Store',
              type: NavigationTypes.BadgeStore
            })
          }
        >
          <BadgeStore
            // @ts-ignore
            fill={navigation?.secondary === 'Badge Store' ? white : darkGrey}
          />
          <Typography
            style={{
              marginLeft: '1.5rem',
              color: navigation?.secondary === 'Badge Store' ? white : darkGrey
            }}
            variant="h5"
          >
            Badge Store
          </Typography>
        </ListItem>
        <ListItem disableGutters component="div">
          <Box
            alignItems="center"
            display="flex"
            justifyContent="space-between"
            px={2}
            py={1}
            width="100%"
          >
            <Box alignItems="center" display="flex">
              <Typography variant="h5">Channels</Typography>
              <IconButton
                aria-label="add channels"
                classes={{
                  root: classes.addChannelButton
                }}
                onClick={createChanel}
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
        </ListItem>
        <Collapse
          unmountOnExit
          in={showChannels && Boolean(tribe.channels?.length)}
          style={{ width: '100%' }}
          timeout="auto"
        >
          <List aria-label="Channels list" role="list">
            {tribe.channels.map((channel) => (
              <ListItem
                key={channel.id}
                button
                disableGutters
                disableRipple
                component="li"
                onClick={() =>
                  setNavigation({
                    secondary: channel.id,
                    type: NavigationTypes.Channel
                  })
                }
              >
                <Box
                  aria-label={channel.name}
                  display="flex"
                  justifyContent="space-between"
                  role="listitem"
                  style={{
                    margin: '0 .65rem',
                    padding: '1rem',
                    width: '100%',
                    color: navigation?.secondary === channel.id ? white : darkGrey,
                    backgroundColor:
                      navigation?.secondary === channel.id ? purple : white,
                    borderRadius: '1rem'
                  }}
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
                        alt={channel.name}
                        className={classes.avatarImage}
                        height={40}
                        quality={100}
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
                      <Typography
                        style={{
                          color: navigation?.secondary === channel.id ? white : black
                        }}
                        variant="body1"
                      >
                        {channel.name}
                      </Typography>
                      <Typography
                        style={{
                          color:
                            navigation?.secondary === channel.id ? white : darkGrey
                        }}
                        variant="body2"
                      >
                        {channel.memberCount} members
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    style={{
                      color: navigation?.secondary === channel.id ? white : darkGrey
                    }}
                    variant="body2"
                  >
                    {formatTimestampToRelative(channel.lastUpdate)}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default TribeNavigation;
