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
  ...rest
}: Props) => {
  const { register } = useFormContext();

  return (
    <input
      {...rest}
      {...register(name, {
        ...rules,
        onChange: (event) => {
          event.preventDefault();
          let value = event.target.value;

          if (value.length > maxLength) {
            value = value.slice(0, maxLength);
          }

          if (pattern) {
            if (pattern.test(value)) {
              value = value;
            } else {
              value = value.slice(0, -1);
            }
          }

          if (replaceWhiteSpace === true) {
            const lastCharacter = value.substr(-1);
            if (lastCharacter === ' ') {
              value = `${value.slice(0, -1)}-`;
            }
          }

          event.target.value = value;
        },
      })}
    />
  );
};

export default TextInput;
