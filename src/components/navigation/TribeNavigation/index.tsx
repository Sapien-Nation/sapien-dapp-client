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
    padding: '2.5rem 0.5rem',
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
            { name: 'PoliticsSquare', id: 'sqr-1' },
            { name: 'SportsSquare', id: 'sqr-2' },
            { name: 'SportsSquare', id: 'sqr-3' },
            { name: 'TravelSquare', id: 'sqr-4' },
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
              id: 'channel-1',
              name: 'Politics',
              lastUpdateAt: '2021-08-09T04:35:15.149Z',
              avatarImage:
                'https://images.pexels.com/photos/3505000/pexels-photo-3505000.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=40&w=40',
              image:
                'https://images.pexels.com/photos/3505000/pexels-photo-3505000.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
              membersCount: 227,
            },
            {
              id: 'channel-2',
              name: 'Foodies',
              lastUpdateAt: '2021-08-09T04:35:15.149Z',
              avatarImage:
                'https://images.pexels.com/photos/8698547/pexels-photo-8698547.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=40&w=40',
              image:
                'https://images.pexels.com/photos/8698547/pexels-photo-8698547.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              membersCount: 227,
            },
            {
              id: 'channel-3',
              name: 'Our trips',
              lastUpdateAt: '2021-08-09T04:35:15.149Z',
              avatarImage:
                'https://images.pexels.com/photos/8651513/pexels-photo-8651513.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=40&w=40',
              image:
                'https://images.pexels.com/photos/8651513/pexels-photo-8651513.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
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
        <DirectMessages
          messages={[
            {
              id: 'msg-1',
              name: 'Ollie Hampton',
              lastUpdateAt: '2021-08-09T04:35:15.149Z',
              avatarImage: 'https://material-ui.com/static/images/avatar/1.jpg',
              message: 'Let’s go!',
            },
            // {
            //   id: '2',
            //   name: 'Michael Perry',
            //   lastUpdateAt: '2021-08-09T04:35:15.149Z',
            //   avatarImage: 'https://material-ui.com/static/images/avatar/2.jpg',
            //   message: 'Let’s go!',
            // },
            // {
            //   id: '3',
            //   name: 'Amanda Ben...',
            //   lastUpdateAt: '2021-08-09T04:35:15.149Z',
            //   avatarImage: 'https://material-ui.com/static/images/avatar/3.jpg',
            //   message: 'Let’s go!',
            // },
          ]}
        />
      </Section>
    </Drawer>
  );
};

export default TribeNavigation;
