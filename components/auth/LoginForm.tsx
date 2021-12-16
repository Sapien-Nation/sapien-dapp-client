import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import { tw } from 'twind';

// components
import { TextInput, TextInputLabel, PasswordInput } from 'components/common';

// api
import { login } from 'api/authentication';

// hooks
import { useAuth } from 'context/user';
import { useToast } from 'context/toast';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const methods = useForm<LoginFormValues>();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = methods;

  const toast = useToast();
  const { setSession } = useAuth();

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    try {
      const response = await login({
        email,
        client: window?.navigator.userAgent,
        redirect: '/',
        password,
      });

      setSession(response);
    } catch (error) {
      toast({
        message: 'Invalid Credentials',
      });
    }
  };

  const passwordError = errors.password?.message;
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
              autoComplete="email"
              className={tw`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
              name="email"
              placeholder="email@example.com"
              type="text"
              rules={{
                validate: {
                  required: (value) => value.length > 0 || 'is required',
                },
              }}
            />
          </div>
        </div>

        <div className={tw`mt-8`}>
          <TextInputLabel
            label="Password"
            name="password"
            error={errors.password?.message}
            extraLabel={
              <Link href="/forgot">
                <a
                  className={tw`text-xs text-purple-600 hover:text-purple-500 float-right`}
                >
                  Forgot your password?
                </a>
              </Link>
            }
          />
          <div className={tw`mt-1`}>
            <PasswordInput
              control={control}
              validate={(value) => value.length > 0 || 'is required'}
              inputProps={{
                'aria-invalid': Boolean(passwordError),
                'aria-describedby': 'password-error',
              }}
            />
          </div>
        </div>

        <div className={tw`mt-8`}>
          <button
            type="submit"
            className={tw`${
              isSubmitting ? 'cursor-not-allowed disabled:opacity-75' : ''
            }
            w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm  text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
            disabled={isSubmitting}
          >
            Sign in
          </button>

          <div className={tw`mt-8 text-center`}>
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
    </FormProvider>
  );
};

export default LoginForm;
