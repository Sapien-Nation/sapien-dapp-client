import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { tw } from 'twind';

// api
import { forgot } from 'api/authentication';

// hooks
import { useToast } from 'context/toast';

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPasswordForm = () => {
  const toast = useToast();
  const { push } = useRouter();

  const {
    formState: { isSubmitting },
    register,
    handleSubmit,
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async ({ email }: ForgotPasswordFormValues) => {
    try {
      await forgot({ email });

      push('/forgot/success');
    } catch (error) {
      toast({
        message: 'Invalid Email',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={tw`space-y-6`}>
      <div>
        <label
          htmlFor="email"
          className={tw`block text-sm font-medium text-gray-700`}
        >
          Email address
        </label>
        <div className={tw`mt-1`}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            className={tw`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
            {...register('email')}
          />
        </div>
      </div>

      <div className={tw`flex items-center justify-between`}>
        <div className={tw`text-sm`}>
          <Link href="/login">
            <a
              className={tw`font-medium text-purple-600 hover:text-purple-500`}
            >
              Remember Password?
            </a>
          </Link>
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
    </form>
  );
};

export default ForgotPasswordForm;
