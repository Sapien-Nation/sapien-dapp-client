import { mergeClassNames } from 'utils/styles';

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
      className={mergeClassNames(
        error ? 'text-red-500' : '',
        'text-sm mt-4 mb-2 block'
      )}
      id={error ? `${name}-error` : ''}
    >
      <span
        className={mergeClassNames(error ? 'font-extrabold' : 'font-medium')}
      >
        {label}
      </span>{' '}
      {error}
      {extraLabel}
    </label>
  );
};

export default TextInputLabel;
