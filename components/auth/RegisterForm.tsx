import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { tw } from 'twind';
import * as Yup from 'yup';

// api
import { register as registerAction } from 'api/authentication';

// utils
import {
  EmailPattern,
  NamePattern,
  UsernamePattern,
  PasswordPattern,
} from 'utils/patterns';

// hooks
import { useAuth } from 'context/user';
import { useToast } from 'context/toast';

// utils
import { mergeClassNames } from 'utils/styles';
import { PasswordInput } from 'components/common';

interface RegisterFormValues {
  displayName: string;
  email: string;
  password: string;
  username: string;
  terms: string;
  wallet: string;
}

const validationSchema = Yup.object().shape({
  terms: Yup.bool().oneOf([true], 'You have to accept the terms'),
  wallet: Yup.bool().oneOf(
    [true],
    'You have to accept that a wallet will be created for you'
  ),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const toast = useToast();
  const { setSession } = useAuth();

  const onSubmit = async ({
    displayName,
    email,
    password,
    username,
  }: RegisterFormValues) => {
    try {
      const response = await registerAction({
        displayName,
        email,
        password,
        username,
        client: window?.navigator.userAgent,
        redirect: '/',
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
            pattern={EmailPattern}
            placeholder="jhon@example.com"
            className={tw`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
            {...register('email')}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className={tw`block text-sm font-medium text-gray-700`}
        >
          Username
        </label>
        <div className={tw`mt-1`}>
          <input
            id="username"
            type="text"
            autoComplete="username"
            required
            maxLength={20}
            minLength={2}
            pattern={UsernamePattern}
            placeholder="johndoe"
            className={tw`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
            {...register('username')}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className={tw`block text-sm font-medium text-gray-700`}
        >
          Name
        </label>
        <div className={tw`mt-1`}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            required
            maxLength={40}
            minLength={2}
            pattern={NamePattern}
            placeholder="Jonathan Doe"
            className={tw`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
            {...register('displayName')}
            aria-invalid="true"
            aria-describedby="displayName-error"
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
          <PasswordInput
            id="password"
            autoComplete="current-password"
            required
            pattern={PasswordPattern}
            minLength={8}
            placeholder="Thisismypassword123*"
            register={register}
          />
        </div>
      </div>

      <div className={tw`flex items-center justify-between`}>
        <div className={tw`flex items-center`}>
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className={tw`h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded`}
            aria-invalid="true"
            aria-describedby="terms-error"
            {...register('terms')}
          />
          <label
            htmlFor="terms"
            className={tw`ml-2 block text-sm text-gray-900`}
          >
            I have read and agree to the{' '}
            <a
              className={tw`text-blue-500`}
              href="https://common.sapien.network/terms.html"
              target="_blank"
              rel="noreferrer"
            >
              Terms & Conditions
            </a>
          </label>
        </div>
      </div>

      <div className={tw`flex items-center justify-between`}>
        <div className={tw`flex items-center`}>
          <input
            id="wallet"
            name="wallet"
            type="checkbox"
            className={tw`h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded`}
            aria-invalid="true"
            required
            aria-describedby="wallet-error"
            {...register('wallet')}
          />
          <label
            htmlFor="wallet"
            className={tw`ml-2 block text-sm text-gray-900`}
          >
            I understand that a wallet will be created for me
          </label>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className={tw`${
            isSubmitting ? 'cursor-not-allowed disabled:opacity-75' : ''
          }
            'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
          disabled={isSubmitting}
        >
          Sign up
        </button>
        <div className={tw`mt-2`}>
          <p className={tw`text-sm inline`}>Already have an account?</p>
          <Link href="/login">
            <a
              className={tw`font-medium text-sm text-purple-600 hover:text-purple-500`}
            >
              &nbsp;login
            </a>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
