import { tw } from 'twind';

export interface Props {
  error: string;
  extraLabel?: React.ReactElement;
  name: string;
  label: string;
}

const TextInputLabel = ({ error, extraLabel = null, name, label }: Props) => {
  return (
    <label
      htmlFor={name}
      className={tw`text-sm mt-4 block text-sm ${error && 'text-red-500'}`}
      id={error ? `${name}-error` : ''}
    >
      <span className={tw`${error ? 'font-extrabold' : 'font-medium'}`}>
        {label}
      </span>{' '}
      {error}
      {extraLabel}
    </label>
  );
};

export default TextInputLabel;
