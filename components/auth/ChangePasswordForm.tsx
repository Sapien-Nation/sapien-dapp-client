import { useRef } from 'react';
import { RefreshIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

// api
import { changePassword } from 'api/authentication';

// components
import { PasswordInput, TextInputLabel } from 'components/common';

// hooks
import { useToast } from 'context/toast';

interface ChangePasswordFormValues {
  password: string;
  confirm: string;
}

interface Props {
  token: string;
}

const ChangePasswordForm = ({ token }: Props) => {
  const toast = useToast();
  const { push } = useRouter();

  const methods = useForm<ChangePasswordFormValues>();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = methods;

  const onSubmit = async ({ password, confirm }: ChangePasswordFormValues) => {
    try {
      if (confirm !== password) {
        setError('password', { message: 'Passwords must match' });
        setError(
          'confirm',
          { message: 'Passwords must match' },
          { shouldFocus: true }
        );
        return false;
      }

      await changePassword({
        password,
        token,
      });

      push('/change-password/success');
    } catch (error) {
      toast({
        message: error,
      });
    }
  };

  const passwordError = errors.password?.message;
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1">
          <TextInputLabel
            label="Password"
            name="password"
            error={errors.password?.message}
          />
          <div className="mt-1">
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
        <div className="space-y-1">
          <TextInputLabel
            label="Confirm Password"
            name="confirm"
            error={errors.confirm?.message}
          />
          <div className="mt-1">
            <PasswordInput
              name="confirm"
              shouldValidate={false}
              inputProps={{
                'aria-invalid': Boolean(passwordError),
                'aria-describedby': `password-error`,
              }}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className={
              isSubmitting
                ? 'cursor-not-allowed w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sapien hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                : 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sapien hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
            }
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <RefreshIcon className="animate-spin h-5 w-5 mr-3" />
            )}
            Change Password
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ChangePasswordForm;
