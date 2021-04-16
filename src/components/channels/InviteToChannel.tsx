import { useSnackbar } from 'notistack';
import { useState } from 'react';

// types
import type { Channel } from 'tools/types/channel';
import type { User } from 'tools/types/user';

// api
import axios from 'api';

// components
import Dialog from 'components/dialog';
import Invite, { formKey } from 'components/invite';
import Query from 'components/query';

interface Props {
  onClose: () => void;
  channel: Channel;
}

const InviteToChannel = ({ channel, onClose }: Props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [inviteCount, setInviteCount] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const handleInvite = async (invites) => {
    setIsFetching(true);
    try {
      await axios.post('/api/channels/invite', { invites });
      enqueueSnackbar('Invites Sent');
      onClose();
    } catch ({ response }) {
      enqueueSnackbar(response.data.message);
    }
    setIsFetching(false);
  };

  return (
    <Dialog
      fullWidth
      open
      confirmDisabled={inviteCount === 0}
      confirmLabel={`Send Invites (${inviteCount})`}
      form={formKey}
      isFetching={isFetching}
      maxWidth="md"
      title="Invite members to channel"
      onClose={onClose}
    >
      <Query apiUrl={`/api/channels/invite/${channel.id}`}>
        {({ users }: { users: Array<User> }) => {
          return (
            <Invite
              action={handleInvite}
              subtitle="TRIBE MEMBERS SELECTED"
              title="CHOOSE TRIBE MEMBERS TO INVITE"
              users={users}
              onInvite={setInviteCount}
            />
          );
        }}
      </Query>
    </Dialog>
  );
};

export default InviteToChannel;
