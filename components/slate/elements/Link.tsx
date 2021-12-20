import { tw } from 'twind';

// types
import type { CustomElement } from '../types';

interface Props {
  attributes: any;
  children: React.ReactElement;
  element: CustomElement;
}

const Link = ({ attributes, children, element }: Props) => {
  if (element?.url.includes('sapien.network/')) {
    return (
      <a {...attributes} href={element.url} className={tw`text-indigo-500`}>
        {children}
      </a>
    );
  }

  return (
    <a {...attributes} href={element.url} className={tw`text-indigo-500`}>
      {children}
    </a>
  );
};

export default Link;
