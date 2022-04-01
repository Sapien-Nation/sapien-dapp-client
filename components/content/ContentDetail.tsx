// components
import { SlatePreview } from 'slatejs';

// helpers
import { formatDateRelative } from 'utils/date';

// utils
import { mergeClassNames } from 'utils/styles';

// types
import type { Content as ContentType } from 'tools/types/content';

interface Props {
  content: ContentType;
}

const ContentItem = ({
  content: {
    owner: { avatar, username },
    createdAt,
    body,
    imagePreview,
  },
}: Props) => {
  return (
    <div className="max-w-2xl mx-auto w-full text-gray-300">
      <img
        className="object-cover rounded-md h-40 w-full"
        src={
          imagePreview ||
          'https://d1bdmh0gdusw0k.cloudfront.net/images/misc/asset2.jpeg'
        }
        alt="Sapien Post Image"
      />
      <div className="mt-4">
        <SlatePreview preview={JSON.parse(body)} />
        <div className="flex items-center mt-2 gap-2">
          <div className="flex gap-1">
            <img
              className="w-5 h-5 object-cover rounded-full"
              src={
                avatar ||
                'https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=240'
              }
              alt="Sapien Post Image"
            />
            <h3 className="text-sm font-medium text-gray-400">{username}</h3>
          </div>
          <p className="text-xs text-gray-500">
            {formatDateRelative(createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentItem;
