import { useFormContext } from 'react-hook-form';
import { InputHTMLAttributes, useEffect, useState } from 'react';

// utils
import { formatDate } from 'utils/date';

// components
import { CalendarDialog } from 'components/common';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'pattern'>;
interface Props extends InputProps {
  name: string;
  pattern?: RegExp;
  maxLength?: number;
  replaceWhiteSpace?: boolean;
  rules?: any;
  ref?: any;
  startAdornment?: any;
  valueModifier?: (val: string) => string | null;
}

const CalendarInput = ({
  name,
  pattern,
  maxLength = 100,
  replaceWhiteSpace = false,
  rules = {},
  inputMode,
  disabled,
  valueModifier,
  ref,
  autoFocus,
  startAdornment,
  className = 'appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm',
  ...rest
}: Props) => {
  const { register, setFocus } = useFormContext();
  const [showDialog, setShowDialog] = useState(false);
  const [value, setValue] = useState({ date: formatDate(new Date(),'MMM dd, yyyy'), time: formatDate(new Date(), 'hh:mm') });

  useEffect(() => {
    if (autoFocus) {
      setFocus(name);
    }
  });

  return (
    <div className="flex flex-row">
      {startAdornment && (
        <div className="flex items-center">
          <span className="absolute w-8 text-right">{startAdornment}</span>
        </div>
      )}
      <input
        autoFocus={autoFocus}
        className={`${className} ${
          disabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-800'
        } ${startAdornment ? 'pl-8' : ''}`}
        disabled={disabled}
        readOnly
        value={`${value.date} - ${value.time}`}
        onClick={() => setShowDialog(true)}
        {...rest}
        {...register(name, {
          ...rules,
          onChange: (event) => {
            event.preventDefault();
            let value = event.target.value;

            if (value.length > maxLength) {
              value = value.slice(0, maxLength);
            }

            if (inputMode === 'numeric' && Number(value) > maxLength) {
              value = maxLength;
            }

            event.target.value = valueModifier ? valueModifier(value) : value;
          },
        })}
      />
      {showDialog && (
        <CalendarDialog
          name={name}
          onClose={() => setShowDialog(false)}
          setValue={setValue}
          setShowDialog={setShowDialog}
        />
      )}
    </div>
  );
};

export default CalendarInput;
