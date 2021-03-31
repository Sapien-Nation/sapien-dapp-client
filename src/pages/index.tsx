/* istanbul ignore file */
import { useState } from 'react';

// next
import dynamic from 'next/dynamic';

// mui
import { Button } from '@material-ui/core';

// constants
import { NavigationTypes } from 'context/tribes';

// context
import { useNavigation } from 'context/tribes';

// icons
import EditIcon from '@material-ui/icons/Edit';

// components
const EditChannel = dynamic<any>(() =>
  import('components/tribe/modals').then((mod) => mod.EditChannel)
);
const Invite = dynamic<any>(() => import('components/tribe/modals/Invite'));
import Layout from './Layout';

export enum Dialog {
  EditChannel,
  Invite,
}

// mui
import { Box, IconButton } from '@material-ui/core';

const IndexPage = () => {
  const [navigation] = useNavigation();
  const [dialog, setDialog] = useState<Dialog | null>(null);

  const renderView = () => {
    switch (navigation.type) {
      case NavigationTypes.BadgeStore:
        return 'BADGE STORE TODO';
      case NavigationTypes.Channel:
        return (
          <Box>
            CHANNELS FEED TODO{' '}
            <IconButton
              aria-label="Edit Channel"
              onClick={() => setDialog(Dialog.EditChannel)}
            >
              <EditIcon />
            </IconButton>
            {dialog === Dialog.EditChannel && (
              <EditChannel onClose={() => setDialog(null)} />
            )}
          </Box>
        );
      case NavigationTypes.Discovery:
        return 'DISCOVERY TODO';
      case NavigationTypes.Tribe:
        return (
          <Box>
            TRIBES FEED TODO{' '}
            <Button onClick={() => setDialog(Dialog.Invite)}>Invite</Button>
            {dialog === Dialog.Invite && (
              <Invite
                link="https://sapien.com/tribes/Hx28h7atP1Y"
                onClose={() => setDialog(null)}
              />
            )}
          </Box>
        );
    }
  };

  return (
    <Layout>
      <div
        style={{
          borderRadius: '24px',
          backgroundColor: '#F9F9FA',
          padding: 40,
        }}
      >
        <h1>{renderView()}</h1>
      </div>
    </Layout>
  );
};

export default IndexPage;
