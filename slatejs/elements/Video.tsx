import { XIcon } from '@heroicons/react/outline';

// types
import type { CustomElement } from '../types';

interface Props {
  attributes: any;
  children: React.ReactElement;
  element: CustomElement;
}

const Video = ({ attributes, children, element }: Props) => {
  const { image, url, onRemove } = element;

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <div className="relative flex w-full my-1 p-5 rounded-md bg-white">
          <button className="absolute top-1 right-1">
            <XIcon />
          </button>
          <img
            alt={image?.url || ''}
            height="auto"
            src={image?.url}
            className="relative h-auto w-130 rounded-md"
          />
          <div className="w-full p-2">
            <a
              href={url}
              rel="noreferrer"
              className="m-0 text-indigo-500"
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

export default Video;
