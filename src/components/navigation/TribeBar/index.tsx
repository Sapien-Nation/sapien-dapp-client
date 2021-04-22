// types
import type { Theme } from '@material-ui/core/styles';

// next
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

// hooks
import { useFollowedTribes } from 'hooks';

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
  makeStyles,
} from '@material-ui/core';
import {
  AddRounded as AddIcon,
  ExploreRounded as ExploreIcon,
} from '@material-ui/icons';

const drawerWidth = 72;

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: dark,
    },
    nav: {
      cursor: 'pointer',
      '& > *': {
        minHeight: theme.spacing(7),
        justifyContent: 'center',
      },
    },
    avatar: {
      color: white,
      backgroundColor: 'inherit',
      borderRadius: 15,
      border: '2px solid',
      boxSizing: 'content-box',
      padding: '3px',
    },
    avatarImage: {
      borderRadius: '10px',
    },
    badge: {
      fontSize: theme.spacing(1),
      top: '6px',
      minWidth: theme.spacing(1.5),
      border: `3px solid ${dark}`,
      height: theme.spacing(1.3),
      boxSizing: 'content-box',
      padding: 0,
    },
    avatarItems: {
      backgroundColor: 'inherit',
      borderRadius: 15,
      border: `2px ${darkPurple} solid`,
      boxSizing: 'content-box',
      padding: '3px',
      '& svg': {
        padding: `${theme.spacing(0.3)}`,
      },
    },
  });
});

interface Props {
  createTribe: () => void;
}

const TribeBar = ({ createTribe }: Props) => {
  const { asPath, query } = useRouter();
  const { tribeid } = query;
  const { tribes } = useFollowedTribes();

  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
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
          >
            <Link href={`/client/${tribe.id}`}>
              <Badge
                badgeContent="0"
                classes={{
                  badge: classes.badge,
                }}
                color="error"
              >
                <Avatar
                  alt={tribe.name}
                  classes={{
                    root: classes.avatar,
                  }}
                  style={{
                    borderColor: tribe.id === tribeid ? white : darkPurple,
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
            </Link>
          </ListItem>
        ))}
        <ListItem
          button
          disableGutters
          disableRipple
          aria-label="Discover Tribes"
        >
          <Link href="/discovery">
            <Badge
              badgeContent={0}
              classes={{
                badge: classes.badge,
              }}
              color="error"
            >
              <Avatar
                alt="Discover Tribe"
                classes={{
                  root: classes.avatarItems,
                }}
                imgProps={{
                  width: '4rem',
                  height: '4rem',
                }}
                style={{
                  borderColor: asPath === '/discovery' ? white : darkPurple,
                }}
                variant="square"
              >
                <ExploreIcon />
              </Avatar>
            </Badge>
          </Link>
        </ListItem>
        <ListItem
          button
          disableRipple
          aria-label="Create Tribe"
          onClick={createTribe}
        >
          <Avatar
            alt="Create Tribe"
            classes={{
              root: classes.avatarItems,
            }}
            imgProps={{
              width: '4rem',
              height: '4rem',
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
