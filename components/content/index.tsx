import { tw } from 'twind';
import {
  AnnotationIcon,
  SpeakerphoneIcon,
  ShareIcon,
} from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';

//types
import type { Content } from 'tools/types/content';

// components
import Header from './Header';

interface Props {
  content: Content;
}

const ContentItem = ({ content }: Props) => {
  return (
    <div className={tw`w-full max-w-4xl rounded-2xl bg-white px-6 py-4 mb-8`}>
      <Header
        author={content.author}
        tribe={content.tribe}
        createdAt={content.createdAt}
      />
      <div
        className={tw`pb-6`}
        dangerouslySetInnerHTML={{ __html: content.body }}
      />
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
