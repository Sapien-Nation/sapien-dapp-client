// constants
import { ElementType } from '../constants';

// types
import type { CustomElement } from '../types';

interface Props {
  attributes: any;
  children: React.ReactElement;
  element: CustomElement;
}

const Image = ({ attributes, children, element }: Props) => {
  const { caption, isFetching, url, imageFallback } = element;

  if (isFetching) {
    return <span>Uploading Image...</span>;
  }

  return (
    <>
      <img
        {...attributes}
        src={url}
        onError={(event) => {
          (event.target as HTMLImageElement).src = imageFallback;
        }}
        alt={caption}
      />
      {children}
    </>
  );
};

export default Image;
