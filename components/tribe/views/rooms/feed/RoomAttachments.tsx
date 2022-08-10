import { DocumentTextIcon } from '@heroicons/react/solid';
import ReactPlayer from 'react-player';
import { twMerge } from 'tailwind-merge';

// types
import type { RoomMessageAttachment } from 'tools/types/room';

interface Props {
  attachments: Array<RoomMessageAttachment>;
  isAMessageContinuation: boolean;
}

const RoomAttachments = ({ attachments, isAMessageContinuation }: Props) => {
  return (
    <div
      className={twMerge(
        'grid gap-3 max-w-sm',
        isAMessageContinuation ? '' : 'pl-52'
      )}
    >
      {attachments.map(({ fileName, mimeType, url, id }) => {
        if (mimeType.startsWith('image')) {
          /* eslint-disable-next-line @next/next/no-img-element */
          return (
            <a href={url} target="_blank" rel="noreferrer">
              <img key={id} alt={fileName} className="" src={url} />
            </a>
          );
        } else if (mimeType.startsWith('video')) {
          return (
            <ReactPlayer
              width="400"
              height="240"
              controls
              playsInline
              style={{
                maxWidth: '400px',
                maxHeight: '225px',
                width: '100%',
                height: '100%',
              }}
              url={url}
            />
          );
        } else {
          return (
            <div className="max-w-lg bg-sapien-neutral-400 rounded flex gap-3 px-2 py-2 items-center">
              <DocumentTextIcon className="w-10 h-10 text-sapien-80" />
              <a
                download
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-300 truncate flex-1"
              >
                {fileName}
              </a>
            </div>
          );
        }
      })}
    </div>
  );
};

export default RoomAttachments;
