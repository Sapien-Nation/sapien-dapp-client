import Link from 'next/link';

// constants
import { ContentMimeType } from 'tools/constants/content';

// helpers
import { formatDateRelative } from 'utils/date';

// types
import type { Content as ContentType } from 'tools/types/content';

interface Props {
  content: ContentType;
  tribeID: string;
}

const ContentItem = ({ content, tribeID }: Props) => {
  return (
    <Link href={`/tribes/${tribeID}/content?id=${content.id}`} passHref>
      <a
        className={
          false
            ? 'bg-gray-800 rounded-md p-2 block text-gray-600'
            : 'hover:bg-gray-800 rounded-md p-2 block text-gray-300'
        }
      >
        <div className="flex space-x-3">
          <img
            className="w-32 h-24 object-cover rounded-md"
            src={
              'https://d1bdmh0gdusw0k.cloudfront.net/images/misc/asset2.jpeg'
            }
            alt="Sapien Post Image"
          />
          <div className="flex-1 space-y-2">
            {content.mimeType === ContentMimeType.Html ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: content.body,
                }}
              ></div>
            ) : (
              content.body
            )}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <img
                  className="w-5 h-5 object-cover rounded-full"
                  src={
                    'https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=240'
                  }
                  alt="Sapien Post Image"
                />
                <h3 className="text-sm font-medium text-gray-400">
                  {content.owner.displayName}
                </h3>
              </div>
              <p className="text-xs text-gray-500">
                {formatDateRelative(content.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ContentItem;
