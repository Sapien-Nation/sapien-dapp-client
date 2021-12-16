import { useRouter } from 'next/router';
import { useState } from 'react';
import { tw } from 'twind';

// components
import { Head, Query } from 'components/common';
import Editor from 'components/slate';
import ContentItem from 'components/content';

// icons
import { DotsHorizontalIcon } from '@heroicons/react/outline';

// types
import { Content } from 'tools/types/content';
import type { MainSquare } from 'tools/types/square';
import useSWR from 'swr';

interface Props {
  square: MainSquare;
}

const MainSquareView = ({
  square: { avatar, description, cover, followersCount, name, membersCount },
}: Props) => {
  const [posts, setPosts] = useState<Array<Content>>([]);
  const [cursor, setCursor] = useState<string | null>(null);

  const { query } = useRouter();
  const { tribeID, viewID } = query;

  const apiKey = `/api/v3/tribe/${tribeID}/square/${viewID}/feed${
    cursor ? `?nextCursor=${cursor}` : ''
  }`;

  const { error, data, isValidating } = useSWR(apiKey, {
    onSuccess: ({ data: successData }) => {
      if (successData.length > 0) {
        setPosts([...posts, ...successData]);
      }
    },
  });

  const isLoading = (data?.length === 0 && error === undefined) || isValidating;
  return (
    <>
      <Head title={name} />
      <div>
        <div>
          <img
            className={tw`h-32 w-full object-cover lg:h-48`}
            src={
              cover ||
              'https://d151dmflpumpzp.cloudfront.net/tribe-images/default_cover.jpeg'
            }
            alt={`Square ${name} Cover Picture`}
            onError={(event) => {
              (event.target as HTMLImageElement).src =
                'https://d151dmflpumpzp.cloudfront.net/tribe-images/default_temp.jpeg';
            }}
          />
        </div>
        <div className={tw`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
          <div
            className={tw`-mt-12 sm:-mt-6 sm:flex sm:items-end sm:space-x-8`}
          >
            <div className={tw`flex`}>
              <img
                className={tw`h-28 w-28 rounded-3xl ring-4 ring-white`}
                src={
                  avatar ||
                  'https://d151dmflpumpzp.cloudfront.net/tribe-images/default_temp.jpeg'
                }
                onError={(event) => {
                  (event.target as HTMLImageElement).src =
                    'https://d151dmflpumpzp.cloudfront.net/tribe-images/default_temp.jpeg';
                }}
                alt={`Square ${name} Profile Picture`}
              />
            </div>
            <div
              className={tw`mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1`}
            >
              <div className={tw`sm:hidden md:block min-w-0 flex-1`}>
                <h1
                  className={tw`text-2xl font-bold mb-2 text-gray-900 truncate`}
                >
                  {name}
                </h1>
                <h5 className={tw`text-sm text-gray-400 mb-2 truncate`}>
                  {followersCount} Followers • {membersCount} Members
                </h5>
              </div>
              <div
                className={tw`flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4`}
              >
                <button
                  type="button"
                  className={tw`inline-flex justify-center px-4 py-2  shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
                >
                  <span>Join Tribe</span>
                </button>
                <button
                  type="button"
                  className={tw`inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
                >
                  <span>Follow</span>
                </button>
              </div>
            </div>
          </div>
          <div className={tw`hidden sm:block md:hidden mt-6 min-w-0 flex-1`}>
            <h1 className={tw`text-2xl font-bold text-gray-900 truncate`}>
              {name}
            </h1>
          </div>
        </div>
        <div
          className={tw`flex max-w-6xl pb-6 mt-6 mx-auto px-4 sm:px-6 lg:px-8 text-gray-400 justify-between`}
        >
          <div>{description}</div>
          <button
            type="button"
            className={tw`bg-white ml-6 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none`}
          >
            <DotsHorizontalIcon className={tw`h-6 w-6`} aria-hidden="true" />
          </button>
        </div>
        <div className={tw`flex justify-center bg-gray-50`}>
          <Editor />
        </div>
      </div>

      {/* Feed */}
      <div className={tw`bg-gray-50 h-full pt-6 flex flex-col items-center`}>
        <div>
          <span>Current Posts {posts.length}</span>
          {data?.nextCursor && (
            <button
              onClick={() => {
                setCursor(data.nextCursor);
              }}
            >
              Load More
            </button>
          )}
        </div>
        <ContentItem />
      </div>
    </>
  );
};

export default MainSquareView;
