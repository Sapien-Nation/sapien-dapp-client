// utilss
import { formatDateRelative } from 'utils/date';

// types
import type { Content } from 'tools/types/content';

interface Props {
  content: Content;
}

const ContentComponent = ({
  content: {
    owner: { avatar, username },
    createdAt,
    body,
  },
}: Props) => (
  <div className="flex text-sm text-gray-500 border shadow w-full mx-4 md:mx-auto md:max-w-2xl rounded-2xl space-x-4 mb-4">
    <div className="flex-none py-9 pl-7">
      <img
        src={avatar}
        alt={username}
        className="w-10 h-10 bg-gray-100 rounded-full"
      />
    </div>
    <div className="py-5 pr-5 w-full">
      <div className="flex justify-between pr-7">
        <h3 className="font-medium text-base text-gray-900">{username}</h3>
        <p>
          <time dateTime={createdAt}>{formatDateRelative(createdAt)}</time>
        </p>
      </div>

      {body}
    </div>
  </div>
);

export default ContentComponent;
