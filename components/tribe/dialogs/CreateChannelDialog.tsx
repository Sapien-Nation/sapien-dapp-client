import { XIcon, CameraIcon, CloudUploadIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { useState, useRef } from 'react';
import { useSWRConfig } from 'swr';

// api
import { createChannel, uploadImage } from 'api/channel';

// constants
import { ToastType } from 'constants/toast';

// components
import { Dialog, TextInput, TextInputLabel } from 'components/common';

// hooks
import { useToast } from 'context/toast';

// types
import type { CreateChannelBody } from 'api/channel';
import type { ProfileTribe } from 'tools/types/tribe';

interface Props {
  onClose: () => void;
}

type Media = {
  key: string;
  url: string;
};

interface FormValues {
  avatar: null | Media;
  cover: null | Media;
  name: string;
}

enum MediaTypeUpload {
  Avatar = 'avatar',
  Cover = 'cover',
}

const form = 'create-channel-form';
const CreateChannelDialog = ({ onClose }: Props) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { push, query } = useRouter();
  const { mutate } = useSWRConfig();

  const toast = useToast();
  const methods = useForm<FormValues>({
    defaultValues: {
      avatar: null,
      cover: null,
      name: '',
    },
  });
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    watch,
  } = methods;

  const avatarFileInput = useRef(null);
  const coverFileInput = useRef(null);

  const [avatar, cover] = watch(['avatar', 'cover']);

  const onSubmit = async ({ name, ...rest }: FormValues) => {
    try {
      const { tribeID } = query;

      const body: CreateChannelBody = {
        name,
        tribeId: tribeID as string,
      };

      if (rest.avatar) {
        Object.assign(body, {
          avatar: rest.avatar.key,
        });
      }

      if (rest.cover) {
        Object.assign(body, {
          cover: rest.cover.key,
        });
      }

      const response = await createChannel(body);

      mutate(
        '/core-api/profile/tribes',
        (tribes: Array<ProfileTribe>) => {
          return tribes.map((tribe) => ({
            ...tribe,
            channels:
              tribe.id === tribeID
                ? [...tribe.channels, response]
                : tribe.channels,
          }));
        },
        false
      );

      toast({
        message: 'Channel created successfully',
        type: ToastType.Success,
      });

      onClose();
      push(`/tribes/${tribeID}/${response.id}`);
    } catch (error) {
      toast({
        message: error,
      });
    }
  };

  const handleUploadImage = async (
    file: File,
    mediaTypeToUpload: MediaTypeUpload
  ) => {
    setIsUploading(true);
    try {
      const formData = new FormData();

      formData.append('variant', mediaTypeToUpload);
      formData.append('file', file);

      const fileData: Media = await uploadImage(formData);

      // @ts-ignore
      setValue(mediaTypeToUpload, fileData);
    } catch (error) {
      toast({
        message: error,
      });
    }

    setIsUploading(false);
  };

  return (
    <Dialog
      show
      isFetching={isUploading || isSubmitting}
      onClose={onClose}
      title="Create a Channel"
      form={form}
      confirmLabel="Create"
    >
      <div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} id={form}>
              <div className="sm:overflow-hidden">
                <div className="px-4 py-5 space-y-6 sm:p-6">
                  <div>
                    <div className="flex gap-x-4 items-end">
                      <div>
                        <div
                          className="flex items-center relative cursor-pointer"
                          onClick={() => {
                            avatarFileInput.current.click();
                          }}
                        >
                          {Boolean(avatar) && (
                            <button
                              type="button"
                              aria-label="Remove Selected Avatar"
                              className="absolute z-10 -top-1 left-9 inline-flex items-center p-1 bg-gray-900 rounded-full shadow-sm text-white focus:outline-none"
                              onClick={(event) => {
                                event.stopPropagation();
                                setValue('avatar', null);
                              }}
                            >
                              <XIcon
                                className="h-3 w-3 text-white"
                                aria-hidden="true"
                              />
                            </button>
                          )}
                          <span className="inline-block h-14 w-14 border border-gray-300 rounded-full overflow-hidden relative">
                            {Boolean(avatar) ? (
                              <>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  alt="avatar"
                                  className="h-14 w-14 rounded-full object-cover"
                                  src={avatar.url}
                                  data-key={avatar.key}
                                  id="avatar"
                                  onClick={() => {
                                    avatarFileInput.current.click();
                                  }}
                                />
                              </>
                            ) : (
                              <svg
                                className="h-full w-full text-gray-300"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            )}
                          </span>
                          <CameraIcon className="absolute w-5 right-0.5 bottom-0 text-gray-400" />
                          <input
                            ref={avatarFileInput}
                            accept="image/*"
                            className="sr-only"
                            disabled={isUploading}
                            onChange={(event) => {
                              handleUploadImage(
                                event.target.files[0],
                                MediaTypeUpload.Avatar
                              );
                              avatarFileInput.current.value = '';
                            }}
                            id="avatar-upload"
                            type="file"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <TextInputLabel
                          label="Name"
                          name="name"
                          error={errors.name?.message}
                        />
                        <TextInput
                          name="name"
                          aria-label="name"
                          placeholder="Channel Name"
                          maxLength={50}
                          pattern={/^[a-zA-Z\s]$/}
                          rules={{
                            validate: {
                              required: (value) =>
                                value.length > 0 || 'is required',
                              minLength: (value) =>
                                value?.length > 2 ||
                                'Must be Between 2 and 50 characters long',
                              maxLength: (value) =>
                                value?.length <= 51 ||
                                'Must be Between 2 and 50 characters long',
                            },
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mt-4 mb-2">
                        Cover photo
                      </label>
                      <div className="mt-1 relative min-h-8-75 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        {Boolean(cover) ? (
                          <span className="relative">
                            <button
                              aria-label="Remove Selected Cover"
                              type="button"
                              className="absolute z-10 -top-1 -right-1 inline-flex items-center p-1 bg-gray-900 rounded-full shadow-sm text-white focus:outline-none"
                              onClick={() => {
                                setValue('cover', null);
                              }}
                            >
                              <XIcon
                                className="h-3 w-3 text-white"
                                aria-hidden="true"
                              />
                            </button>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              alt="cover"
                              className="w-100 relative rounded-md"
                              src={cover.url}
                              data-key={cover.key}
                              onClick={() => {
                                coverFileInput.current.click();
                              }}
                            />
                          </span>
                        ) : (
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="text-sm text-gray-600">
                              <label
                                htmlFor="cover-upload"
                                className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  ref={coverFileInput}
                                  id="cover-upload"
                                  name="cover-upload"
                                  type="file"
                                  disabled={isUploading}
                                  className="sr-only"
                                  onChange={(event) => {
                                    handleUploadImage(
                                      event.target.files[0],
                                      MediaTypeUpload.Cover
                                    );
                                    coverFileInput.current.value = '';
                                  }}
                                />
                              </label>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 40MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateChannelDialog;
