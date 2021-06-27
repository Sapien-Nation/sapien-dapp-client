import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { mutate } from 'swr';

// api
import { createTribe, uploadImage } from 'api/tribeBar';

// components
import { Dialog, DropZone, ChartCount } from 'components/common';

// utils
import { FilePreview, MazSizeHelper } from 'utils/dropzone';
import { TribeNameRegex, TribeIdentifierRegex } from 'utils/regex';

// types
import type { CreateTribe, Tribe } from 'tools/types/tribeBar';

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

enum Step {
  TribeSummary = 1,
  TribeMedia,
}

interface Props {
  onClose: () => void;
}

const form = 'create-tribe-form';

// @ts-ignore
interface TribeForm extends CreateTribe {
  avatar: null | { url: string; key: string };
  cover: null | { url: string; key: string };
}

const CreateTribeModal = ({ onClose }: Props) => {
  const [step, setStep] = useState(Step.TribeSummary);
  const [isUploading, setIsUploading] = useState(false);

  const {
    control,
    formState: { isSubmitting },
    getValues,
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<TribeForm>({
    defaultValues: {
      avatar: null,
      cover: null,
      description: '',
      identifier: '',
      name: '',
      private: false,
    },
  });
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [avatar, cover] = watch(['avatar', 'cover']);

  useEffect(() => {
    return () => {
      const keys = [];
      const [image1, image2] = getValues(['avatar', 'cover']);

      if (image1) keys.push(image1.key);
      if (image2) keys.push(image2.key);

      if (keys.length) {
        // TODO backend working on API
        // deleteImages(keys);
      }
    };
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      if (step === Step.TribeSummary) return setStep(Step.TribeMedia);

      const response = await createTribe({
        ...values,
        avatar: avatar?.key ?? null,
        cover: cover?.key ?? null,
      });
      mutate(
        '/api/v3/profile/tribes',
        (tribes: Array<Tribe>) => [...tribes, response],
        false
      );

      reset();
      onClose();

      enqueueSnackbar('Tribe Created Successfully', {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });

      push(`/client/${response.mainSquareId}`);
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

  const handleUploadImage = async (
    variant: 'avatar' | 'cover',
    file: File,
    onChange: (value: string) => void
  ) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('variant', variant);
      formData.append('file', file);
      formData.append(
        'key',
        variant === 'avatar' ? avatar?.key ?? null : cover?.key ?? null
      );
      const data = await uploadImage(formData);

      onChange(data);
    } catch (err) {
      enqueueSnackbar(err.message);
    }
    setIsUploading(false);
  };

  const renderFields = () => {
    switch (step) {
      case Step.TribeSummary: {
        return (
          <>
            <TextField
              fullWidth
              inputProps={{
                ...register('name', {
                  pattern: {
                    value: TribeNameRegex,
                    message: 'Invalid tribe name',
                  },
                  required: {
                    value: true,
                    message: 'Name is required',
                  },
                }),
                autoComplete: 'name',
              }}
              label={
                <Box display="flex" justifyContent="space-between">
                  Name
                  <ChartCount control={control} maxCount={20} name="name" />
                </Box>
              }
              placeholder="Foodies"
            />
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">@</InputAdornment>
                ),
              }}
              inputProps={{
                ...register('identifier', {
                  pattern: {
                    value: TribeIdentifierRegex,
                    message: 'Invalid tribe name',
                  },
                  required: {
                    value: true,
                    message: 'Identifier is required',
                  },
                }),
                autoComplete: 'identifier',
              }}
              label={
                <Box display="flex" justifyContent="space-between">
                  Unique Identifier
                  <ChartCount
                    control={control}
                    maxCount={20}
                    name="identifier"
                  />
                </Box>
              }
              placeholder="foodies"
            />
            <TextField
              fullWidth
              multiline
              inputProps={{
                ...register('description', {
                  maxLength: {
                    value: 1000,
                    message: 'Description its to long',
                  },
                }),
              }}
              placeholder="Set brief description"
              rows={5}
            />

            <Controller
              control={control}
              name="private"
              render={({ field: { onChange, value, ...rest } }) => (
                <Box display="flex" justifyContent="space-between">
                  <Typography style={{ marginRight: 10 }} variant="button">
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
                  render={({ field }) => (
                    <DropZone
                      accept="image/*"
                      id="avatar"
                      maxFiles={1}
                      maxSize={20971520}
                      onChange={(file: Array<File>) =>
                        handleUploadImage('avatar', file[0], field.onChange)
                      }
                    >
                      {avatar?.url && (
                        <FilePreview file={avatar.url} name="avatar" />
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
                  render={({ field }) => (
                    <DropZone
                      accept="image/*"
                      id="cover"
                      maxFiles={1}
                      maxSize={41943040}
                      onChange={(file: Array<File>) =>
                        handleUploadImage('avatar', file[0], field.onChange)
                      }
                    >
                      {cover?.url && (
                        <FilePreview file={cover.url} name="avatar" />
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
      confirmDisabled={isSubmitting || isUploading}
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
