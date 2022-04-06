import { uniqBy } from 'lodash';
import { useMemo } from 'react';

interface Props {
  messages: Record<string, any>;
}

const Details = ({ messages }: Props) => {
  const members = useMemo(() => {
    const allMessages = Object.keys(messages)
      .reduce((timestamp, currentMessages) => {
        return [...timestamp, ...messages[currentMessages]];
      }, [])
      .map(({ authorID, displayName, avatarUrl }) => ({
        authorID,
        displayName,
        avatarUrl,
      }))
      .filter(
        (value, index, current) =>
          current.findIndex(
            (valueTwo) => valueTwo.authorID === value.authorID
          ) === index
      );
    return allMessages;
  }, [messages]);

  return (
    <aside className="w-72 h-full overflow-auto border-l-[1px] border-gray-700">
      <div className="">
        <div className='border-b-[1px] border-gray-700 h-10 px-5 mb-5 w-full flex items-center'>
          <h3 className="text-md  text-sapien-neutral-400 font-bold ">
            Members ({members.length})
          </h3>
        </div>
        <ul className='px-5'>
          {members.map(({ authorID, displayName, avatarUrl }) => {
            return (
              <li key={authorID} className="flex gap-2 items-center mb-4">
                <img
                  className="w-10 h-10 rounded-full flex-shrink-0"
                  src={avatarUrl}
                  alt=""
                />
                <span>{displayName}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Details;
