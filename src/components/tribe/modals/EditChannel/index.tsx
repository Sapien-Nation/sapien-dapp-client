import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// mui
import { Tabs, Tab as MUITab, Typography } from '@material-ui/core';

//components
import Dialog from 'components/dialog';

enum Tab {
  Settings,
  Badges,
  RSS,
}

interface Props {
  onClose: () => void;
}

const EditChannel = ({ onClose }: Props) => {
  const [tab, setTab] = useState(Tab.Settings);
  const methods = useForm({
    shouldUnregister: false,
  });

  const { handleSubmit, clearErrors } = methods;

  const handleFormSubmit = async () => {
    console.log('Channel Edited!');
    onClose();
  };

  const onCancel = () => {
    clearErrors();
    onClose();
  };

  const form = 'edit-channel';

  const renderForm = () => {
    switch (tab) {
      case Tab.Settings:
        return 'TODO SETTINGS';
        break;
      case Tab.Badges:
        return 'TODO BADGES';
        break;
      case Tab.RSS:
        return 'TODO RSS';
        break;
    }
  };

  return (
    <Dialog
      open
      confirmLabel="Save Changes"
      form={form}
      maxWidth="sm"
      title={<Typography variant="h2">Edit Channel</Typography>}
      onCancel={onCancel}
      onClose={onClose}
    >
      <Tabs
        aria-label="Edit-Channel-Tabs"
        value={tab}
        onChange={(_: unknown, value) => setTab(value)}
      >
        <MUITab
          aria-controls="edit-channel-tabpanel-0"
          id="edit-channel-tab-0"
          label="Channel Settings"
        />
        <MUITab
          aria-controls="edit-channel-tabpanel-1"
          id="edit-channel-tab-1"
          label="Badges"
        />
        <MUITab
          aria-controls="edit-channel-tabpanel-2"
          id="edit-channel-tab-2"
          label="RSS Feeds"
        />
      </Tabs>
      <FormProvider {...methods}>
        <form id={form} onSubmit={handleSubmit(handleFormSubmit)}>
          {renderForm()}
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default EditChannel;
