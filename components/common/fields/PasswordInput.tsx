import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { InputHTMLAttributes, useState } from 'react';
import { Control, useController } from 'react-hook-form';

interface Props {
  autoComplete?: string;
  control?: Control<any>;
  name?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  required?: boolean;
  shouldValidate?: boolean;
  validate?: (value: string) => boolean | string;
}

const PasswordInput = ({
  autoComplete,
  control,
  name = 'password',
  inputProps = {},
  required = true,
  shouldValidate = true,
  validate,
}: Props) => {
  const [show, setShow] = useState<boolean>(false);

  const { field: passwordControl } = useController({
    defaultValue: '',
    control,
    name,
    rules: {
      minLength: { value: 8, message: 'should be at least 8 characters long' },
      maxLength: { value: 100, message: 'is too long' },
      validate: shouldValidate
        ? (value) => {
            if (!required && value.length === 0) return true;

            // if (softPasswords.includes(value!)) return 'is too Weak';

            if (
              !/[A-Z]/.test(value) ||
              !/[a-z]/.test(value) ||
              !/\d/.test(value)
            ) {
              if (!/\d/.test(value)) return 'should have a number';

              if (!/[A-Z]/.test(value!))
                return 'should have an uppercase character';

              if (!/[a-z]/.test(value!))
                return 'should have a lowercase character';
            }

            return validate?.(value) || true;
          }
        : undefined,
    },
  });

  return (
    <>
      <div className="relative mb-2">
        <input
          autoComplete={autoComplete}
          className="appearance-none block w-full px-3 py-2 border bg-gray-800 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          id={name}
          placeholder="Thisismypassword123*"
          type={show ? 'text' : 'password'}
          {...passwordControl}
          {...inputProps}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
          {show ? (
            <EyeIcon
              onClick={() => setShow(!show)}
              className="cursor-pointer h-6 w-6 text-white ${
              show ? 'hidden' : 'block'
            }"
            />
          ) : (
            <EyeOffIcon
              onClick={() => setShow(!show)}
              className="cursor-pointer h-6 w-6 text-white ${
            show ? 'block' : 'hidden'
          }"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PasswordInput;
