import Link from 'next/link';
import { useRouter } from 'next/router';

// components
import Channels from './Channels';
import Section from './Section';
import Squares from './Squares';
import DirectMessages from './DirectMessages';

// hooks
import { getTribes } from 'hooks';

// mui
import {
  Drawer,
  List,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Groups } from '@material-ui/icons';

// styles
import { neutral, primary } from 'styles/colors';

const useStyles = makeStyles(() => ({
  drawerPaper: {
    backgroundColor: 'white',
    borderRight: 'none',
    left: 72,
    width: 228,
  },
  listItemSelected: {
    backgroundColor: `${primary[800]} !important`,
    '& .MuiTypography-root, & .MuiSvgIcon-root': {
      color: `#fff !important`,
    },
  },
}));

const TribeNavigation = () => {
  const tribes = getTribes();
  const classes = useStyles();
  const { asPath, query } = useRouter();

  const { squareID } = query;
  const selectedTribe = tribes.find(
    ({ mainSquareId, name }) => mainSquareId === squareID || name === squareID
  );

  return (
    <Drawer
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
      style={{
        width: 228,
      }}
      variant="permanent"
    >
      <List aria-label="Tribe Navigation">
        <Link href={`/client/${selectedTribe?.mainSquareId}`}>
          <a style={{ alignItems: 'center', display: 'flex' }}>
            <ListItem
              classes={{
                selected: classes.listItemSelected,
              }}
              selected={asPath?.includes(`/client/${squareID}`)}
              style={{
                borderRadius: 10,
                margin: '1rem .5rem',
                padding: '1rem 1.5rem',
              }}
            >
              <Groups fontSize="small" style={{ color: neutral[500] }} />
              <Typography
                style={{
                  marginLeft: 15,
                }}
                variant="caption"
              >
                {selectedTribe?.name.toUpperCase()}
              </Typography>
            </ListItem>
          </a>
        </Link>
      </List>
      <Section
        showAction={false}
        title="Squares"
        onClick={() => console.log('TODO not POC')}
      >
        <Squares
          squares={[
            { name: 'PoliticsSquare', id: '1' },
            { name: 'SportsSquare', id: '2' },
            { name: 'SportsSquare', id: '3' },
            { name: 'TravelSquare', id: '4' },
          ]}
        />
      </Section>
      <Section
        showAction={false}
        title="Channels"
        onClick={() => console.log('TODO not POC')}
      >
        <Channels
          channels={[
            {
              id: '1',
              name: 'Politics',
              lastUpdateAt: '2021-08-09T04:35:15.149Z',
              avatarImage:
                'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
              image:
                'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
              membersCount: 227,
            },
            {
              id: '2',
              name: 'Foodies',
              lastUpdateAt: '2021-08-09T04:35:15.149Z',
              avatarImage:
                'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
              image:
                'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
              membersCount: 227,
            },
            {
              id: '3',
              name: 'Our trips',
              lastUpdateAt: '2021-08-09T04:35:15.149Z',
              avatarImage:
                'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
              image:
                'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
              membersCount: 4,
            },
          ]}
        />
      </Section>
      <Section
        showAction={false}
        title="My Messages"
        onClick={() => console.log('TODO not POC')}
      >
        <DirectMessages />
      </Section>
    </Drawer>
  );
};

export default TribeNavigation;
