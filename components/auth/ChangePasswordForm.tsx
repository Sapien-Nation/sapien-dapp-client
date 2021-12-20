import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { tw } from 'twind';

// api
import { changePassword } from 'api/authentication';

// components
import { PasswordInput, TextInputLabel } from 'components/common';

// hooks
import { useToast } from 'context/toast';

interface ChangePasswordFormValues {
  password: string;
  repeatPassword: string;
}

interface Props {
  token: string;
}

const ChangePasswordForm = ({ token }: Props) => {
  const toast = useToast();
  const { push } = useRouter();

  const {
    control,
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit,
  } = useForm<ChangePasswordFormValues>();

  const onSubmit = async (values: ChangePasswordFormValues) => {
    try {
      await changePassword({
        password: values.password,
        token,
      });

      push('/change-password/success');
    } catch (error) {
      toast({
        message: error || 'Invalid Token',
      });
    }
  };

  const passwordError = errors.password?.message;
  const repeatPasswordError = errors.repeatPassword?.message;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={tw`space-y-6`}>
      <div className={tw`mt-8`}>
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

      <div className={tw`mt-8`}>
        <TextInputLabel
          label="Repeat Password"
          name="repeatPassword"
          error={errors.repeatPassword?.message}
        />
        <div className={tw`mt-1`}>
          <PasswordInput
            name="repeatPassword"
            control={control}
            validate={(value) =>
              value === getValues('password') || 'should be equal as password'
            }
            inputProps={{
              'aria-invalid': Boolean(passwordError),
              'aria-describedby': `repeat-error`,
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
          Change Password
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
