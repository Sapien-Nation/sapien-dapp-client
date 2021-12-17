import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { tw } from 'twind';

// api
import { forgot } from 'api/authentication';

// components
import { TextInput, TextInputLabel } from 'components/common';

// hooks
import { useToast } from 'context/toast';

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPasswordForm = () => {
  const toast = useToast();
  const { push } = useRouter();

  const methods = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
    },
  });
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
  } = methods;

  const onSubmit = async ({ email }: ForgotPasswordFormValues) => {
    try {
      await forgot({ email });

      push('/forgot/success');
    } catch (error) {
      toast({
        message: error || 'Invalid Email',
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={tw`space-y-6`}>
        <div>
          <TextInputLabel
            label="Email"
            name="email"
            error={errors.email?.message}
          />
          <div className={tw`mt-1`}>
            <TextInput
              aria-invalid={Boolean(errors.email?.message)}
              aria-describedby="email-error"
              autoComplete="email"
              name="email"
              placeholder="email@example.com"
              type="text"
              className={tw`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
              rules={{
                validate: {
                  required: (value) => value.length > 0 || 'is required',
                  email: (value) =>
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                      value
                    ) || 'is not valid',
                },
              }}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className={tw`${
              isSubmitting ? 'cursor-not-allowed disabled:opacity-75' : ''
            }
            w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
            disabled={isSubmitting}
          >
            Send Email
          </button>
        </div>

        <div className={tw`mt-8 text-center`}>
          <Link href="/login">
            <a
              className={tw`mt-8 text-center font-medium text-sm text-purple-600 hover:text-purple-500`}
            >
              Return to Sign in
            </a>
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export default ForgotPasswordForm;
