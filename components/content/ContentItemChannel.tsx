import { GlobeIcon, UserGroupIcon } from '@heroicons/react/solid';
// TODO: commented until we have data to show
// import {
//   ChatIcon,
//   ShareIcon,
//   SpeakerphoneIcon,
// } from '@heroicons/react/outline';

// constants
import { ContentMimeType } from 'tools/constants/content';

// helpers
import { formatDateRelative } from 'utils/date';

// hooks
import { useTribe } from 'hooks/tribe';

// types
import type { Content as ContentType } from 'tools/types/content';

interface Props {
  content: ContentType;
  tribeID: string;
}

const ContentItem = ({
  content: {
    owner: { avatar, displayName, username },
    group,
    createdAt,
    body,
    imagePreview,
    mimeType,
  },
  tribeID,
}: Props) => {
  const tribe = useTribe(tribeID);

  return (
    <div className="flex flex-col bg-sapien-neutral-600 rounded-xl p-3 gap-1">
      <div className="flex items-center justify-between p-3 flex-wrap">
        <div className="flex items-center gap-3">
          {avatar ? (
            <img
              className="w-10 h-10 object-cover rounded-full"
              src={avatar}
              alt="Sapien Post Image"
            />
          ) : (
            <div className="w-5 h-5 bg-sapien-neutral-200 rounded-full flex items-center justify-center font-bold text-sm">
              {username[0].toUpperCase()}
            </div>
          )}
          <h3 className="text-sm font-semibold text-white">{displayName}</h3>
          <h3 className="text-sm text-gray-500">@{username}</h3>
          <p className="font-bold flex items-center gap-1">
            <GlobeIcon className="h-4 text-gray-500" />
            {group.name}
          </p>
          <p className="text-sm text-sapien-40 font-semibold bg-sapien-80/40 rounded-2xl py-1 px-2 flex gap-1">
            <UserGroupIcon className="h-4" />
            {tribe.name}
          </p>
        </div>
        <p className="text-sm text-gray-500">{formatDateRelative(createdAt)}</p>
      </div>
      <div className="flex-1 p-3">
        {mimeType === ContentMimeType.Html ? (
          <div
            dangerouslySetInnerHTML={{
              __html: body,
            }}
          ></div>
        ) : (
          body
        )}
      </div>
      {imagePreview && (
        <img
          className="object-cover rounded-md"
          src={imagePreview}
          alt="Sapien Post Image"
        />
      )}
      {/* TODO: commented until we have data to show */}
      {/* <div className="flex items-center gap-5 text-gray-500 p-3">
        <span className="flex items-center gap-2">
          <ChatIcon className="h-4" />
        </span>
        <span className="flex items-center gap-2">
          <SpeakerphoneIcon className="h-4" />
        </span>
        <span className="flex items-center gap-2">
          <ShareIcon className="h-4" />
        </span>
      </div> */}
    </div>
  );
};

export default ContentItem;
