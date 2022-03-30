import { useForm, useFieldArray, FormProvider } from 'react-hook-form';

// components
import {
  Dialog,
  TextInput,
  TextInputLabel,
  TopicsInput,
} from 'components/common';

//hooks
import { useToast } from 'context/toast';

interface Props {
  onClose: () => void;
}

interface FormValues {
  name: string;
  topics?: Array<object>;
}

const form = 'create-room-form';
const CreateRoomDialog = ({ onClose }: Props) => {
  const toast = useToast();
  const methods = useForm<FormValues>({
    defaultValues: {
      name: '',
      topics: [],
    },
  });

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = methods;

  const { fields, insert, remove } = useFieldArray({
    name: 'topics',
    control,
  });

  const onSubmit = async () => {
    try {
      onClose();
    } catch (error) {
      toast({
        message: error || 'Service unavailable',
      });
    }
  };

  return (
    <Dialog
      isFetching={false}
      onClose={onClose}
      title="Create a Room"
      form={form}
      confirmLabel="Create"
    >
      <div className="mt-5 md:mt-0 md:col-span-2">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} id={form}>
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
                pattern={/^[a-zA-Z\s]$/}
                rules={{
                  validate: {
                    required: (value) => value.length > 0 || 'is required',
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
            <div className="flex-1">
              <TextInputLabel
                label="Topics"
                name="topics"
                error={errors.name?.message}
              />
              <TopicsInput
                className="block w-full bg-gray-800 pr-10 pl-3 pt-3 pb-3 border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                name="topics"
                placeholder="Press enter to add topic"
                remove={remove}
                maxLength={50}
                insert={insert}
                pattern={/^[a-zA-Z\s]$/}
                options={fields}
                rules={{
                  validate: {
                    required: (value) => value.length > 0 || 'is required',
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
          </form>
        </FormProvider>
      </div>
    </Dialog>
  );
};

export default CreateRoomDialog;
