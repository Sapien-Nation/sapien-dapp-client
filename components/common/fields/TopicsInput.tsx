import { nanoid } from 'nanoid';
import { Controller, useFormContext } from 'react-hook-form';
import { InputHTMLAttributes, useRef, Fragment } from 'react';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'pattern'>;
interface Props extends InputProps {
  insert?: any;
  name: string;
  pattern?: RegExp;
  maxLength?: number;
  replaceWhiteSpace?: boolean;
  remove?: any;
  options?: any;
  rules?: any;
}

const TopicsInput = ({
  insert,
  name,
  pattern,
  maxLength = 100,
  replaceWhiteSpace = false,
  remove,
  rules = {},
  options,
  inputMode,
  ...rest
}: Props) => {
  const { control } = useFormContext();
  const ref = useRef(null);

  return (
    <>
      <input
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            insert(nanoid(), { value: ref.current.value });
            event.currentTarget.value = '';
          }

          return false;
        }}
        onKeyPress={(event) => {
          if (pattern) {
            if (!pattern.test(event.key)) {
              event.preventDefault();
              event.stopPropagation();
              return false;
            }
          }

          return true;
        }}
        {...rest}
        ref={ref}
      />
      <div className="mt-6">
        {options.map((option, index) => {
          return (
            <Fragment key={option.id}>
              <Controller
                render={() => (
                  <span className="inline-flex rounded-full items-center py-1 px-2.5 text-sm font-medium bg-primary text-white">
                    {option.value}
                    <button
                      type="button"
                      className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-white  focus:outline-none focus:bg-indigo-500 focus:text-white"
                      onClick={() => remove({ index })}
                    >
                      <span className="sr-only">Remove large option</span>
                      <svg
                        className="h-2 w-2"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 8 8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          d="M1 1l6 6m0-6L1 7"
                        />
                      </svg>
                    </button>
                  </span>
                )}
                name={`topics[${index}].lastName`}
                control={control}
                defaultValue={option.value}
              />
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default TopicsInput;
