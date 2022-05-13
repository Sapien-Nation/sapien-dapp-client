import { useFormContext } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'pattern'>;
interface Props extends InputProps {
  name: string;
  pattern?: RegExp;
  maxLength?: number;
  replaceWhiteSpace?: boolean;
  rules?: any;
}

const TextInput = ({
  name,
  pattern,
  maxLength = 100,
  replaceWhiteSpace = false,
  rules = {},
  inputMode,
  disabled,
  ...rest
}: Props) => {
  const { register } = useFormContext();

  return (
    <input
      disabled={disabled}
      className={
        disabled
          ? 'appearance-none block w-full px-3 py-2 border bg-gray-500 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm cursor-not-allowed'
          : 'appearance-none block w-full px-3 py-2 border bg-gray-800 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
      }
      onKeyPress={(event) => {
        if (pattern) {
          if (!pattern.test(event.key)) {
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
        }

        if (replaceWhiteSpace === true) {
          if (event.key === ' ') {
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
        }

        return true;
      }}
      {...rest}
      {...register(name, {
        ...rules,
        onChange: (event) => {
          event.preventDefault();
          let value = event.target.value;

          if (value.length > maxLength) {
            value = value.slice(0, maxLength);
          }

          if (inputMode === 'numeric' && Number(value) > maxLength) {
            value = maxLength;
          }

          event.target.value = value;
        },
      })}
    />
  );
};

export default TextInput;
