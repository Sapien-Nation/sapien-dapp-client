import { useFormContext } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';
import { useTheme } from 'next-themes';

// utils
import { mergeClassNames } from 'utils/styles';

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  rules?: any;
  maxLength: number;
}

const Input = ({ name, className, rules = {}, maxLength, ...rest }: Props) => {
  const { register } = useFormContext();
  const { theme } = useTheme();

  return (
    <textarea
      {...register(name, {
        ...rules,
        onChange: (event) => {
          event.preventDefault();
          let value = event.target.value;

          if (value.length > maxLength) {
            value = value.slice(0, maxLength);
          }

          event.target.value = value;
        },
      })}
      {...rest}
      className={mergeClassNames(
        theme && theme === 'dark' ? 'bg-gray-800' : '',
        className
      )}
    />
  );
};

export default Input;
