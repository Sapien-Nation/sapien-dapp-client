import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu } from '@headlessui/react';

// constants
import { ContentMimeType } from 'tools/constants/content';

// dialogs
import { CreateThreadDialog } from 'components/tribe/views/channel/dialogs';

// helpers
import { formatDateRelative } from 'utils/date';

// hooks
import { useTribe } from 'hooks/tribe';

// icons
import { RightTriangleIcon } from 'assets';

// types
import type { Content as ContentType } from 'tools/types/content';

interface Props {
  content: ContentType;
  tribeID: string;
}

enum Dialog {
  CreateThread,
}

const ContentItem = ({
  content: {
    id,
    owner: { avatar, displayName, username },
    group,
    createdAt,
    body,
    preview,
    mimeType,
    title,
    threads,
    media,
    link,
  },
  tribeID,
}: Props) => {
  const [dialog, setDialog] = useState<Dialog | null>(null);

  const tribe = useTribe(tribeID);
  const { query } = useRouter();

  const renderBody = () => {
    if (mimeType === ContentMimeType.Html) {
      return (
        <div
          className="disable-preflight"
          dangerouslySetInnerHTML={{
            __html: body,
          }}
        />
      );
    } else if (mimeType === ContentMimeType.Link) {
      return (
        <div className="flex flex-col gap-2">
          <div>{body}</div>
          <div className="text-[#3b82f6] underline">{link}</div>
        </div>
      );
    } else if (mimeType.includes(ContentMimeType.Image)) {
      return (
        <img className="object-cover" src={media} alt="Sapien Post Image" />
      );
    } else if (mimeType.includes(ContentMimeType.Video)) {
      return (
        <video controls>
          <source src={media} type={mimeType} />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      {Boolean(query.id) && (
        <div className="flex items-center gap-1">
          <Link href={`/tribes/${tribeID}/home`}>
            <a className="text-sm font-semibold text-white">{tribe.name}</a>
          </Link>
          <span className="text-gray-500">/</span>
          <Link href={`/tribes/${tribeID}/${group.id}`}>
            <a className="text-sm font-semibold text-white">{group.name}</a>
          </Link>
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
            <RightTriangleIcon />
            <div className="text-sm text-sapien-40 font-semibold bg-sapien-80/40 rounded-2xl py-1 px-2 flex items-center gap-1">
              <img
                src="/images/sapien_nation.png"
                alt="Tribe"
                className="w-6 pt-0.5"
              />
              {tribe.name}
            </div>
            <span>/</span>
            <div className="font-bold flex items-center gap-1">
              # {group.name}
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {formatDateRelative(createdAt)}
          </p>
        </div>
        <div className="flex-1 p-3">
          {title && <h1 className="text-4xl font-semibold">{title}</h1>}
          {renderBody()}
        </div>
        <div
          className="flex justify-between p-3"
          onClick={(e) => e.preventDefault()}
        >
          <div
            className={`${
              threads?.length > 0 ? 'visible' : 'invisible'
            } relative`}
          >
            <Menu>
              <>
                <Menu.Button>
                  <span className="text-gray-300 hover:text-gray-400 font-bold">
                    {`${threads?.length} ${
                      threads?.length === 1 ? 'room' : 'rooms'
                    } discussing`}
                  </span>
                </Menu.Button>
                <Menu.Items className="block w-full absolute top-full origin-top-right bg-sapien-40 rounded-md shadow-lg focus:outline-none max-h-[140px] overflow-y-auto">
                  <ul className="">
                    {['#robs room', '#news', '#general'].map((room) => (
                      <li
                        key={room}
                        className="font-bold hover:bg-sapien-60 px-2 py-0.5 first:rounded-t-md last:rounded-b-md truncate"
                      >
                        <Link href="">
                          <a>
                            <span className="truncate">{room}</span>
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Menu.Items>
              </>
            </Menu>
          </div>
          <button
            className="text-right text-sapien-40 hover:text-sapien-80"
            onClick={() => setDialog(Dialog.CreateThread)}
          >
            create thread
          </button>
        </div>
      </div>
      {/* create thread dialog */}
      {dialog === Dialog.CreateThread && (
        <CreateThreadDialog
          contentId={id}
          tribeId={tribeID}
          onClose={() => setDialog(null)}
        />
      )}
    </>
  );
};

export default ContentItem;
