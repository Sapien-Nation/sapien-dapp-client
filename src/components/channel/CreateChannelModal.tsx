import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { mutate } from 'swr';

// api
import { createChannel, uploadImage } from 'api/tribeNavigation';

// components
import { Dialog, DropZone, ChartCount } from 'components/common';

// utils
import { FilePreview } from 'utils/dropzone';
import { ChannelDescriptionRegex, ChannelNameRegex } from 'utils/regex';

// types
import type { CreateChannel } from 'tools/types/tribeNavigation';
import type { Tribe } from 'tools/types/tribeBar';

// mui
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

enum Step {
  ChannelSummary = 1,
  ChannelMedia,
}

interface Props {
  squareID: string;
  tribeId: string;
  onClose: () => void;
}

const form = 'create-channel-form';

// @ts-ignore
interface ChannelForm extends CreateChannel {
  avatar: null | { url: string; key: string };
  cover: null | { url: string; key: string };
}

const CreateChannelModal = ({ squareID, tribeId, onClose }: Props) => {
  const [step, setStep] = useState(Step.ChannelSummary);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const {
    control,
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<ChannelForm>({
    defaultValues: {
      avatar: null,
      cover: null,
      description: '',
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
      if (step === Step.ChannelSummary) return setStep(Step.ChannelMedia);

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

      delete values.private;
      const response = await createChannel({
        ...values,
        tribeId,
      });

      mutate(
        '/api/v3/profile/tribes',
        (tribes: Array<Tribe>) => {
          return tribes.map((tribe) => ({
            ...tribe,
            channels:
              tribe.mainSquareId === squareID
                ? [...tribe.channels, response]
                : tribe.channels,
          }));
        },
        false
      );
      reset();
      onClose();

      enqueueSnackbar('Channel Created Successfully', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });

      push(`/client/${squareID}/channel/${response.id}`);
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
      case Step.ChannelSummary:
        return onClose();
      case Step.ChannelMedia:
        return setStep(Step.ChannelSummary);
      default:
        return null;
    }
  };

  const handleUploadImage = async (
    variant: 'avatar' | 'cover',
    file: File,
    onChange: (value: string) => void
  ) => {
    if (variant === 'avatar') {
      setIsUploadingAvatar(true);
    } else {
      setIsUploadingCover(true);
    }

    try {
      const formData = new FormData();
      formData.append('variant', variant);
      formData.append('file', file);
      const data = await uploadImage(formData);

      onChange(data);
    } catch (error) {
      enqueueSnackbar('Oops, something went wrong. Please try again.', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    }
    setIsUploadingCover(false);
    setIsUploadingAvatar(false);
  };

  const isUploading = isUploadingAvatar || isUploadingCover;

  const renderFields = () => {
    switch (step) {
      case Step.ChannelSummary: {
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
                    value: ChannelNameRegex,
                    message: 'Invalid channel name',
                  },
                  required: {
                    value: true,
                    message: 'Name is required',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Name is too long',
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
                    value: ChannelDescriptionRegex,
                    message: 'Invalid channel description',
                  },
                  maxLength: {
                    value: 1000,
                    message: 'Description is too long',
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
      case Step.ChannelMedia: {
        return (
          <>
            <FormControl fullWidth>
              <InputLabel>Avatar</InputLabel>
              <Box marginY={1.6}>
                <Controller
                  control={control}
                  name="avatar"
                  render={({ field }) => (
                    <DropZone
                      accept="image/*"
                      disabledDropzone={Boolean(isUploading)}
                      height="6.4rem"
                      id="avatar"
                      maxFiles={1}
                      maxSize={20971520}
                      width="6.4rem"
                      onChange={(file: Array<File>) =>
                        handleUploadImage('avatar', file[0], field.onChange)
                      }
                    >
                      {avatar?.url && (
                        <FilePreview file={avatar.url} name="avatar" />
                      )}
                      {isUploadingAvatar ? (
                        <CircularProgress size={26} />
                      ) : (
                        <IconButton>
                          <AddIcon aria-label="Upload Image" fontSize="small" />
                        </IconButton>
                      )}
                    </DropZone>
                  )}
                />
              </Box>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Cover image</InputLabel>
              <Box marginY={1.6}>
                <Controller
                  control={control}
                  name="cover"
                  render={({ field }) => (
                    <DropZone
                      accept="image/*"
                      disabledDropzone={Boolean(isUploading)}
                      height="10rem"
                      id="cover"
                      maxFiles={1}
                      maxSize={41943040}
                      width="100%"
                      onChange={(file: Array<File>) =>
                        handleUploadImage('cover', file[0], field.onChange)
                      }
                    >
                      {cover?.url && (
                        <FilePreview file={cover.url} name="cover" />
                      )}
                      {isUploadingCover ? (
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
            </FormControl>
          </>
        );
      }
    }
  };

  return (
    <Dialog
      open
      cancelLabel={step == Step.ChannelSummary ? 'Cancel' : 'Back'}
      confirmDisabled={isSubmitting || isUploadingAvatar || isUploadingCover}
      confirmLabel={step == Step.ChannelSummary ? 'Next' : 'Create'}
      form={form}
      maxWidth="xs"
      title={
        <>
          <Typography variant="h2">New Channel</Typography>
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

export default CreateChannelModal;
