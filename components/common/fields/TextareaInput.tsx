import { tw } from 'twind';
import { useFormContext } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  rules?: any;
  maxLength: number;
}

const Input = ({ name, rules = {}, maxLength, ...rest }: Props) => {
  const { register } = useFormContext();

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
    />
  );
};

export default Input;
