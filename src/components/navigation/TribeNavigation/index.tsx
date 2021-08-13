import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

// components
import Channels from './Channels';
import Section from './Section';
import Squares from './Squares';
import DirectMessages from './DirectMessages';
import { CreateChannelModal } from 'components/navigation';

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

enum ModalType {
  Channel,
  Square,
}

const TribeNavigation = () => {
  const tribes = getTribes();
  const classes = useStyles();
  const [modal, setModal] = useState<ModalType | null>(null);
  const { asPath, query } = useRouter();

  const { squareID } = query;
  const selectedTribe = tribes.find(
    ({ mainSquareId, name }) => mainSquareId === squareID || name === squareID
  );

  // TODO fix this
  if (!selectedTribe) return <></>;

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
              selected={asPath === `/client/${squareID}`}
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
        <Squares squares={[]} />
      </Section>
      <Section
        showAction
        title="Channels"
        onClick={() => setModal(ModalType.Channel)}
      >
        <Channels channels={selectedTribe.channels} />
      </Section>
      <Section
        showAction={false}
        title="My Messages"
        onClick={() => console.log('TODO not POC')}
      >
        <DirectMessages messages={[]} />
      </Section>
      {modal === ModalType.Channel && (
        <CreateChannelModal
          squareID={selectedTribe.mainSquareId}
          tribeId={selectedTribe.id}
          onClose={() => setModal(null)}
        />
      )}
    </Drawer>
  );
};

export default TribeNavigation;
