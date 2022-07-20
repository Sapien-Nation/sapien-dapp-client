// constants
import { ContentMimeType } from 'tools/constants/content';

// helpers
import { formatDateRelative } from 'utils/date';

// components
import { UserAvatar } from 'components/common';
import { ChannelLeftBar } from 'components/tribe';

// types
import type { User } from 'tools/types/user';
import type { Content as ContentType } from 'tools/types/content';

interface Props {
  content: ContentType;
}

const ContentItem = ({
  content: {
    owner: { avatar, username },
    createdAt,
    body,
    mimeType,
    group,
  },
}: Props) => {
  return (
    <div className="h-full flex flex-row bg-sapien-neutral-800">
      <div className="flex-1 lg:rounded-3xl p-5 overflow-y-auto">
        <div className="grid gap-4">
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
                        username,
                        avatar,
                      } as User
                    }
                  />
                  <h3 className="text-sm font-medium text-gray-400">
                    {username}
                  </h3>
                </div>
                <p className="text-xs text-gray-500">
                  {formatDateRelative(createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChannelLeftBar channelID={group.id} />
    </div>
  );
};

export default ContentItem;
