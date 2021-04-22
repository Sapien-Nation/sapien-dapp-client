import { useSnackbar } from 'notistack';
import { useState } from 'react';

// types
import type { User } from 'tools/types/user';
import type { Tribe } from 'tools/types/tribe';

// api
import axios from 'api';

// components
import Dialog from 'components/dialog';
import Invite, { formKey } from 'components/invite';
import { Query } from 'components/common';

interface Props {
  link: string;
  onClose: () => void;
  tribe: Tribe;
}

const InviteToTribe = ({ link, onClose, tribe }: Props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [inviteCount, setInviteCount] = useState(0);

  const { enqueueSnackbar } = useSnackbar();

  const handleInvite = async (invites) => {
    setIsFetching(true);
    try {
      await axios.post('/api/tribes/invite', { invites });
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
      title="Invite to tribe"
      onClose={onClose}
    >
      <Query apiUrl={`/api/tribes/invite/${tribe.id}`}>
        {({ users }: { users: Array<User> }) => {
          return (
            <Invite
              action={handleInvite}
              link={link}
              title="CHOOSE SAPIENS TO INVITE"
              users={users}
              onInvite={setInviteCount}
            />
          );
        }}
      </Query>
    </Dialog>
  );
};

export default InviteToTribe;
