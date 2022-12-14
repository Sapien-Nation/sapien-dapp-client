export interface Props {
  error: any;
  extraLabel?: React.ReactElement;
  name: string;
  label: string;
}

const TextInputLabel = ({ error, extraLabel = null, name, label }: Props) => {
  return (
    <label
      htmlFor={name}
      className={
        error
          ? 'text-red-500 text-sm mt-4 mb-2 block'
          : 'text-sm mt-4 mb-2 block'
      }
      id={error ? `${name}-error` : ''}
    >
      <span className={error ? 'font-bold' : 'font-medium'}>{label}</span>{' '}
      {error}
      {extraLabel}
    </label>
  );
};

export default TextInputLabel;
