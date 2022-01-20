import { XIcon } from '@heroicons/react/outline';
import { tw } from 'twind';

// types
import type { CustomElement } from '../types';

interface Props {
  attributes: any;
  children: React.ReactElement;
  element: CustomElement;
}

const Embed = ({ attributes, children, element }: Props) => {
  const { url } = element;

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <div className={tw`relative flex w-full my-1 p-5 rounded-md bg-white`}>
          <button className={tw`absolute top-1 right-1`}>
            <XIcon />
          </button>
          <div className={tw`w-full p-2`}>
            <a
              href={url}
              rel="noreferrer"
              className={tw`m-0 text-indigo-500`}
              target="_blank"
            >
              {children}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Embed;
