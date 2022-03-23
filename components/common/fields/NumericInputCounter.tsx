import { useFormContext } from 'react-hook-form';

// components
import { TextInput } from 'components/common';

// icons
import { PlusSmIcon, MinusSmIcon } from '@heroicons/react/outline';

interface Props {
  maxLength?: number;
  name: string;
}

const NumericInputCounter = ({ maxLength = 99, name }: Props) => {
  const { getValues, setValue, watch } = useFormContext();

  const handleIncrement = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const amount = Number(getValues(name));
    if (amount < maxLength) {
      setValue(name, amount + 1);
    }
  };

  const handleDecrement = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const amount = Number(getValues(name));

    if (amount >= 1) {
      setValue(name, amount - 1);
    }
  };

  const [watchedValue] = watch([name]);

  return (
    <div>
      <button
        aria-label="Decrement badge amount"
        disabled={Number(watchedValue) === 1}
        onClick={handleDecrement}
        className="bg-gray-100 rounded-full p-1"
      >
        <MinusSmIcon className="h-4 w-4" aria-hidden="true" />
      </button>
      <TextInput
        name={name}
        className="w-10"
        type="text"
        inputMode="numeric"
        pattern={/^\d+$/}
        maxLength={maxLength}
        rules={{
          maxLength: { value: maxLength + 1, message: 'is to long' },
          required: { value: true, message: 'is required' },
        }}
      />
      <button
        aria-label="Increment badge amount"
        disabled={Number(watchedValue) > maxLength}
        onClick={handleIncrement}
        className="bg-gray-100 rounded-full p-1"
      >
        <PlusSmIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
};

export default NumericInputCounter;
