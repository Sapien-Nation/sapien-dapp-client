// constants
import { ContentMimeType } from 'tools/constants/content';

// helpers
import { formatDateRelative } from 'utils/date';

// components
import { UserAvatar } from 'components/common';

// types
import type { Content as ContentType } from 'tools/types/content';
import type { User } from 'tools/types/user';

interface Props {
  content: ContentType;
}

const ContentItem = ({
  content: {
    owner: { avatar, displayName, userName },
    createdAt,
    body,
    mimeType,
  },
}: Props) => {
  return (
    <div className="max-w-2xl mx-auto w-full text-gray-300">
      <div className="mt-4">
        {mimeType === ContentMimeType.Html ? (
          <div
            dangerouslySetInnerHTML={{
              __html: body,
            }}
          ></div>
        ) : (
          body
        )}
        <div className="flex items-center mt-2 gap-2 px-3">
          <div className="flex gap-1 items-center">
            <UserAvatar
              user={
                {
                  username: userName,
                  avatar,
                  displayName,
                } as User
              }
            />
            <h3 className="text-sm font-medium text-gray-400">{displayName}</h3>
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
