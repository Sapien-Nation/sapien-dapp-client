import { useState } from 'react';

// types
import type { Theme } from '@material-ui/core/styles';
import type { Tribe } from 'tools/types/tribe';

// constants
import { NavigationTypes } from 'context/tribes';

// next
import dynamic from 'next/dynamic';

// mui
import {
  createStyles,
  Drawer,
  List,
  makeStyles,
  Typography,
} from '@material-ui/core';

// context
import { useNavigation } from 'context/tribes';

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
interface Props {
  tribes: Array<Tribe>;
}

const TribeNavigation = ({ tribes }: Props) => {
  const [dialog, setDialog] = useState<null | Dialog>(null);
  const [navigation, setNavigation] = useNavigation();
  const classes = useStyles();

  const tribe: Tribe = tribes.find(({ id }) => id === navigation.main?.id);

  if (tribe === undefined) return null;

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
          isSelected={navigation?.secondary === navigation?.main?.id}
          onClick={() =>
            setNavigation({
              secondary: navigation?.main?.id,
              type: NavigationTypes.Tribe,
            })
          }
        >
          <>
            <TribeName
              // @ts-ignore
              fill={
                navigation?.secondary === navigation?.main?.id
                  ? white
                  : darkGrey
              }
            />
            <Typography
              style={{
                marginLeft: '1.5rem',
                color:
                  navigation?.secondary === navigation?.main?.id
                    ? white
                    : darkGrey,
              }}
              variant="h5"
            >
              {navigation?.main?.name}
            </Typography>
          </>
        </NavigationItem>
        <NavigationItem
          isSelected={navigation?.type === NavigationTypes.BadgeStore}
          onClick={() =>
            setNavigation({
              secondary: 'Badge Store',
              type: NavigationTypes.BadgeStore,
            })
          }
        >
          <>
            <BadgeStore
              fill={
                navigation?.type === NavigationTypes.BadgeStore
                  ? white
                  : darkGrey
              }
            />
            <Typography
              style={{
                marginLeft: '1.5rem',
                color:
                  navigation?.type === NavigationTypes.BadgeStore
                    ? white
                    : darkGrey,
              }}
              variant="h5"
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
