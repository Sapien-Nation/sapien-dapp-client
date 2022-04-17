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
      className={`shadow-sm r-10 pl-3 pt-3 pb-3 block w-full sm:text-sm border-0 rounded-md resize-none ${className}`}
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
