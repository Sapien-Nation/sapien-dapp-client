import { XIcon, CameraIcon, CloudUploadIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { useState, useRef } from 'react';
import { useSWRConfig } from 'swr';

// api
import { createTribe, CreateTribeBody, uploadImage } from 'api/tribe';

// constants
import { ToastType } from 'constants/toast';

// components
import {
  Dialog,
  TextareaInput,
  TextInput,
  TextInputLabel,
} from 'components/common';

//hooks
import { useToast } from 'context/toast';

// types
import type { ProfileTribe } from 'tools/types/tribe';

interface Props {
  onClose: () => void;
  show: boolean;
}

type Media = {
  key: string;
  url: string;
};

interface FormValues {
  avatar: null | Media;
  cover: null | Media;
  description: string;
  identifier: string;
  name: string;
}

enum MediaTypeUpload {
  Avatar = 'avatar',
  Cover = 'cover',
}

const form = 'create-tribe-form';
const CreateTribeDialog = ({ onClose, show }: Props) => {
  const [mediaTypeToUpload, setMediaTypeToUpload] =
    useState<MediaTypeUpload | null>(null);
  const [isUploading, setUploading] = useState<boolean>(false);

  const toast = useToast();
  const methods = useForm<FormValues>({
    defaultValues: {
      avatar: null,
      cover: null,
      description: '',
      identifier: '',
      name: '',
    },
  });
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    watch,
  } = methods;

  const { push } = useRouter();
  const { mutate } = useSWRConfig();

  const avatarFileInput = useRef(null);
  const coverFileInput = useRef(null);

  const [avatar, cover] = watch(['avatar', 'cover']);

  const onSubmit = async ({
    description,
    identifier,
    name,
    ...rest
  }: FormValues) => {
    try {
      const body: CreateTribeBody = {
        description,
        identifier,
        name,
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

      const response = await createTribe(body);

      mutate(
        '/api/v3/profile/tribes',
        (tribes: Array<ProfileTribe>) => [
          tribes[0],
          response,
          ...tribes.slice(1),
        ],
        false
      );

      toast({
        message: 'Tribe created successfully',
        type: ToastType.Success,
      });

      onClose();
      push(`/tribes/${response.id}/home`);
    } catch (error) {
      toast({
        message: error,
      });
    }
  };

  const handleUploadImage = async (file: File) => {
    setUploading(true);
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
    setUploading(false);
    setMediaTypeToUpload(null);
  };

  return (
    <Dialog
      show={show}
      isFetching={mediaTypeToUpload !== null || isSubmitting}
      onClose={onClose}
      title="Create a Tribe"
      form={form}
      confirmLabel="Create"
    >
      <>
        <div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} id={form}>
                <div className="sm:overflow-hidden">
                  <div>
                    <div className="flex gap-x-4 items-end">
                      <div>
                        <div
                          className="flex items-center relative cursor-pointer"
                          onClick={() => {
                            setMediaTypeToUpload(MediaTypeUpload.Avatar);
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
                                  onClick={() => {
                                    setMediaTypeToUpload(
                                      MediaTypeUpload.Avatar
                                    );
                                    avatarFileInput.current.click();
                                  }}
                                />
                                <div className="px-4 py-5 bg-gray-900 space-y-6 sm:p-6"></div>
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
                          {isUploading &&
                            mediaTypeToUpload === MediaTypeUpload.Avatar && (
                              <span className="absolute w-5 transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <CloudUploadIcon className="animate-bounce text-gray-400" />
                              </span>
                            )}
                          {((!isUploading && !mediaTypeToUpload) ||
                            mediaTypeToUpload === MediaTypeUpload.Avatar) && (
                            <CameraIcon className="absolute w-5 right-0.5 bottom-0 text-gray-400" />
                          )}
                          <input
                            ref={avatarFileInput}
                            accept="image/*"
                            className="sr-only"
                            id="avatar-upload"
                            onChange={(event) =>
                              handleUploadImage(event.target.files[0])
                            }
                            aria-labelledby="Upload Avatar"
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
                          className="block w-full bg-gray-800 pr-10 pl-3 pt-3 pb-3 border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                          name="name"
                          placeholder="The Sapien Tribe"
                          maxLength={50}
                          aria-label="name"
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
                      <TextInputLabel
                        label="Tribe ID"
                        name="identifier"
                        error={errors.identifier?.message}
                      />
                      <TextInput
                        className="block w-full rounded-md bg-gray-800 pr-10 pl-3 pt-3 pb-3 border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-tr-md rounder-br-md"
                        name="identifier"
                        aria-label="identifier"
                        placeholder="TheSapienTribe"
                        maxLength={20}
                        rules={{
                          validate: {
                            required: (value) =>
                              value.length > 0 || 'is required',
                            minLength: (value) =>
                              value?.length > 2 ||
                              'Must be Between 2 and 20 characters long',
                            maxLength: (value) =>
                              value?.length <= 21 ||
                              'Must be Between 2 and 51 characters long',
                          },
                        }}
                        pattern={/^[a-zA-Z0-9]$/}
                      />
                    </div>
                    <div>
                      <TextInputLabel
                        label="Description"
                        name="description"
                        error={errors.description?.message}
                      />
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <TextareaInput
                          name="description"
                          maxLength={1000}
                          placeholder="Describe your tribe"
                          className="shadow-sm r-10 pl-3 pt-3 pb-3 focus:outline-none mt-1 block w-full sm:text-sm border-0 rounded-md"
                          rules={{
                            validate: {
                              maxLength: (value) => {
                                if (value?.length > 0) {
                                  return (
                                    value?.length <= 1001 ||
                                    'Must be only 1000 characters long'
                                  );
                                }
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mt-4 mb-2">
                        Cover photo
                      </label>
                      <div className="mt-1 relative min-h-[8.75rem] flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        {Boolean(cover) ? (
                          <span className="relative">
                            <button
                              type="button"
                              aria-label="Remove Selected Cover"
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
                            />
                          </span>
                        ) : (
                          <>
                            {isUploading &&
                            mediaTypeToUpload === MediaTypeUpload.Cover ? (
                              <span className="absolute w-5 transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <CloudUploadIcon className="animate-bounce text-gray-400" />
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
                                    className="relative cursor-pointer rounded-md font-medium text-white hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                  >
                                    <span>Upload a file</span>
                                    <input
                                      ref={coverFileInput}
                                      id="cover-upload"
                                      type="file"
                                      aria-labelledby="Upload Cover"
                                      onClick={() =>
                                        setMediaTypeToUpload(
                                          MediaTypeUpload.Cover
                                        )
                                      }
                                      className="sr-only"
                                      onChange={(event) => {
                                        handleUploadImage(
                                          event.target.files[0]
                                        );
                                      }}
                                    />
                                  </label>
                                </div>
                                <p className="text-xs text-gray-500">
                                  PNG, JPG, GIF up to 40MB
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </>
    </Dialog>
  );
};

export default CreateTribeDialog;
