import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// mui
import { Tabs, Tab, Typography } from '@material-ui/core';

//components
import Dialog from 'components/dialog';

enum TabList {
  Settings,
  Badges,
  RSS,
}

interface Props {
  onClose: () => void;
}

const EditChannel = ({ onClose }: Props) => {
  const [tab, setTab] = useState(TabList.Settings);
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
    let view;
    switch (tab) {
      case TabList.Settings:
        view = 'TODO SETTINGS';
        break;
      case TabList.Badges:
        view = 'TODO BADGES';
        break;
      case TabList.RSS:
        view = 'TODO RSS';
        break;
    }
    return (
      <>
        <Tabs
          aria-label="Edit-Channel-Tabs"
          value={tab}
          onChange={(event: React.ChangeEvent<Event>, value) => setTab(value)}
        >
          <Tab
            aria-controls="edit-channel-tabpanel-0"
            id="edit-channel-tab-0"
            label="Channel Settings"
          />
          <Tab
            aria-controls="edit-channel-tabpanel-1"
            id="edit-channel-tab-1"
            label="Badges"
          />
          <Tab
            aria-controls="edit-channel-tabpanel-2"
            id="edit-channel-tab-2"
            label="RSS Feeds"
          />
        </Tabs>
        {view}
      </>
    );
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
      <FormProvider {...methods}>
        <form id={form} onSubmit={handleSubmit(handleFormSubmit)}>
          {renderForm()}
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default EditChannel;
