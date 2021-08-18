import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

// components
import Channels from './Channels';
import Section from './Section';
import Squares from './Squares';
import DirectMessages from './DirectMessages';
import CreateChannelModal from 'components/channel/CreateChannelModal';
import CreateSquareModal from 'components/square/CreateSquareModal';
import { ComingSoon } from 'components/common';

// hooks
import { getTribes } from 'hooks';

// mui
import { Box, Drawer, makeStyles, Typography } from '@material-ui/core';
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
    alignItems: 'center',
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
  const [showPreviewSquare, setShowPreviewSquare] = useState(false);
  const [showPreviewChannel, setShowPreviewChannel] = useState(false);
  const { query } = useRouter();
  // to test Comingsoon make this'true'
  const showPreview = false;

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
      <Link href={`/client/${selectedTribe?.mainSquareId}`}>
        <a style={{ display: 'block' }}>
          <Box
            alignItems="center"
            borderRadius={10}
            className={classes.listItemSelected}
            display="flex"
            paddingX={1.5}
            paddingY={1}
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
          </Box>
        </a>
      </Link>
      <Section
        showAction
        title="Squares"
        onClick={() =>
          showPreview
            ? setShowPreviewSquare(!showPreviewSquare)
            : setModal(ModalType.Square)
        }
      >
        <Squares squares={selectedTribe.squares} />
      </Section>

      <ComingSoon open={showPreviewSquare}>
        {/* TODO define a better children, Section can't be used */}
        <div></div>
      </ComingSoon>

      <Section
        showAction
        title="Channels"
        onClick={() =>
          showPreview
            ? setShowPreviewChannel(!showPreviewChannel)
            : setModal(ModalType.Channel)
        }
      >
        <Channels channels={selectedTribe.channels} />
      </Section>

      <ComingSoon open={showPreviewChannel}>
        {/* TODO define a better children, Section can't be used */}
        <div></div>
      </ComingSoon>

      <Section showAction={false} title="My Messages" onClick={() => {}}>
        <DirectMessages messages={[]} />
      </Section>

      {modal === ModalType.Channel && (
        <CreateChannelModal
          squareID={selectedTribe.mainSquareId}
          tribeId={selectedTribe.id}
          onClose={() => setModal(null)}
        />
      )}

      {modal === ModalType.Square && (
        <CreateSquareModal
          squareID={selectedTribe.mainSquareId}
          onClose={() => setModal(null)}
        />
      )}
    </Drawer>
  );
};

export default TribeNavigation;
