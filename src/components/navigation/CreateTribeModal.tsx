import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { ErrorMessage } from '@hookform/error-message';

// api
import { createTribe, uploadImage } from 'api/tribeBar';

// components
import { Dialog, DropZone, ChartCount } from 'components/common';

// utils
import { FilePreview, MazSizeHelper } from 'utils/dropzone';
import {
  TribeDescriptionRegex,
  TribeIdentifierRegex,
  TribeNameRegex,
} from 'utils/regex';

// types
import type { CreateTribe, Tribe } from 'tools/types/tribeBar';

// mui
import {
  Box,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  IconButton,
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
    formState: { errors, isSubmitting },
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

      if (values.avatar) {
        values.avatar = values.avatar.key;
      } else {
        delete values.avatar;
      }

      if (values.cover) {
        values.cover = values.cover.key;
      } else {
        delete values.cover;
      }

      const response = await createTribe(values);
      mutate(
        '/api/v3/profile/tribes',
        (tribes: Array<Tribe>) => [...tribes, response],
        false
      );

      reset();
      onClose();

      enqueueSnackbar('Tribe Created Successfully', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });

      push(`/client/${response.mainSquareId}`);
    } catch (error) {
      enqueueSnackbar(error, {
        variant: 'error',
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

      if (avatar?.key || cover?.key) {
        formData.append('key', variant === 'avatar' ? avatar?.key : cover?.key);
      }
      const data = await uploadImage(formData);

      onChange(data);
    } catch (error) {
      enqueueSnackbar(error, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
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
              error={Boolean(errors.name)}
              helperText={
                <Box
                  component="span"
                  display="block"
                  marginTop={0.5}
                  textAlign="right"
                >
                  <ErrorMessage errors={errors} name="name" />
                </Box>
              }
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
                  maxLength: {
                    value: 40,
                    message: 'Name is to long',
                  },
                }),
                autoComplete: 'name',
              }}
              label={
                <Box display="flex" justifyContent="space-between">
                  Name
                  <ChartCount control={control} maxCount={40} name="name" />
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
              error={Boolean(errors.identifier)}
              helperText={
                <Box
                  component="span"
                  display="block"
                  marginTop={0.5}
                  textAlign="right"
                >
                  <ErrorMessage errors={errors} name="identifier" />
                </Box>
              }
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
                  minLength: {
                    value: 3,
                    message: 'Identifier is to short',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Identifier is to long',
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
              error={Boolean(errors.description)}
              helperText={
                <Box
                  component="span"
                  display="block"
                  marginTop={0.5}
                  textAlign="right"
                >
                  <ErrorMessage errors={errors} name="description" />
                </Box>
              }
              inputProps={{
                ...register('description', {
                  pattern: {
                    value: TribeDescriptionRegex,
                    message: 'Invalid tribe description',
                  },
                  maxLength: {
                    value: 1000,
                    message: 'Description its to long',
                  },
                }),
              }}
              label={
                <Box display="flex" justifyContent="space-between">
                  Description
                </Box>
              }
              placeholder="Set brief description"
              rows={5}
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
                      disabledDropzone={Boolean(isUploading)}
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
                      {isUploading ? (
                        <CircularProgress size={26} />
                      ) : (
                        <IconButton>
                          <AddIcon fontSize="small" />
                        </IconButton>
                      )}
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
                      disabledDropzone={Boolean(isUploading)}
                      id="cover"
                      maxFiles={1}
                      maxSize={41943040}
                      onChange={(file: Array<File>) =>
                        handleUploadImage('cover', file[0], field.onChange)
                      }
                    >
                      {cover?.url && (
                        <FilePreview file={cover.url} name="cover" />
                      )}
                      {isUploading ? (
                        <CircularProgress size={26} />
                      ) : (
                        <IconButton>
                          <AddIcon fontSize="small" />
                        </IconButton>
                      )}
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
