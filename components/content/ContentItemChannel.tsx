import Link from 'next/link';

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
  tribeID: string;
}

const ContentItem = ({
  content: {
    id,
    owner: { avatar, userName },
    createdAt,
    body,
  },
  tribeID,
}: Props) => {
  return (
    <Link href={`/tribes/${tribeID}/content?id=${id}`} passHref>
      <a className="py-2 hover:bg-gray-800 rounded-md px-6">
        <div className="flex space-x-3">
          <img className="h-10 w-10 rounded-full" src={avatar} alt="" />
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">{userName}</h3>
              <p className="text-xs text-gray-500">
                {formatDateRelative(createdAt)}
              </p>
            </div>
            <SlatePreview preview={JSON.parse(body)} />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ContentItem;
