import { RefreshIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

// twind
import { tw } from 'twind';

// api
import { login } from 'api/authentication';

// hooks
import { useAuth } from 'context/user';
import { useToast } from 'context/toast';

// utils
import { mergeClassNames } from 'utils/styles';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    formState: { isSubmitting },
    register,
    handleSubmit,
  } = useForm<LoginFormValues>();

  const toast = useToast();
  const { setSession } = useAuth();

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    try {
      console.log(email, password);
      const response = await login({
        email,
        client: window?.navigator.userAgent,
        redirect: '/',
        password,
      });

      setSession(response);
    } catch (error) {
      toast({
        message: error,
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

      <div className={tw`space-y-1`}>
        <label
          htmlFor="password"
          className={tw`block text-sm font-medium text-gray-700`}
        >
          Password
        </label>
        <div className={tw`mt-1`}>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            minLength={8}
            className={tw`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
            {...register('password')}
          />
        </div>
      </div>

      <div className={tw`flex items-center justify-between`}>
        <div className={tw`flex items-center`}>
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className={tw`h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded`}
          />
          <label
            htmlFor="remember-me"
            className={tw`ml-2 block text-sm text-gray-900`}
          >
            Remember me
          </label>
        </div>

        <div className={tw`text-sm`}>
          <Link href="/forgot">
            <a
              className={tw`font-medium text-purple-600 hover:text-purple-500`}
            >
              Forgot your password?
            </a>
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className={tw`
            ${isSubmitting ? 'cursor-not-allowed' : ''}
            'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <RefreshIcon className={tw`animate-spin h-5 w-5 mr-3`} />
          )}
          Sign in
        </button>

        <div className={tw`mt-2`}>
          <p className={tw`text-sm inline`}>{`Don't have an account?`}</p>
          <Link href="/register">
            <a
              className={tw`font-medium text-sm text-purple-600 hover:text-purple-500`}
            >
              &nbsp;register
            </a>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
