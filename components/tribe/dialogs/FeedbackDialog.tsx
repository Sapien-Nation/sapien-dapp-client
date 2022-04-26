import { useForm, FormProvider } from 'react-hook-form';

// api
import { leaveFeedback } from 'api/feedback';

// constants
import { ToastType } from 'constants/toast';

// components
import {
  Dialog,
  Select,
  TextareaInput,
  TextInputLabel,
} from 'components/common';

// hooks
import { useToast } from 'context/toast';

// types
import { FeedbackType } from 'tools/constants/feedback';

interface Props {
  onClose: () => void;
}

interface FormValues {
  type: FeedbackType;
  description: string;
}

const Feedbacks = [
  {
    id: '1',
    value: FeedbackType.Bug,
    name: 'Bug',
  },
  {
    id: '2',
    value: FeedbackType.Feedback,
    name: 'Feedback',
  },
  {
    id: '3',
    value: FeedbackType.FeatureRequest,
    name: 'Feature Request',
  },
];

const form = 'feedback-form';
const FeedbackDialog = ({ onClose }: Props) => {
  const toast = useToast();
  const methods = useForm<FormValues>({
    defaultValues: {
      description: '',
      type: FeedbackType.Feedback,
    },
  });

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
  } = methods;

  const onSubmit = async ({ description, type }: FormValues) => {
    try {
      toast({
        message: 'Thanks for your cooperation!',
        type: ToastType.Success,
      });

      await leaveFeedback({ description, type });
      onClose();
    } catch (error) {
      toast({
        message: error,
      });
    }
  };

  return (
    <Dialog
      show
      isFetching={isSubmitting}
      onClose={onClose}
      title="Help us to be a better Sapien!"
      form={form}
      confirmLabel="Submit"
    >
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id={form}
          className="mt-5 md:mt-0 md:col-span-2"
        >
          <div className="sm:overflow-hidden">
            <div className="mt-8">
              <Select
                defaultValue={Feedbacks[1].value}
                name="type"
                items={Feedbacks}
              />
            </div>
            <div>
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
                        required: (value) => value.length > 0 || 'is required',
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
            </div>
          </div>
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default FeedbackDialog;
