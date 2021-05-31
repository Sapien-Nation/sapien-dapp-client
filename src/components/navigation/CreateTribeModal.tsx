import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { mutate } from 'swr';

// types
import type { Tribe } from 'tools/types/tribeBar';

// api
import { createTribe } from 'api/tribeBar';

// utils
import { FilePreview, MazSizeHelper } from 'utils/dropzone';

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
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

//components
import { Dialog, DropZone, ChartCount } from 'components/common';

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
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    register,
    watch,
  } = useForm({
    defaultValues: {
      avatar: null,
      cover: null,
      description: '',
      identifier: '',
      name: '',
      private: false,
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = async (values) => {
    try {
      if (step === Step.TribeSummary) return setStep(Step.TribeMedia);
      const formData = new FormData();
      formData.append('avatar', values.avatar[0]);
      formData.append('cover', values.cover[0]);
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
      enqueueSnackbar('Tribe Created Successfully', {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    } catch (err) {
      enqueueSnackbar(err, {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
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

  const [avatar, cover] = watch(['avatar', 'cover']);
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
                <Box display="flex" justifyContent="space-between">
                  <Typography
                    style={{ marginRight: 10 }}
                    variant="buttonMedium"
                  >
                    Public tribe
                  </Typography>
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
                <Controller
                  control={control}
                  name="avatar"
                  render={({ field: { onChange } }) => (
                    <DropZone
                      accept="image/*"
                      id="avatar"
                      maxFiles={1}
                      maxSize={20971520}
                      onChange={onChange}
                    >
                      {avatar && (
                        <FilePreview
                          file={URL.createObjectURL(avatar[0])}
                          name="avatar"
                        />
                      )}
                      <IconButton>
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </DropZone>
                  )}
                />
              </Box>
              <MazSizeHelper size="20MB" />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="cover">Cover image</InputLabel>
              <Box height="10rem" marginY={1.6} width="100%">
                <Controller
                  control={control}
                  name="cover"
                  render={({ field: { onChange } }) => (
                    <DropZone
                      accept="image/*"
                      id="cover"
                      maxFiles={1}
                      maxSize={20971520}
                      onChange={onChange}
                    >
                      {cover && (
                        <FilePreview
                          file={URL.createObjectURL(cover[0])}
                          name="cover"
                        />
                      )}
                      <IconButton>
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </DropZone>
                  )}
                />
              </Box>
              <MazSizeHelper size="40MB" />
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
      confirmDisabled={isSubmitting}
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
