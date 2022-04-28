import { useFormContext } from 'react-hook-form';
import { SelectHTMLAttributes } from 'react';

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'pattern'>;
interface selectOption {
  id: string;
  value: string | number;
  name: string;
}
interface Props extends SelectProps {
  name: string;
  pattern?: RegExp;
  rules?: any;
  defaultValue?: string;
  items: Array<selectOption>;
}

const Select = ({
  name,
  pattern,
  rules = {},
  defaultValue,
  items,
  ...rest
}: Props) => {
  const { register } = useFormContext();

  return (
    <select
      className="appearance-none block w-full px-3 py-2 border bg-gray-800 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
      defaultValue={defaultValue}
      {...rest}
      {...register(name, {
        ...rules,
        onChange: (event) => {
          event.preventDefault();
          let value = event.target.value;
          event.target.value = value;
        },
      })}
    >
      {items?.map((item) => (
        <option value={item.value} key={String(item.id)}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
