import { tw } from 'twind';
import {
  ChevronLeftIcon,
  GlobeIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';

const Header = () => {
  return (
    <div className={tw`flex items-center justify-between`}>
      <div className={tw`flex items-center gap-2 text-sm`}>
        <span
          className={tw`inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500`}
        >
          <span className={tw`text-xs font-medium leading-none text-white`}>
            TW
          </span>
        </span>
        <p className={tw`text-black font-bold`}>Sapien Name</p>
        <p className={tw`text-gray-600 font-bold`}>@username</p>
        <ChevronLeftIcon className={tw`h-6 w-6`} />
        <GlobeIcon className={tw`h-6 w-6`} />
        <p className={tw`text-gray-900 font-bold`}>My Square</p>
        <span
          className={tw`bg-indigo-50 text-indigo-700 rounded-full flex items-center px-4 py-2`}
        >
          <UserGroupIcon className={tw`h-6 w-6 mr-2`} />
          Sapien
        </span>
      </div>
      <div>29 days</div>
    </div>
  );
};

export default Header;
