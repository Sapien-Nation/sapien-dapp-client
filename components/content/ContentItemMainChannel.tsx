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

const ContentItemMainChannel = ({
  content: {
    id,
    owner: { avatar, displayName },
    createdAt,
    body,
    imagePreview,
    mimeType,
  },
  tribeID,
}: Props) => {
  return (
    <Link href={`/tribes/${tribeID}/content?id=${id}`} passHref>
      <a className="hover:bg-gray-800 rounded-md p-2 block text-gray-300">
        <div className="flex space-x-3">
          {imagePreview && (
            <img
              className="w-32 h-24 object-cover rounded-md"
              src={imagePreview}
              alt="Sapien Post Image"
            />
          )}
          <div className="flex-1 space-y-2">
            {mimeType === ContentMimeType.Html ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: body,
                }}
              ></div>
            ) : (
              body
            )}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {avatar ? (
                  <img
                    className="w-5 h-5 object-cover rounded-full"
                    src={avatar}
                    alt="Sapien Post Image"
                  />
                ) : (
                  <div className="w-5 h-5 bg-sapien-neutral-200 rounded-full flex items-center justify-center font-extrabold text-sm">
                    {displayName[0].toUpperCase()}
                  </div>
                )}
                <h3 className="text-sm font-medium text-gray-400">
                  {displayName}
                </h3>
              </div>
              <p className="text-xs text-gray-500">
                {formatDateRelative(createdAt)}
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ContentItemMainChannel;
