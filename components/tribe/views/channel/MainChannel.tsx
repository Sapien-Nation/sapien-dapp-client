import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// components
import { SEO, Query } from 'components/common';
import { ContentItemMainChannel } from 'components/content';
import MainChannelHeader from './MainChannelHeader';
import ChannelHeaderPlaceholder from './ChannelHeaderPlaceholder';

// @ts-ignore
const ProfileDialog = dynamic<any>(() =>
  import('components/profile').then((mod) => mod.ProfileDialog)
);

// hooks
import { useTribe, useWelcomeMessage } from 'hooks/tribe';

// types
import type { MainFeedTribe } from 'tools/types/tribe';

enum Dialog {
  Profile,
}

const MainChannel = () => {
  const [dialog, setDialog] = useState<Dialog | null>(null);

  const { asPath, push, query } = useRouter();
  const { tribeID } = query;

  const tribe = useTribe(tribeID as string);
  const welcomeMessage = useWelcomeMessage(tribe);
  const belowEditorRef = useRef(null);

  const checkIfCommingFromMintedPage = () => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.location.hash === '#minted';
  };

  useEffect(() => {
    if (belowEditorRef.current) {
      belowEditorRef.current.scrollIntoView();
    }

    if (checkIfCommingFromMintedPage()) {
      setDialog(Dialog.Profile);
    }
  }, []);

  return (
    <>
      <div className="bg-sapien-neutral-800 lg:rounded-3xl p-5">
        <SEO title={tribe.name} />
        <h1 className="sr-only">Main Channel for Tribe {tribe.name}</h1>
        <Query
          api={`/api/v3/tribe/${tribeID}`}
          loader={<ChannelHeaderPlaceholder />}
        >
          {(tribe: MainFeedTribe) => <MainChannelHeader tribe={tribe} />}
        </Query>
        <div className="mt-4 min-h-400">
          <ul>
            {tribe.identifier === 'sapien' ? (
              <li>
                <ContentItemMainChannel
                  content={welcomeMessage}
                  tribeID={tribeID as string}
                />
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      {/* Dialogs */}
      {dialog === Dialog.Profile && (
        <ProfileDialog
          onClose={() => {
            setDialog(null);

            if (checkIfCommingFromMintedPage()) {
              push(asPath.replace('#minted', ''));
            }
          }}
        />
      )}
    </>
  );
};

export default MainChannel;
