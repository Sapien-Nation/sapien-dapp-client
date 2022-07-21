import { XIcon, CameraIcon, MinusIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { useState, useRef } from 'react';
import { useSWRConfig } from 'swr';

// api
import { createChannel, uploadImage } from 'api/channel';

// constants
import { ToastType } from 'constants/toast';

// components
import { Dialog, Query, TextInput, TextInputLabel } from 'components/common';

// hooks
import { useToast } from 'context/toast';
import { useTribeBadges } from 'hooks/tribe/badge';

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
  badges: Array<string>;
  cover: null | Media;
  name: string;
}

enum MediaTypeUpload {
  Avatar = 'avatar',
  Cover = 'cover',
}

enum View {
  Info,
  Contributors,
}

const form = 'create-channel-form';
const CreateChannelDialog = ({ onClose }: Props) => {
  const [view, setView] = useState(View.Info);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const toast = useToast();
  const { push, query } = useRouter();
  const { mutate } = useSWRConfig();
  const methods = useForm<FormValues>({
    defaultValues: {
      avatar: null,
      badges: [],
      cover: null,
      name: '',
    },
  });
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
    setValue,
    watch,
  } = methods;
  const { myBadges, otherBadges } = useTribeBadges();

  const avatarFileInput = useRef(null);
  const coverFileInput = useRef(null);

  const tribeBadges = [...myBadges, ...otherBadges];
  const [avatar, cover, name, badges] = watch([
    'avatar',
    'cover',
    'name',
    'badges',
  ]);

  const onSubmit = async ({ name, badges, ...rest }: FormValues) => {
    try {
      const { tribeID } = query;

      const body: CreateChannelBody = {
        badges,
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
        '/core-api/user/tribes',
        (tribes: Array<ProfileTribe>) =>
          tribes.map((tribe) => {
            if (tribe.id === tribeID) {
              if (tribe.channels) {
                return {
                  ...tribe,
                  channels: [...tribe.channels, response],
                };
              }
              return tribe;
            }
            return tribe;
          }),
        false
      );

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

  const renderView = () => {
    switch (view) {
      case View.Contributors:
        return (
          <div>
            <div className="p-3 my-3">
              <p>
                Selected badge holders will be able to post in this channel.
              </p>
            </div>
            <div className="h-96 max-h-full overflow-y-auto">
              <ul>
                {tribeBadges.map((badge) => {
                  const isBadgeSelected = badges.includes(badge.parentId);
                  return (
                    <li
                      className={`border ${
                        isBadgeSelected ? 'border-sapien-80' : 'border-gray-800'
                      }
                ${
                  isBadgeSelected
                    ? 'hover:border-sapien-80'
                    : 'hover:border-gray-700'
                }
                w-full flex justify-between items-center rounded-md p-3 mb-3 hover:cursor-pointer`}
                      onClick={() => {
                        if (isBadgeSelected) {
                          setValue(
                            'badges',
                            badges.filter((b) => b !== badge.parentId)
                          );
                        } else {
                          setValue('badges', [...badges, badge.parentId]);
                        }
                      }}
                      key={badge.parentId}
                    >
                      {badge.avatar ? (
                        <img
                          src={badge.avatar}
                          alt={badge.name}
                          style={{ borderColor: badge.color }}
                          className="w-8 h-8 object-cover rounded-full border-2"
                        />
                      ) : (
                        <div
                          className="w-8 h-8 rounded-full bg-gray-700 border-2 font-bold text-black group-hover:text-gray-500 flex items-center justify-center"
                          style={{ borderColor: badge.color }}
                        />
                      )}
                      {badge.name}
                      <button
                        type="button"
                        className={`${
                          isBadgeSelected ? 'visible' : 'invisible'
                        } rounded-md text-gray-400 hover:text-gray-500 focus:outline-none`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setValue(
                            'badges',
                            badges.filter((b) => b !== badge.parentId)
                          );
                        }}
                      >
                        <span className="sr-only">Remove</span>
                        <MinusIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="p-3 my-3 flex justify-end">
              <p className="text-sm text-gray-500 font-medium">
                {badges.length === 0 ? (
                  'Please select at least 1 badge'
                ) : (
                  <>
                    ({badges.length} {badges.length === 1 ? 'badge' : 'badges'}{' '}
                    selected)
                  </>
                )}
              </p>
            </div>
          </div>
        );
      case View.Info:
        return (
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
                        className="sr-only"
                        disabled={isUploading}
                        onChange={(event) => {
                          handleUploadImage(
                            event.target.files[0],
                            MediaTypeUpload.Avatar
                          );
                          avatarFileInput.current.value = '';
                        }}
                        accept=".png, .jpg, .jpeg"
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
                      autoFocus
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
                              accept=".png, .jpg, .jpeg"
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
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const getDialogProps = () => {
    switch (view) {
      case View.Contributors:
        return {
          form,
          onCancel: () => setView(View.Info),
          cancelLabel: 'Back',
          confirmLabel: 'Create',
        };
      case View.Info:
        return {
          form: tribeBadges.length === 0 ? form : '',
          confirmLabel: tribeBadges.length === 0 ? 'Create' : 'Next',
          onConfirm:
            tribeBadges.length === 0
              ? undefined
              : (event) => {
                  event.preventDefault();
                  event.stopPropagation();

                  if (name === '') {
                    setError('name', {
                      message: 'is required',
                    });
                    return;
                  }

                  setView(View.Contributors);
                },
        };
    }
  };

  return (
    <Dialog
      show
      isFetching={isUploading || isSubmitting}
      onClose={onClose}
      title="Create Channel"
      {...getDialogProps()}
    >
      <div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} id={form}>
              {renderView()}
            </form>
          </FormProvider>
        </div>
      </div>
    </Dialog>
  );
};

const CreateChannelDialogProxy = (props: Props) => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  return (
    <Query api={`/core-api/tribe/${tribeID}/badges`}>
      {() => <CreateChannelDialog {...props} />}
    </Query>
  );
};

export default CreateChannelDialogProxy;
