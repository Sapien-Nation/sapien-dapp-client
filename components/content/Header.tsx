import { tw } from 'twind';
import {
  ChevronRightIcon,
  GlobeIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';

// types
import type { ContentAuthor, ContentTribe } from 'tools/types/content';

// utils
import { getFormattedDate } from 'utils/date';

interface Props {
  author: ContentAuthor;
  tribe: ContentTribe;
  createdAt: string;
}

const Header = ({ author, tribe, createdAt }: Props) => {
  return (
    <div className={tw`flex items-center justify-between`}>
      <div className={tw`flex items-center gap-2 text-sm`}>
        <span
          className={tw`inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-300`}
        >
          <span className={tw`text-xs font-medium leading-none text-white`}>
            TW
          </span>
        </span>
        <p className={tw`text-black font-bold`}>{author.displayName}</p>
        <p className={tw`text-gray-600 font-bold`}>@{author.userName}</p>
        <ChevronRightIcon className={tw`h-4 w-4`} />
        <GlobeIcon className={tw`h-4 w-4`} />
        <p className={tw`text-gray-900 font-bold`}>{tribe.name}</p>
        <span
          className={tw`bg-indigo-50 font-bold text-indigo-700 rounded-full flex gap-1 items-center px-2 py-1`}
        >
          <UserGroupIcon className={tw`h-4 w-4`} />
          {tribe.name}
        </span>
      </div>
      <div className={tw`text(xs gray-500)`}>{getFormattedDate(createdAt)}</div>
    </div>
  );
};

export default Header;
