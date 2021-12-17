import Link from 'next/link';
import { useForm, FormProvider } from 'react-hook-form';
import { tw } from 'twind';

// api
import { register as registerAction } from 'api/authentication';

// components
import {
  Checkbox,
  PasswordInput,
  TextInput,
  TextInputLabel,
} from 'components/common';

// hooks
import { useAuth } from 'context/user';
import { useToast } from 'context/toast';

interface RegisterFormValues {
  email: string;
  firstName: string;
  password: string;
  username: string;
  lastName: string;
  terms: boolean;
  wallet: boolean;
}

const RegisterForm = () => {
  const methods = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      firstName: '',
      password: '',
      username: '',
      lastName: '',
      terms: false,
      wallet: false,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const toast = useToast();
  const { setSession } = useAuth();

  const onSubmit = async ({
    email,
    firstName,
    lastName,
    password,
    username,
  }: RegisterFormValues) => {
    try {
      const response = await registerAction({
        firstName,
        lastName,
        email,
        password,
        username,
        client: window?.navigator.userAgent,
        redirect: '/',
      });

      setSession(response);
    } catch (error) {
      toast({
        message: error || 'Please contact support',
      });
    }
  };

  console.log(errors);
  const termsError = errors.terms?.message;
  const passwordError = errors.password?.message;
  const walletError = errors.wallet?.message;
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
              maxLength={100}
              placeholder="email@example.com"
              type="text"
              className={tw`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
              rules={{
                validate: {
                  required: (value) => value.length > 0 || 'is required',
                  email: (value) =>
                    /^\b[\w\.-]+@[\w\.-]+\.\w{1,15}\b$/.test(value) ||
                    'is not valid',
                },
              }}
            />
          </div>
        </div>

        <div>
          <TextInputLabel
            label="Username"
            name="username"
            error={errors.username?.message}
          />
          <div className={tw`mt-1`}>
            <TextInput
              name="username"
              maxLength={30}
              autoComplete="username"
              placeholder="johndoe"
              pattern={/^[a-zA-Z0-9](?:[a-zA-Z0-9_-]*[a-zA-Z0-9])?$/}
              rules={{
                validate: {
                  required: (value) => value.length > 0 || 'is required',
                  maxLength: (value) =>
                    value?.length <= 31 ||
                    'Must be Between 2 and 31 characters long',
                },
              }}
              className={tw`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
            />
          </div>
        </div>

        <div className={tw`grid grid-cols-6 gap-6`}>
          <div className={tw`col-span-6 sm:col-span-3`}>
            <TextInputLabel
              label="First Name"
              name="firstName"
              error={errors.firstName?.message}
            />
            <div className={tw`mt-1`}>
              <TextInput
                name="firstName"
                maxLength={50}
                autoComplete="firstName"
                placeholder="John"
                pattern={/^[a-zA-Z\s]*$/}
                rules={{
                  validate: {
                    required: (value) => value.length > 0 || 'is required',
                  },
                }}
                className={tw`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
              />
            </div>
          </div>

          <div className={tw`col-span-6 sm:col-span-3`}>
            <TextInputLabel
              label="Last Name"
              name="lastName"
              error={errors.lastName?.message}
            />
            <div className={tw`mt-1`}>
              <TextInput
                name="lastName"
                maxLength={50}
                autoComplete="lastName"
                placeholder="Doe"
                pattern={/^[a-zA-Z\s]*$/}
                rules={{
                  validate: {
                    required: (value) => value.length > 0 || 'is required',
                  },
                }}
                className={tw`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
              />
            </div>
          </div>
        </div>

        <div className={tw`space-y-1`}>
          <TextInputLabel
            label="Password"
            name="password"
            error={errors.password?.message}
          />
          <div className={tw`mt-1`}>
            <PasswordInput
              control={control}
              validate={(value) => value.length > 0 || 'is required'}
              inputProps={{
                'aria-invalid': Boolean(passwordError),
                'aria-describedby': `password-error`,
              }}
            />
          </div>
        </div>

        <div className={tw`flex items-center justify-between`}>
          <div className={tw`flex items-center`}>
            <Checkbox
              name="terms"
              className={tw`h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded`}
              aria-invalid="true"
              aria-describedby="terms-error"
              label={
                <label
                  htmlFor="terms"
                  className={tw`ml-2 block text-xs ${
                    termsError ? 'text-red-500' : 'text-gray-900'
                  }`}
                  id={termsError ? 'terms-error' : ''}
                >
                  I have read and agree to the{' '}
                  <a
                    className={tw`text-blue-500`}
                    href="https://common.sapien.network/terms.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Terms & Conditions
                  </a>{' '}
                  {termsError}
                </label>
              }
            />
          </div>
        </div>

        <div className={tw`flex items-center justify-between`}>
          <div className={tw`flex items-center`}>
            <Checkbox
              name="wallet"
              className={tw`h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded`}
              aria-invalid="true"
              aria-describedby="wallet-error"
              label={
                <label
                  htmlFor="wallet"
                  className={tw`ml-2 block text-xs ${
                    walletError ? 'text-red-500' : 'text-gray-900'
                  }`}
                  id={walletError ? 'wallet-error' : ''}
                >
                  I understand that a wallet will be created for me{' '}
                  {walletError}
                </label>
              }
            />
          </div>
        </div>

        <div className={tw`mt-8`}>
          <button
            type="submit"
            className={tw`${
              isSubmitting ? 'cursor-not-allowed disabled:opacity-75' : ''
            }
              w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
            disabled={isSubmitting}
          >
            Sign up
          </button>
          <div className={tw`mt-8 text-center`}>
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
    </FormProvider>
  );
};

export default RegisterForm;
