import { tw } from 'twind';

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
  <div className={tw`flex text-sm text-gray-500 space-x-4`}>
    <div className={tw`flex-none py-10`}>
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
    <div className={tw`py-10`}>
      <h3 className={tw`font-medium text-gray-900`}>{userName}</h3>
      <p>
        <time dateTime={createdAt}>{createdAt}</time>
      </p>
      <div
        className={tw`mt-4 prose prose-sm max-w-none text-gray-500`}
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </div>
  </div>
);

export default Content;
