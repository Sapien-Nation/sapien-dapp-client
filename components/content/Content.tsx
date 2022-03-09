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
    className={tw`flex text-sm text-gray-500 border shadow w-full mx-4 md:mx-auto md:max-w-2xl rounded-2xl space-x-4 mb-4`}
  >
    <div className={tw`flex-none py-9 pl-7`}>
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
    <div className={tw`py-5 pr-5 w-full`}>
      <div className={tw`flex justify-between pr-7`}>
        <h3 className={tw`font-medium text-base text-gray-900`}>{userName}</h3>
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
