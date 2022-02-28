import { tw } from 'twind';
import * as timeago from 'timeago.js';

// components
import { SlatePreview } from 'components/common';

// types
import type { Content as ContentType } from 'tools/types/content';

interface Props {
  content: ContentType;
}

const Content = ({
  content: {
    author: { avatar, userName },
    createdAt,
    body,
  },
}: Props) => (
  <div
    className={tw`flex text-sm text-gray-500 border w-full mx-4 md:mx-auto md:max-w-2xl rounded-xl space-x-4 mb-4`}
  >
    <div className={tw`flex-none py-5 pl-5`}>
      <img
        src={avatar}
        alt={userName}
        onError={(event) => {
          (event.target as HTMLImageElement).src =
            'https://dutuyaq1w3dqh.cloudfront.net/thumbnails/tribes/avatar/sapien_logo-40x40.png';
        }}
        className={tw`w-10 h-10 bg-gray-100 rounded-full`}
      />
    </div>
    <div className={tw`py-5 w-full`}>
      <div className={tw`flex justify-between pr-5`}>
        <h3 className={tw`font-medium text-gray-900`}>{userName}</h3>
        <p>
          <time dateTime={createdAt}>{timeago.format(createdAt)}</time>
        </p>
      </div>

      {/* // @ts-ignore */}
      <SlatePreview preview={JSON.parse(body)} />
    </div>
  </div>
);

export default Content;
