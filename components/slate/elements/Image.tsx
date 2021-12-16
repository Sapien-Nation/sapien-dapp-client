import { XIcon } from '@heroicons/react/outline';
import { tw } from 'twind';

// types
import type { CustomElement } from '../types';

interface Props {
  attributes: any;
  children: React.ReactElement;
  element: CustomElement;
}

const Image = ({ attributes, children, element }: Props) => {
  const { caption, isFetching, url, onRemove, imageFallback } = element;

  if (isFetching) {
    return (
      <img
        className={tw`mx-auto filter blur-sm`}
        src="/images/logo.png"
        width="90"
        alt="loading-image"
      />
    );
  }

  return (
    <span className={tw`relative`}>
      <button
        type="button"
        className={tw`absolute z-10 -top-2 -left-1 inline-flex items-center p-1 bg-gray-900 rounded-full shadow-sm text-white focus:outline-none`}
        onClick={() => onRemove()}
      >
        <XIcon className={tw`h-3 w-3 text-white`} aria-hidden="true" />
      </button>
      <img
        {...attributes}
        src={url}
        onError={(event) => {
          (event.target as HTMLImageElement).src = imageFallback;
        }}
        alt={caption}
      />
      {children}
    </span>
  );
};

export default Image;
