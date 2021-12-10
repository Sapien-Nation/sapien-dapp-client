import { useState } from 'react';
import { tw } from 'twind';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

interface Props {
  autoComplete: string;
  id: string;
  placeholder: string;
  register: any;
  required: boolean;
}

const PasswordInput = ({
  autoComplete,
  id,
  placeholder,
  register,
  required,
}: Props) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className={tw`relative`}>
      <input
        placeholder={placeholder}
        id={id}
        required={required}
        autoComplete={autoComplete}
        {...register(id)}
        type={show ? 'text' : 'password'}
        className={tw`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
      />
      <div
        className={tw`absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5`}
      >
        <EyeIcon
          onClick={() => setShow(!show)}
          className={tw`h-6 w-6 text-gray-700 ${show ? 'hidden' : 'block'}`}
        />
        <EyeOffIcon
          onClick={() => setShow(!show)}
          className={tw`h-6 w-6 text-gray-700 ${show ? 'block' : 'hidden'}`}
        />
      </div>
    </div>
  );
};

export default PasswordInput;
