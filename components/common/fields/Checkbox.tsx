import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { tw } from 'twind';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactElement;
}

const Checkbox = ({ id, name, label, ...rest }: Props) => {
  const { register } = useFormContext();

  return (
    <>
      <input
        id={name}
        name={name}
        type="checkbox"
        {...register(name, {
          validate: {
            required: (value) => value.length > 0 || 'Please Check',
          },
        })}
        {...rest}
      />
      {label}
    </>
  );
};

export default Checkbox;
