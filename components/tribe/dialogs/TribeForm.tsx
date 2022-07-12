import { useState, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { XIcon, CameraIcon } from '@heroicons/react/outline';

// api
import { uploadImage } from 'api/tribe';

// components
import { TextareaInput, TextInput, TextInputLabel } from 'components/common';

// hooks
import { useToast } from 'context/toast';

enum MediaTypeUpload {
  Avatar = 'avatar',
  Cover = 'cover',
}

type Media = {
  key: string;
  url: string;
};

export interface FormValues {
  avatar: null | Media;
  cover: null | Media;
  description: string;
  name: string;
}

interface Props {
  form: string;
  defaultValues: any;
  isEdit?: boolean;
  onSubmit: any;
}

const TribeForm = ({
  form,
  isEdit = false,
  onSubmit,
  defaultValues,
}: Props) => {
  const toast = useToast();
  const avatarFileInput = useRef(null);
  const coverFileInput = useRef(null);
  const [fileType, setFileType] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const methods = useForm<FormValues>({
    defaultValues,
  });

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = methods;

  const [avatar, cover] = watch(['avatar', 'cover']);

  const handleUploadImage = async (
    file: File,
    mediaTypeToUpload: MediaTypeUpload
  ) => {
    setFileType(mediaTypeToUpload);
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
    setFileType('');
    setIsUploading(false);
  };

  return (
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
                                  avatarFileInput.current.click();
                                }}
                              />
                              <div className="px-4 py-5 bg-gray-900 space-y-6 sm:p-6"></div>
                            </>
                          ) : (
                            <>
                              {isUploading &&
                              fileType &&
                              fileType === 'avatar' ? (
                                <div className="absolute top-15 left-15">
                                  <svg
                                    role="status"
                                    className="mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-primary-200"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                      fill="currentFill"
                                    />
                                  </svg>
                                </div>
                              ) : (
                                <svg
                                  className="h-full w-full text-gray-300"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                              )}
                            </>
                          )}
                        </span>
                        <CameraIcon className="absolute w-5 right-0.5 bottom-0 text-gray-400" />

                        <input
                          ref={avatarFileInput}
                          accept=".png, .jpg, .jpeg"
                          className="sr-only"
                          id="avatar-upload"
                          onChange={(event) =>
                            handleUploadImage(
                              event.target.files[0],
                              MediaTypeUpload.Avatar
                            )
                          }
                          disabled={isUploading}
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
                      label="Description"
                      name="description"
                      error={errors.description?.message}
                    />
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <TextareaInput
                        name="description"
                        maxLength={1000}
                        placeholder="Describe your tribe"
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
                    <div
                      className={`${
                        Boolean(cover) ? 'cursor-auto' : 'hover:cursor-pointer'
                      } mt-1 relative min-h-8-75 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md`}
                      onClick={() => coverFileInput.current?.click()}
                    >
                      {Boolean(cover) ? (
                        <span className="relative">
                          <button
                            type="button"
                            aria-label="Remove Selected Cover"
                            className="absolute z-10 -top-1 -right-1 inline-flex items-center p-1 bg-gray-900 rounded-full shadow-sm text-white focus:outline-none"
                            onClick={(e) => {
                              e.stopPropagation();
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
                          {isUploading && fileType && fileType === 'cover' ? (
                            <div className="space-y-1 text-center self-center">
                              <svg
                                role="status"
                                className="mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-primary-200"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                            </div>
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
                                <span className="font-medium text-white hover:text-indigo-500">
                                  Upload a file
                                </span>
                                <input
                                  ref={coverFileInput}
                                  id="cover-upload"
                                  type="file"
                                  accept=".png, .jpg, .jpeg"
                                  disabled={isUploading}
                                  aria-labelledby="Upload Cover"
                                  className="sr-only"
                                  onChange={(event) => {
                                    handleUploadImage(
                                      event.target.files[0],
                                      MediaTypeUpload.Cover
                                    );
                                  }}
                                />
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
  );
};

export default TribeForm;
