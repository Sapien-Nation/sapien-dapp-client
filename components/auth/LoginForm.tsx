import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

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
  const { query } = useRouter();
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
        redirect: (query.redirect as string) || '/',
        password,
      });

      setSession(response, (query.redirect as string) || null);
    } catch (error) {
      toast({
        message: error || 'Invalid Credentials',
      });
    }
  };

  const passwordError = errors.password?.message;
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <TextInputLabel
            label="Email"
            name="email"
            error={errors.email?.message}
          />
          <div className="mt-1">
            <TextInput
              autoComplete="email"
              className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              name="email"
              placeholder="email@example.com"
              rules={{
                validate: {
                  required: (value) => value.length > 0 || 'is required',
                },
              }}
            />
          </div>
        </div>

        <div className="mt-8">
          <TextInputLabel
            label="Password"
            name="password"
            error={errors.password?.message}
            extraLabel={
              <Link href="/forgot">
                <a className="text-xs text-sapien hover:text-purple-500 float-right">
                  Forgot your password?
                </a>
              </Link>
            }
          />
          <div className="mt-1">
            <PasswordInput
              control={control}
              shouldValidate={false}
              inputProps={{
                'aria-invalid': Boolean(passwordError),
                'aria-describedby': 'password-error',
              }}
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className={`${
              isSubmitting ? 'cursor-not-allowed disabled:opacity-75' : ''
            }
            w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
            disabled={isSubmitting}
          >
            Sign in
          </button>

          <div className="mt-8 text-center">
            <p className="text-sm inline">{`Don't have an account?`}</p>
            <Link
              href={
                query.redirect
                  ? `/register?redirect=${query.redirect}`
                  : '/register'
              }
            >
              <a className="font-medium text-sm text-sapien hover:text-purple-500">
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
