import { tw } from 'twind';

// components
import { TextInput } from 'components/common';

// icons
import { PlusSmIcon, MinusSmIcon } from '@heroicons/react/outline';

const NumericInputCounter = ({
  name,
  watchBadgesAmount,
  setValue,
  register,
}) => {
  const handleIncrement = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValue(name, Number(watchBadgesAmount) + 1, {
      shouldValidate: true,
    });
  };

  const handleDecrement = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (Number(watchBadgesAmount) < 2) return;
    setValue(name, Number(watchBadgesAmount) - 1, {
      shouldValidate: true,
    });
  };
  return (
    <div>
      <button
        aria-label="Decrement amount"
        disabled={Number(watchBadgesAmount) < 2}
        onClick={handleDecrement}
        className={tw`bg-gray-100 rounded-full p-1`}
      >
        <MinusSmIcon className={tw`h-4 w-4`} aria-hidden="true" />
      </button>
      <TextInput
        style={{
          width:
            36 +
            (String(watchBadgesAmount)?.length > 1 &&
              String(watchBadgesAmount)?.length) *
              5,
          height: 34,
          minHeight: 32,
        }}
        name={name}
        id="badges-amount"
        type="number"
        {...register(name, {
          validate: {
            positive: (value: string) => {
              if (parseInt(value) < 1 || !value) {
                return 'Value should be more than 0';
              } else if (value.length > 2) {
                return 'Max badges amount is 99';
              } else {
                return true;
              }
            },
          },
        })}
      />
      <button
        aria-label="Increment amount"
        onClick={handleIncrement}
        className={tw`bg-gray-100 rounded-full p-1`}
      >
        <PlusSmIcon className={tw`h-4 w-4`} aria-hidden="true" />
      </button>
    </div>
  );
};

export default NumericInputCounter;
