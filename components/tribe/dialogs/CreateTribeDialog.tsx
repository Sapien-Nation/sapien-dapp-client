import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { tw } from 'twind';

// components
import { Dialog } from 'components/common';

// context
import { useToast } from 'context/toast';

// types
import type { ProfileTribe } from 'tools/types/tribe';

interface Props {
  onClose: () => void;
}

interface FormValues {
  name: string;
}

const form = 'create-tribe-form';
const CreateTribeDialog = ({ onClose }: Props) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>();
  const toast = useToast();
  const { cache } = useSWRConfig();

  const onSubmit = async () => {
    try {
      // TODO api call
      cache.set('/api/v3/profile/tribes', (tribes: ProfileTribe) => tribes);
    } catch (error) {
      toast({ message: error.message });
    }
  };

  return (
    <Dialog onClose={onClose} title="Create a Tribe" form={form}>
      <>
        <div>
          <div className={tw`md:col-span-1`}>
            <div className={tw`px-4 sm:px-0`}>
              <p className={tw`mt-1 text-sm text-gray-600`}>
                We are happy that you diced to start a tribe here at Sapien
              </p>
            </div>
          </div>
          <div className={tw`mt-5 md:mt-0 md:col-span-2`}>
            <form onSubmit={handleSubmit(onSubmit)} id={form}>
              <div className={tw`sm:overflow-hidden`}>
                <div className={tw`px-4 py-5 bg-white space-y-6 sm:p-6`}>
                  <div>
                    <div>
                      <label
                        htmlFor="email"
                        className={tw`block text-sm font-medium mt-4 text-gray-700`}
                      >
                        Email
                      </label>
                      <div className={tw`mt-1 relative rounded-md shadow-sm`}>
                        <input
                          type="text"
                          id="email"
                          className={tw`block w-full pr-10 pl-3 pt-3 pb-3 bg-gray-100 border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md`}
                          placeholder="Sapien Passports Mexico"
                          aria-invalid={Boolean(errors.name) ? 'true' : 'false'}
                          aria-describedby="email-error"
                          {...register('name', {
                            required: 'You need a tribe name.',
                          })}
                        />
                        {Boolean(errors.name) && (
                          <div
                            className={tw`absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none`}
                          >
                            <ExclamationCircleIcon
                              className={tw`h-5 w-5 text-red-500`}
                              aria-hidden="true"
                            />
                          </div>
                        )}
                      </div>
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
                          placeholder="Identifier"
                        />
                        {Boolean(errors.name) && (
                          <div
                            className={tw`absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none`}
                          >
                            <ExclamationCircleIcon
                              className={tw`h-5 w-5 text-red-500`}
                              aria-hidden="true"
                            />
                          </div>
                        )}
                      </div>
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
                            placeholder="Description..."
                            defaultValue={''}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          className={tw`block text-sm mt-4 font-medium text-gray-700`}
                        >
                          Avatar
                        </label>
                        <div className={tw`mt-1 flex items-center`}>
                          <span
                            className={tw`inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100`}
                          >
                            <svg
                              className={tw`h-full w-full text-gray-300`}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>
                          <button
                            type="button"
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
                                htmlFor="file-upload"
                                className={tw`relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500`}
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className={tw`sr-only`}
                                />
                              </label>
                              <p className={tw`pl-1`}>or drag and drop</p>
                            </div>
                            <p className={tw`text-xs text-gray-500`}>
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                      <p
                        className={tw`mt-2 text-sm text-red-600" id="email-error`}
                      >
                        {errors.name?.message}
                      </p>
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
