import { useState } from 'react';
import { useSnackbar } from 'notistack';

// types
import type { Channel } from 'tools/types/channel';

// api
import axios from 'api';

// mui
import { Box, Typography } from '@material-ui/core';

// types
import type { Tribe } from 'tools/types/tribe';

//components
import Dialog from 'components/dialog';
import MigrateContent from './MigrateContent';
import { Switch } from 'components/form';
import Query from 'components/query';

interface Props {
  channel: Channel;
  onClose: () => void;
}

const DeleteChannel = ({ channel, onClose }: Props) => {
  const [showMigrate, setShowMigrate] = useState(false);
  const [channelToMigrate, setChannelToMigrate] = useState<Channel | null>(
    null
  );
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowMigrate(event.target.checked);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/channels/delete', {
        channelID: channel.id,
        channelToMigrate: channelToMigrate?.id ?? null,
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
      confirmDisabled={showMigrate ? channelToMigrate === null : false}
      confirmLabel={showMigrate ? 'Migrate and Delete' : 'Delete'}
      form={form}
      maxWidth="sm"
      title={`Deleting "${channel.name}"`}
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
                aria-label="Migrate Content"
                label="Migrate content"
                name="migrate"
                onChange={handleChange}
              />
            </Box>
            {showMigrate && (
              <MigrateContent
                channelToMigrate={channelToMigrate}
                setChannelToMigrate={setChannelToMigrate}
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
