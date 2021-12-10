import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { useState, useRef } from 'react';
import { tw } from 'twind';
import { XIcon } from '@heroicons/react/outline';

// api
import { createTribe, CreateTribeBody, uploadImage } from 'api/tribe';

// components
import { Dialog } from 'components/common';

// context
import { useToast } from 'context/toast';

// types
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
  description: string;
  identifier: string;
  name: string;
}

enum MediaTypeUpload {
  Avatar = 'avatar',
  Cover = 'cover',
}

const form = 'create-tribe-form';
const CreateTribeDialog = ({ onClose }: Props) => {
  const [mediaTypeToUpload, setMediaTypeToUpload] =
    useState<MediaTypeUpload | null>(null);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    register,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      avatar: null,
      cover: null,
      description: '',
      identifier: '',
      name: '',
    },
  });
  const toast = useToast();
  const { cache } = useSWRConfig();
  const fileInput = useRef(null);

  const [avatar, cover] = watch(['avatar', 'cover']);

  const onSubmit = async ({
    description,
    identifier,
    name,
    ...rest
  }: FormValues) => {
    try {
      const body = {
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

      cache.set('/api/v3/profile/tribes', (tribes: Array<ProfileTribe>) => [
        ...tribes,
        response,
      ]);

      onClose();
    } catch (error) {
      toast({ message: error.message });
    }
  };

  const handleUploadImage = async (file: File) => {
    try {
      const formData = new FormData();

      formData.append('variant', mediaTypeToUpload);
      formData.append('file', file);

      const fileURL: string = await uploadImage(formData);

      // @ts-ignore
      setValue(mediaTypeToUpload, fileURL as Media);
    } catch (error) {
      toast({
        message: error.message,
      });
    }
    setMediaTypeToUpload(null);
  };

  return (
    <Dialog
      isFetching={mediaTypeToUpload !== null || isSubmitting}
      onClose={onClose}
      title="Create a Tribe"
      form={form}
    >
      <>
        <div>
          <div className={tw`mt-5 md:mt-0 md:col-span-2`}>
            <form onSubmit={handleSubmit(onSubmit)} id={form}>
              <div className={tw`sm:overflow-hidden`}>
                <div className={tw`px-4 py-5 bg-white space-y-6 sm:p-6`}>
                  <div>
                    <div>
                      <label
                        htmlFor="name"
                        className={tw`block text-sm font-medium mt-4 text-gray-700`}
                      >
                        Name
                      </label>
                      <div className={tw`mt-1 relative rounded-md shadow-sm`}>
                        <input
                          type="text"
                          id="name"
                          className={tw`block w-full pr-10 pl-3 pt-3 pb-3 bg-gray-100 border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md`}
                          placeholder="The Sapien Tribe"
                          aria-invalid={Boolean(errors.name) ? 'true' : 'false'}
                          aria-describedby="name-error"
                          {...register('name', {
                            pattern: {
                              value: /^[^-\s][a-zA-Z0-9_\s-]{1,40}$/,
                              message: 'Invalid tribe name',
                            },
                            required: {
                              value: true,
                              message: 'Name is required',
                            },
                            maxLength: {
                              value: 40,
                              message: 'Name is too long',
                            },
                          })}
                        />
                      </div>
                      <p
                        className={tw`mt-2 text-xs max-w-md mx-auto text-base text-red-500`}
                      >
                        {errors?.name?.message}
                      </p>
                      <label
                        htmlFor="identifier"
                        className={tw`block text-sm mt-4 font-medium text-gray-700`}
                      >
                        Identifier
                      </label>
                      <div className={tw`mt-1 relative rounded-md shadow-sm`}>
                        <input
                          type="text"
                          id="identifier"
                          className={tw`block w-full pr-10 pl-3 pt-3 pb-3 border-red-300 bg-gray-100 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md`}
                          placeholder="TheSapienTribe"
                          {...register('identifier', {
                            pattern: {
                              value: /^[a-zA-Z0-9_]{3,20}$/,
                              message: 'Invalid identifier',
                            },
                            required: {
                              value: true,
                              message: 'Identifier is required',
                            },
                            minLength: {
                              value: 3,
                              message: 'Identifier is too short',
                            },
                            maxLength: {
                              value: 20,
                              message: 'Identifier is too long',
                            },
                          })}
                        />
                      </div>
                      <p
                        className={tw`mt-2 text-xs max-w-md mx-auto text-base text-red-500`}
                      >
                        {errors?.identifier?.message}
                      </p>
                      <div>
                        <label
                          htmlFor="description"
                          className={tw`block text-sm mt-4 font-medium text-gray-700`}
                        >
                          Description
                        </label>
                        <div className={tw`mt-1`}>
                          <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className={tw`shadow-sm r-10 pl-3 pt-3 pb-3 bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-0 rounded-md`}
                            placeholder="Describe your tribe"
                            defaultValue={''}
                            {...register('description', {
                              pattern: {
                                value: /^[a-zA-Z0-9_]/,
                                message: 'Invalid tribe description',
                              },
                              maxLength: {
                                value: 1000,
                                message: 'Description is too long',
                              },
                            })}
                          />
                        </div>
                        <p
                          className={tw`mt-2 text-xs max-w-md mx-auto text-base text-red-500`}
                        >
                          {errors?.description?.message}
                        </p>
                      </div>
                      <div>
                        <label
                          className={tw`block text-sm mt-4 font-medium text-gray-700`}
                        >
                          Avatar
                        </label>
                        <div className={tw`mt-1 flex items-center relative`}>
                          {Boolean(avatar) && (
                            <button
                              type="button"
                              className={tw`absolute z-10 -top-1 left-9 inline-flex items-center p-1 bg-gray-900 rounded-full shadow-sm text-white focus:outline-none`}
                              onClick={() => setValue('avatar', null)}
                            >
                              <XIcon
                                className={tw`h-3 w-3 text-white`}
                                aria-hidden="true"
                              />
                            </button>
                          )}
                          <span
                            className={tw`inline-block h-12 w-12 rounded-full overflow-hidden relative`}
                          >
                            {Boolean(avatar) ? (
                              <>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  alt="avatar"
                                  className={tw`h-12 w-12 rounded-full`}
                                  src={avatar.url}
                                  data-key={avatar.key}
                                />
                              </>
                            ) : (
                              <svg
                                className={tw`h-full w-full text-gray-300`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            )}
                          </span>
                          <input
                            ref={fileInput}
                            accept="image/*"
                            className={tw`sr-only`}
                            onChange={(event) =>
                              handleUploadImage(event.target.files[0])
                            }
                            type="file"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setMediaTypeToUpload(MediaTypeUpload.Avatar);
                              fileInput.current.click();
                            }}
                            className={tw`ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none`}
                          >
                            Upload
                          </button>
                        </div>
                      </div>

                      <div>
                        <label
                          className={tw`block text-sm font-medium mt-4 text-gray-700`}
                        >
                          Cover photo
                        </label>
                        <div
                          className={tw`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md`}
                        >
                          {Boolean(cover) ? (
                            <span className={tw`relative`}>
                              <button
                                type="button"
                                className={tw`absolute z-10 -top-1 -right-1 inline-flex items-center p-1 bg-gray-900 rounded-full shadow-sm text-white focus:outline-none`}
                                onClick={() => setValue('cover', null)}
                              >
                                <XIcon
                                  className={tw`h-3 w-3 text-white`}
                                  aria-hidden="true"
                                />
                              </button>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                alt="cover"
                                className={tw`w-100 relative rounded-md`}
                                src={cover.url}
                                data-key={cover.key}
                              />
                            </span>
                          ) : (
                            <div className={tw`space-y-1 text-center`}>
                              <svg
                                className={tw`mx-auto h-12 w-12 text-gray-400`}
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
                              <div className={tw`flex text-sm text-gray-600`}>
                                <label
                                  htmlFor="cover-upload"
                                  className={tw`relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500`}
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id="cover-upload"
                                    name="cover-upload"
                                    type="file"
                                    onClick={() =>
                                      setMediaTypeToUpload(
                                        MediaTypeUpload.Cover
                                      )
                                    }
                                    className={tw`sr-only`}
                                    onChange={(event) =>
                                      handleUploadImage(event.target.files[0])
                                    }
                                  />
                                </label>
                                <p className={tw`pl-1`}>or drag and drop</p>
                              </div>
                              <p className={tw`text-xs text-gray-500`}>
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    </Dialog>
  );
};

export default CreateTribeDialog;
