import { InputHTMLAttributes, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { XIcon, PlusIcon } from '@heroicons/react/outline';

// components
import { TextInput } from 'components/common';


interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  maxLength?: number;
}

const OptionsInput = ({
  name,
  maxLength = 100,
  disabled,
  ...rest 
}: Props) => {
  const [options, setOptions] = useState(["Option one", "Option two"]);

  return (
    <div className="flex-1">
      <div className="mr-14">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex flex-row py-2"
          >
            <TextInput
              name={`option ${index+1}`}
              aria-label={`Option ${index+1}`}
              placeholder={`Option ${index+1}`}
              rules={{
                validate: {
                  required: (value) =>
                    value.length > 0 || 'is required',
                },
              }}
            />
            {index > 0 && index < options.length - 1 &&
              <button
                type="button"
                className={`${
                  open ? 'bg-sapien-neutral-900' : ''
                } ml-4 h-10 w-10 flex items-center justify-center rounded-full focus:outline-none bg-sapien-neutral-200/25 hover:bg-sapien-neutral-900`}
                onClick={() => {
                  options.splice(index,1);
                  setOptions([...options]);
                }}
              >
                <>
                  <span className="sr-only">Remove Option</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </>
              </button>
            }
            {index == options.length - 1 &&
              <button
              type="button"
              className={`${
                open ? 'bg-sapien-neutral-900' : ''
              } ml-4 h-10 w-10 flex items-center justify-center rounded-full focus:outline-none bg-sapien-neutral-200/25 hover:bg-sapien-neutral-900`}
              onClick={() => setOptions([...options,"New Option"])}
              >
                <>
                  <span className="sr-only">Add Option</span>
                  <PlusIcon className="h-6 w-6" aria-hidden="true" />
                </>
              </button>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionsInput;
