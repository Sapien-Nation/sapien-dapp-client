// constants
import { ElementType } from '../constants';
import { tw } from 'twind';

interface Props {
  attributes: any;
  children: React.ReactElement;
  element: ElementType;
}

const Link = ({ attributes, children, element }: Props) => {
  if (element?.url.includes('sapien')) {
    return (
      <div className={tw`flex items-center`}>
        <img
          className="inline-block h-5 w-5 rounded-full mr-4"
          src={
            'https://d151dmflpumpzp.cloudfront.net/tribe-images/sapien-tribe.png'
          }
          alt="Sapien logo"
          onError={(event) => {
            (event.target as HTMLImageElement).src =
              'https://d151dmflpumpzp.cloudfront.net/tribe-images/sapien-tribe.png';
          }}
        />
        <a target="_blank" className={tw`text-indigo-500`} {...attributes}>
          {children}
        </a>
      </div>
    );
  }
  return (
    <a target="_blank" {...attributes}>
      {children}
    </a>
  );
};

export default Link;
