import { useRouter } from 'next/router';
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

const RightTriangle = () => {
  return (
    <svg
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.6166 10.291C1.98677 10.9214 0.909179 10.4754 0.909179 9.58425L0.90918 2.41268C0.90918 1.52199 1.98587 1.07572 2.61597 1.70525L6.20175 5.28781C6.59245 5.67815 6.59274 6.31132 6.20239 6.70202L2.6166 10.291Z"
        fill="#4F4952"
      />
    </svg>
  );
};

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
  const { query } = useRouter();

  const showBreadcrumbs = query.id;

  return (
    <>
      {showBreadcrumbs && (
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold text-white">{group.name}</span>
          <span className="text-gray-500">/</span>
          <span className="text-sm text-gray-500">PostView</span>
        </div>
      )}
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
            <RightTriangle />
            <p className="font-bold flex items-center gap-1">
              <GlobeIcon className="h-4 text-gray-500" />
              {group.name}
            </p>
            <p className="text-sm text-sapien-40 font-semibold bg-sapien-80/40 rounded-2xl py-1 px-2 flex gap-1">
              <UserGroupIcon className="h-4" />
              {tribe.name}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            {formatDateRelative(createdAt)}
          </p>
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
    </>
  );
};

export default ContentItem;
