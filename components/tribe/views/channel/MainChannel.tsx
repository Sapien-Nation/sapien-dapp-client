import { useRouter } from 'next/router';

// components
import { DefaultCover, Head, Header, InfiniteScroll, Query } from 'components/common';
import { ContentItemMainChannel } from 'components/content';

// hooks
import { useTribe } from 'hooks/tribe';

// types
import type { Content as ContentType } from 'tools/types/content';
import type { MainFeedTribe } from 'tools/types/tribe';

const Empty = () => {
  return (
    <div className="flex justify-center h-full items-center flex-col">
      <img
        src="https://assets.website-files.com/5e51c674258ffe10d286d30a/5e535398d87131adfd0c974a_peep-25.svg"
        alt="Free open source Peep visit https://www.openpeeps.com/"
      />
      <p className="mt-6 text-sm text-white font-semibold">
        Did you know that someone at the Sapien team decided to pick Betty white
        as his historical figure?
      </p>
    </div>
  );
};

const MainChannel = () => {
  const { query } = useRouter();
  const { tribeID } = query;

  const tribe = useTribe(tribeID as string);

  return (
    <>
      <Head title={tribe.name} />
      <h1 className="sr-only">Main Channel for Tribe {tribe.name}</h1>
      <Query api={`/api/v3/tribe/${tribeID}`}>
        {(tribe: MainFeedTribe) => 
          tribe.cover ? (
            <Header alt={tribe.name} src={tribe.cover} />
          ) : (
            <DefaultCover name={tribe.name} />
          )
        }
      </Query>
      <InfiniteScroll
        apiUrl={`/api/v3/tribe/${tribeID}/feed`}
        emptyComponent={<Empty />}
      >
        {(contentList: Array<ContentType>) => (
          <>
            {contentList.map((content) => (
              <ContentItemMainChannel
                key={content.id}
                content={content}
                tribeID={tribeID as string}
              />
            ))}
          </>
        )}
      </InfiniteScroll>
    </>
  );
};

export default MainChannel;
