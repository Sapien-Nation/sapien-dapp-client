import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

// components
import { Query } from 'components/common';
import { ContentItemMainChannel } from 'components/content';
import MainChannelHeader from './MainChannelHeader';
import ChannelHeaderPlaceholder from './ChannelHeaderPlaceholder';

// hooks
import { useTribe, useWelcomeMessage } from 'hooks/tribe';

// types
import type { MainFeedTribe } from 'tools/types/tribe';

const MainChannel = () => {
  const { query } = useRouter();
  const { tribeID } = query;

  const tribe = useTribe(tribeID as string);
  const welcomeMessage = useWelcomeMessage(tribe);
  const belowEditorRef = useRef(null);

  useEffect(() => {
    if (belowEditorRef.current) {
      belowEditorRef.current.scrollIntoView();
    }
  }, []);

  return (
    <div className="bg-sapien-neutral-800 lg:rounded-3xl p-5 overflow-auto">
      <h1 className="sr-only">Main Channel for Tribe {tribe.name}</h1>

      <Query
        api={`/core-api/tribe/${tribeID}`}
        loader={<ChannelHeaderPlaceholder />}
      >
        {(tribeInfo: MainFeedTribe) => (
          <>
            <MainChannelHeader tribe={tribeInfo} />
            <div className="mt-4 min-h-400">
              <ul>
                {['Sapien', 'sapien', 'Sapien Nation'].includes(
                  tribeInfo.name
                ) ? (
                  <li>
                    <ContentItemMainChannel
                      content={welcomeMessage}
                      tribeID={tribeID as string}
                    />
                  </li>
                ) : null}
              </ul>
            </div>
          </>
        )}
      </Query>
    </div>
  );
};

export default MainChannel;
