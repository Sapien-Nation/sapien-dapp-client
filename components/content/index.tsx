import { tw } from 'twind';
import {
  AnnotationIcon,
  SpeakerphoneIcon,
  ShareIcon,
} from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';

// components
import Header from './Header';

const ContentItem = () => {
  return (
    <div className={tw`w-full max-w-4xl rounded-2xl bg-white px-6 py-4`}>
      <Header />
      <div className={tw`py-6`}>Hey, how´s it going 😇</div>
      <div className={tw`flex justify-between`}>
        <div className={tw`flex items-center justify-center`}>
          <button
            className={tw`flex items-center gap-2 text-xs font-bold justify-center px-2 py-1 rounded-lg text-gray-400 hover:bg-gray-100`}
          >
            <AnnotationIcon className={tw`h-5 w-5`} />0
          </button>
          <button
            className={tw`flex items-center gap-2 text-xs font-bold justify-center px-2 py-1 rounded-lg text-gray-400 hover:bg-gray-100`}
          >
            <SpeakerphoneIcon className={tw`h-5 w-5`} />0
          </button>
          <button
            className={tw`flex items-center gap-2 text-xs font-bold justify-center px-2 py-1 rounded-lg text-gray-400 hover:bg-gray-100`}
          >
            <ShareIcon className={tw`h-5 w-5`} />0
          </button>
        </div>
        <div>
          <button
            className={tw`bg-indigo-600 text-white rounded-full p-1.5 hover:bg-indigo-700`}
          >
            <StarIcon
              className={tw`h-5 w-5 p-0.5 rounded-full border border-white`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentItem;
