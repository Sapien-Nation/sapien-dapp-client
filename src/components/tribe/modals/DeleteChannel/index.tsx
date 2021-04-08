import { useState } from 'react';
import { useSnackbar } from 'notistack';

// types
import type { Channel } from 'tools/types/channel';

// api
import axios from 'api';

// mui
import { Box, Typography } from '@material-ui/core';

// context
import { useNavigation } from 'context/tribes';

// types
import type { Tribe } from 'tools/types/tribe';

//components
import Dialog from 'components/dialog';
import MigrateContent from './MigrateContent';
import { Switch } from 'components/form';
import Query from 'components/query';

interface Props {
  onClose: () => void;
}

const DeleteChannel = ({ onClose }: Props) => {
  const [showMigrate, setShowMigrate] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [navigation] = useNavigation();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowMigrate(event.target.checked);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/channels/delete', {
        channelID: navigation.secondary,
        channelToMigrate: selectedChannel.id,
      });
      onClose();
    } catch ({ response }) {
      enqueueSnackbar(response.data.message);
    }
  };

  const form = 'delete-channel';
  return (
    <Dialog
      open
      cancelLabel="Delete Channel"
      confirmDisabled={showMigrate ? selectedChannel === null : false}
      confirmLabel="Migrate and Delete"
      form={form}
      maxWidth="sm"
      title={<Typography variant="h2">Deleting “Our Trips”</Typography>}
      onClose={onClose}
      onConfirm={handleSubmit}
    >
      <Query apiUrl="/api/tribes/followed" loader={null}>
        {({ tribes }: { tribes: Array<Tribe> }) => (
          <>
            <Typography variant="h4">
              When you delete your channel all published content will be deleted
              and cannot be recovered. <br />
              Would you like to migrate the content instead?
            </Typography>
            <Box paddingX={0} paddingY={2.6}>
              <Switch
                label="Migrate content"
                name="migrate"
                onChange={handleChange}
              />
            </Box>
            {showMigrate && (
              <MigrateContent
                selectedChannel={selectedChannel}
                setSelectedChannel={setSelectedChannel}
                tribes={tribes}
              />
            )}
          </>
        )}
      </Query>
    </Dialog>
  );
};

export default DeleteChannel;
