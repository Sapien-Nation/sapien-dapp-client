import { useState } from 'react';

// types
import type { Theme } from '@material-ui/core/styles';

// next
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

// hooks
import { useFollowedTribes } from 'hooks';

// mui
import {
  createStyles,
  Drawer,
  List,
  makeStyles,
  Typography,
} from '@material-ui/core';

// styles
import { darkGrey, white } from 'styles/colors';

// assets
import { BadgeStore, TribeName } from '../assets/svg';

// components
const CreateChannel = dynamic<any>(
  () => import('components/channels/CreateChannel'),
  {
    ssr: false,
  }
);
const CreateSquare = dynamic<any>(
  () => import('components/squares/CreateSquare'),
  {
    ssr: false,
  }
);

import Channels from './Channels';
import Squares from './Squares';
import NavigationItem from './NavigationItem';
import NavigationList from './NavigationList';

const drawerWidth = 228;

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      left: '72px',
      width: drawerWidth,
      backgroundColor: 'white',
      borderRight: 'none',
    },
    nav: {
      cursor: 'pointer',
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: `${theme.spacing(1.5)}`,
    },
  });
});

enum Dialog {
  CreateChannel,
  CreateSquare,
}

const TribeNavigation = () => {
  const [dialog, setDialog] = useState<null | Dialog>(null);
  const { asPath, query } = useRouter();
  const { tribes } = useFollowedTribes();
  const { tribeid } = query;
  const classes = useStyles();

  if (!tribeid) return null;

  const tribe = tribes.find(({ id }) => id === tribeid);

  return (
    <Drawer
      anchor="left"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      variant="permanent"
    >
      <List
        aria-label="Tribe Navigation"
        className={classes.nav}
        component="nav"
      >
        <NavigationItem
          isSelected={asPath === `/client/${tribeid}`}
          to={`/client/${tribeid}`}
        >
          <>
            <TribeName
              // @ts-ignore
              fill={asPath === `/client/${tribeid}` ? white : darkGrey}
            />
            <Typography
              style={{
                marginLeft: '1.5rem',
                color: asPath === `/client/${tribeid}` ? white : darkGrey,
              }}
              variant="captionItem"
            >
              TODO
            </Typography>
          </>
        </NavigationItem>
        <NavigationItem
          isSelected={asPath === `/client/${tribeid}/store`}
          to={`/client/${tribeid}/store`}
        >
          <>
            <BadgeStore
              fill={asPath === `/client/${tribeid}/store` ? white : darkGrey}
            />
            <Typography
              style={{
                marginLeft: '1.5rem',
                color: asPath === `/client/${tribeid}/store` ? white : darkGrey,
              }}
              variant="captionItem"
            >
              Badge Store
            </Typography>
          </>
        </NavigationItem>
        <NavigationList
          showAction={tribe.permissions.canAddSquare}
          title="Squares"
          onClick={() => setDialog(Dialog.CreateSquare)}
        >
          <Squares squares={tribe.squares} />
        </NavigationList>
        <NavigationList
          showAction={tribe.permissions.canAddChannel}
          title="Channels"
          onClick={() => setDialog(Dialog.CreateChannel)}
        >
          <Channels channels={tribe.channels} />
        </NavigationList>
      </List>
      {dialog === Dialog.CreateChannel && (
        <CreateChannel onClose={() => setDialog(null)} />
      )}
      {dialog === Dialog.CreateSquare && (
        <CreateSquare onClose={() => setDialog(null)} />
      )}
    </Drawer>
  );
};

export default TribeNavigation;
