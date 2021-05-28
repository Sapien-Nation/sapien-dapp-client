import { useState } from 'react';
import { useForm } from 'react-hook-form';

// mui
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  IconButton,
  Switch,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core';
import {
  Add as AddIcon,
  HelpOutlineOutlined as HelpIcon,
} from '@material-ui/icons';

//components
import { Dialog, DropZone, ChartCount } from 'components/common';

// styles
import { darkGrey } from 'styles/colors';

enum Step {
  TribeSummary = 1,
  TribeMedia,
}

interface Props {
  onClose: () => void;
}

const form = 'create-tribe';

const CreateTribeModal = ({ onClose }: Props) => {
  const [step, setStep] = useState(Step.TribeSummary);
  const methods = useForm();
  const theme = useTheme();

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    unregister,
    watch,
  } = methods;

  const handleFormSubmit = async () => {
    switch (step) {
      case Step.TribeSummary: {
        setStep(Step.TribeMedia);
        break;
      }
      default:
        break;
    }
  };

  const handleBack = () => {
    switch (step) {
      case Step.TribeSummary: {
        onClose();
        break;
      }
      case Step.TribeMedia: {
        setStep(Step.TribeSummary);
        break;
      }
    }
  };

  const renderForm = () => {
    switch (step) {
      case Step.TribeSummary: {
        return (
          <>
            <TextField
              fullWidth
              required
              inputProps={{
                ...register('name'),
                autoComplete: 'name',
                maxLength: '36',
              }}
              label={
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="buttonMedium">Name*</Typography>
                  <ChartCount control={control} maxCount={36} name="name" />
                </Box>
              }
              placeholder="Name"
            />
            <TextField
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">@</InputAdornment>
                ),
              }}
              inputProps={{
                ...register('unique_identifier'),
                autoComplete: 'unique_identifier',
                maxLength: '15',
              }}
              label={
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="buttonMedium">
                    Unique Identifier*
                  </Typography>
                  <ChartCount
                    control={control}
                    maxCount={15}
                    name="unique_identifier"
                  />
                </Box>
              }
              placeholder="Unique Identifier"
            />
            <TextField
              fullWidth
              multiline
              required
              inputProps={{
                ...register('description'),
                maxLength: '60',
              }}
              label={
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="buttonMedium">Description</Typography>
                  <ChartCount
                    control={control}
                    maxCount={60}
                    name="description"
                  />
                </Box>
              }
              maxRows={5}
              minRows={3}
              placeholder="Set brief description"
            />

            <Box
              alignItems="start"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <InputLabel htmlFor="public">
                <Box
                  alignItems="center"
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <span>Public tribe</span>
                  <IconButton aria-label="public" style={{ color: darkGrey }}>
                    <HelpIcon fontSize="small" />
                  </IconButton>
                </Box>
              </InputLabel>
              <Switch disableRipple color="default" name="public" />
            </Box>
          </>
        );
      }
      case Step.TribeMedia: {
        return (
          <>
            <FormControl fullWidth>
              <InputLabel htmlFor="avatar">Avatar</InputLabel>
              <Box height="6.4rem" marginY={1.6} width="6.4rem">
                <DropZone
                  accept="image/*"
                  errors={errors}
                  maxFiles={1}
                  maxSize={20971520}
                  name="avatar"
                  register={register}
                  render={() => {
                    return (
                      <IconButton style={{ color: darkGrey }}>
                        <AddIcon fontSize="small" />
                      </IconButton>
                    );
                  }}
                  rules={{ required: 'Avatar is required' }}
                  setValue={setValue}
                  unregister={unregister}
                  watch={watch}
                />
              </Box>
              <Typography variant="caption">
                Drag and Drop or{' '}
                <Typography color="primary" variant="caption">
                  Browse{' '}
                </Typography>
                to upload image (max 20MB)
              </Typography>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="cover">Cover image</InputLabel>
              <Box height="10rem" marginY={1.6} width="100%">
                <DropZone
                  accept="image/*"
                  errors={errors}
                  maxFiles={1}
                  maxSize={41943040}
                  name="cover"
                  register={register}
                  render={() => {
                    return (
                      <IconButton
                        style={{ color: (theme as any).palette.infoIcon.main }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    );
                  }}
                  rules={{ required: 'Cover is required' }}
                  setValue={setValue}
                  unregister={unregister}
                  watch={watch}
                />
              </Box>
              <Typography variant="caption">
                Drag and Drop or{' '}
                <Typography color="primary" variant="caption">
                  Browse{' '}
                </Typography>
                to upload image (max 40MB)
              </Typography>
            </FormControl>
          </>
        );
      }
    }
  };

  return (
    <Dialog
      open
      cancelLabel={step == Step.TribeSummary ? 'Cancel' : 'Back'}
      confirmLabel={step == Step.TribeSummary ? 'Next' : 'Create'}
      form={form}
      maxWidth="xs"
      title={
        <>
          <Typography variant="h2">New Tribe</Typography>
          <Typography variant="caption">
            <Typography color="primary" variant="caption">
              Step {step}
            </Typography>{' '}
            / 2
          </Typography>
        </>
      }
      onCancel={handleBack}
      onClose={onClose}
    >
      <form id={form} onSubmit={handleSubmit(handleFormSubmit)}>
        {renderForm()}
      </form>
    </Dialog>
  );
};

export default CreateTribeModal;
