/* istanbul ignore file */
import { useState } from 'react';

// api
import axios from 'api';

// next
import dynamic from 'next/dynamic';

// constants
import { NavigationTypes } from 'context/tribes';

// context
import { useAuth } from 'context/user';
import { useNavigation } from 'context/tribes';

// icons
import EditIcon from '@material-ui/icons/Edit';

// mui
import { Box, IconButton } from '@material-ui/core';

// components
const EditChannel = dynamic<any>(() =>
  import('components/tribe/modals').then((mod) => mod.EditChannel)
);
import Layout from './Layout';

export enum Dialog {
  EditChannel,
}

const IndexPage = () => {
  const { me } = useAuth();
  const [navigation] = useNavigation();
  const [dialog, setDialog] = useState<Dialog | null>(null);

  const handleError = async () => {
    try {
      await axios.post('/api/tribes/error');
    } catch (err) {
      console.log(err);
      //
    }
  };

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
        return 'TRIBES FEED';
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
        {me && <button onClick={handleError}>Try Error</button>}
      </div>
    </Layout>
  );
};

export default IndexPage;
