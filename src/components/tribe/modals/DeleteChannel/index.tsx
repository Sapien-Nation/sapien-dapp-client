import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// mui
import { Box, Typography } from '@material-ui/core';

//components
import Dialog from 'components/dialog';
import { Switch } from 'components/form';
import MigrateChannelContent from './MigrateChannelContent';

// styles
import { darkGrey } from 'styles/colors';

interface Props {
  onClose: () => void;
}

const DeleteChannel = ({ onClose }: Props) => {
  const [showMigrate, setShowMigrate] = useState(false);
  const [isDisabled, toggleIsDisabled] = useState(true);
  const methods = useForm({
    shouldUnregister: false,
  });

  const { clearErrors, errors, handleSubmit } = methods;

  const handleFormSubmit = async () => {
    onClose();
  };

  const onCancel = () => {
    clearErrors();
    onClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowMigrate(event.target.checked);
  };

  const form = 'delete-channel';

  return (
    <Dialog
      open
      cancelLabel="Delete Channel"
      confirmLabel="Migrate and Delete"
      form={form}
      isFetching={isDisabled}
      maxWidth="sm"
      title={<Typography variant="h2">Deleting “Our Trips”</Typography>}
      onCancel={onCancel}
      onClose={onClose}
    >
      <Box>
        <Typography
          style={{
            color: darkGrey,
            lineHeight: '2.6rem',
          }}
          variant="h4"
        >
          When you delete your channel all published content will be deleted and
          cannot be recovered. <br />
          Would you like to migrate the content instead?
        </Typography>
      </Box>
      <FormProvider {...methods}>
        <form id={form} onSubmit={handleSubmit(handleFormSubmit)}>
          <Box margin="2.6rem 0">
            <Switch
              errors={errors}
              label="Migrate content"
              name="migrate"
              onChange={handleChange}
            />
          </Box>
          {showMigrate && (
            <MigrateChannelContent toggleIsDisabled={toggleIsDisabled} />
          )}
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default DeleteChannel;
