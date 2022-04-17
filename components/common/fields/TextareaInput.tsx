import { useFormContext } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';
interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  rules?: any;
  maxLength: number;
}

const Textarea = ({
  name,
  className,
  rules = {},
  maxLength,
  ...rest
}: Props) => {
  const { register } = useFormContext();

  return (
    <textarea
      rows={5}
      className={`appearance-none block w-full px-3 py-2 border bg-gray-800 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm resize-none ${className}`}
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
    />
  );
};

export default Textarea;
