import Link from 'next/link';

// constants
import { ContentMimeType } from 'tools/constants/content';

// components
import { UserAvatar } from 'components/common';

// helpers
import { formatDateRelative } from 'utils/date';

// types
import type { Content as ContentType } from 'tools/types/content';
import type { User } from 'tools/types/user';

interface Props {
  content: ContentType;
  tribeID: string;
}

const ContentItemMainChannel = ({
  content: {
    id,
    owner: { avatar, userName },
    createdAt,
    body,
    imagePreview,
    mimeType,
  },
  tribeID,
}: Props) => {
  return (
    <Link href={`/tribes/${tribeID}/content?id=${id}`} passHref>
      <a className="hover:bg-gray-800 max-w-2xl mx-auto rounded-md p-2 block text-gray-300 border border-gray-700">
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
            <div className="flex items-center gap-2 px-3">
              <div className="flex gap-1 items-center">
                <UserAvatar
                  user={
                    {
                      username: userName,
                      avatar,
                    } as User
                  }
                />
                <h3 className="text-sm font-medium text-gray-400">
                  {userName}
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
