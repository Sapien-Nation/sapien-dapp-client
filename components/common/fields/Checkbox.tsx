import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

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
            required: (value) => value || 'Please check',
          },
        })}
        {...rest}
      />
      {label}
    </>
  );
};

export default Checkbox;
