import { useRef } from 'react';
import { RefreshIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

// api
import { changePassword } from 'api/authentication';

// hooks
import { useToast } from 'context/toast';

// utils
import { mergeClassNames } from 'utils/styles';

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
  const passwordField = useRef<HTMLInputElement | null>(null);
  const confirmPasswordField = useRef<HTMLInputElement | null>(null);

  const {
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<ChangePasswordFormValues>();

  const onSubmit = async ({
    password,
    repeatPassword,
  }: ChangePasswordFormValues) => {
    try {
      await changePassword({
        password: passwordField.current.value,
        token,
      });

      push('/change-password/success');
    } catch (error) {
      toast({
        message: error,
      });
    }
  };

  const validatePassword = () => {
    if (passwordField.current.value !== confirmPasswordField.current.value) {
      confirmPasswordField.current.setCustomValidity("Passwords Don't Match");
      return;
    } else {
      confirmPasswordField.current.setCustomValidity('');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            ref={passwordField}
            onChange={validatePassword}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Repeat Password
        </label>
        <div className="mt-1">
          <input
            id="confirmPassword"
            type="password"
            autoComplete="repeat-password"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            ref={confirmPasswordField}
            onKeyUp={validatePassword}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className={mergeClassNames(
            isSubmitting ? 'cursor-not-allowed' : '',
            'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
          )}
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <RefreshIcon className="animate-spin h-5 w-5 mr-3" />
          )}
          Change Password
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
