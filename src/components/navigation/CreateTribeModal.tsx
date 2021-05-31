import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { mutate } from 'swr';

// types
import type { Tribe } from 'tools/types/tribeBar';

// api
import { createTribe } from 'api/tribeBar';

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

const form = 'create-tribe-form';

const CreateTribeModal = ({ onClose }: Props) => {
  const [step, setStep] = useState(Step.TribeSummary);
  const methods = useForm({
    defaultValues: {
      avatar: null,
      cover: null,
      description: '',
      identifier: '',
      name: '',
      private: false,
    },
  });
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    unregister,
    watch,
  } = methods;

  const handleFormSubmit = async (values) => {
    try {
      if (step === Step.TribeSummary) return setStep(Step.TribeMedia);
      const formData = new FormData();
      formData.append('avatar', values.avatar);
      formData.append('cover', values.cover);
      formData.append('description', values.identifier);
      formData.append('identifier', values.description);
      formData.append('name', values.name);
      formData.append('private', values.private);

      const response = await createTribe(formData);
      mutate('/api/profile/tribes', (tribes: Array<Tribe>) => [
        ...tribes,
        response,
      ]);

      onClose();
      enqueueSnackbar('Tribe Created Successfully');
    } catch (err) {
      enqueueSnackbar(err);
    }
  };

  const handleBack = () => {
    switch (step) {
      case Step.TribeSummary:
        return onClose();
      case Step.TribeMedia:
        return setStep(Step.TribeSummary);
      default:
        return null;
    }
  };

  const renderFields = () => {
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
                ...register('identifier'),
                autoComplete: 'identifier',
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
                    name="identifier"
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

            <Controller
              control={control}
              name="private"
              render={({ field: { onChange, value, ...rest } }) => (
                <Box
                  alignItems="start"
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <InputLabel htmlFor="">
                    <Box
                      alignItems="center"
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                    >
                      <span> tribe</span>
                      <IconButton aria-label="" style={{ color: darkGrey }}>
                        <HelpIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </InputLabel>
                  <Switch
                    disableRipple
                    checked={value as boolean}
                    color="default"
                    onChange={(e) => onChange(e.target.checked)}
                    {...rest}
                  />
                </Box>
              )}
            />
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
        {renderFields()}
      </form>
    </Dialog>
  );
};

export default CreateTribeModal;
