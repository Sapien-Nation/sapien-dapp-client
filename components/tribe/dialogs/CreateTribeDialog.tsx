import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';

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
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <p className="mt-1 text-sm text-gray-600">
                We are happy that you diced to start a tribe here at Sapien
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} id={form}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          id="email"
                          className="block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                          placeholder="Sapien Passports Mexico"
                          aria-invalid={Boolean(errors.name) ? 'true' : 'false'}
                          aria-describedby="email-error"
                          {...register('name', {
                            required: 'You need a tribe name.',
                          })}
                        />
                        {Boolean(errors.name) && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ExclamationCircleIcon
                              className="h-5 w-5 text-red-500"
                              aria-hidden="true"
                            />
                          </div>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-red-600" id="email-error">
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
