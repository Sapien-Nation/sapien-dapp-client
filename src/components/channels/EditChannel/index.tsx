import { useState } from 'react';

// types
import type { Channel } from 'tools/types/channel';

// mui
import { makeStyles, Tabs, Tab as MUITab } from '@material-ui/core';

//components
import Dialog from 'components/dialog';
import RSS from './tabs/RSS';
import Settings from './tabs/Settings';
import Query from 'components/query';

enum View {
  Badges,
  Settings,
  RSS,
}

interface Props {
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  tabs: {
    marginBottom: theme.spacing(1.6),
  },
}));

export const formKey = 'edit-channel';
const EditChannel = ({ onClose }: Props) => {
  const [view, setView] = useState(View.Settings);
  const classes = useStyles();

  const renderForm = ({ channel }: { channel: Channel }) => {
    switch (view) {
      case View.Settings:
        return (
          <Settings channel={channel} formKey={formKey} onClose={onClose} />
        );
      case View.Badges:
        return 'TODO';
      case View.RSS:
        return <RSS channel={channel} formKey={formKey} onClose={onClose} />;
    }
  };

  return (
    <Dialog
      open
      confirmLabel="Save Changes"
      form={formKey}
      maxWidth="sm"
      title="Edit Channel"
      onClose={onClose}
    >
      <Query apiUrl="/api/channels/details">
        {({ channel }: { channel: Channel }) => (
          <>
            <Tabs
              aria-label="Edit-Channel-Tabs"
              className={classes.tabs}
              value={view}
              onChange={(_: unknown, value: View | null) => setView(value)}
            >
              <MUITab
                aria-controls="edit-channel-tabpanel-0"
                id="edit-channel-tab-0"
                label="Channel Settings"
                value={View.Settings}
              />
              <MUITab
                aria-controls="edit-channel-tabpanel-1"
                id="edit-channel-tab-1"
                label="Badges"
                value={View.Badges}
              />
              <MUITab
                aria-controls="edit-channel-tabpanel-2"
                id="edit-channel-tab-2"
                label="RSS Feeds"
                value={View.RSS}
              />
            </Tabs>
            {renderForm({ channel })}
          </>
        )}
      </Query>
    </Dialog>
  );
};

export default EditChannel;
