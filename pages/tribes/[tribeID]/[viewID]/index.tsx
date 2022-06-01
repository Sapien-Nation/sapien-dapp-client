import _isEmpty from 'lodash/isEmpty';
import { ErrorBoundary } from 'react-error-boundary';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// constants
import { View } from 'constants/tribe';
import { Role } from 'tools/constants/tribe';

// components
import { SEO, ErrorView, NotFound, Query } from 'components/common';
import {
  BadgesView,
  Channel,
  ContentView,
  MainChannel,
  RoomView,
  UpgradeView,
} from 'components/tribe';

// hooks
import { useGetCurrentView, useTribe } from 'hooks/tribe';

// providers
import { GnosisProvider, Web3Provider } from 'wallet/providers';

// types
import type { NextPage } from 'next';

interface Props {
  tribeID: string;
  viewID: string;
}

const TribePage = ({ tribeID, viewID }: Props) => {
  const view = useGetCurrentView(tribeID as string, viewID as string);

  const { role } = useTribe(tribeID as string);

  const renderView = () => {
    switch (view.type) {
      case View.Badges: {
        const isTribeOwnerOrTribeAdmin =
          role === Role.Owner || role === Role.Admin;
        if (isTribeOwnerOrTribeAdmin === false) {
          return (
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden h-full w-full">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg"
                  alt="People working on laptops"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-900 mix-blend-multiply" />
              </div>
              <div className="px-4 py-4 flex flex-col gap-4 absolute justify-center items-center w-full text-center h-full">
                <p>You don&apos;t have access to see this view </p>
              </div>
            </div>
          );
        }

        return (
          <Query
            api={`/core-api/tribe/${tribeID}/badges`}
            loader={null}
            options={{
              fetcher: () => [
                {
                  id: '207361f6-fb07-4724-abab-f8d285e4952e',
                  name: 'Owner',
                  description:
                    'This badge represents that the holder is an owner in the tribename Tribe',
                  avatar:
                    'https://d151dmflpumpzp.cloudfront.net/images/tribes/avatar/909556d6-d8b3-4344-9379-d5e07e46bcb2.webp',
                  color: null,
                  owners: [
                    {
                      id: '8b76eac7-e9e3-43a7-b31d-5487601084e1',
                      username: 'yuyu',
                      avatar:
                        'https://d151dmflpumpzp.cloudfront.net/thumbnails/profiles/avatar/2049279c-6739-4ea3-974d-e6f4d0091910-40x40.jpeg',
                      walletAddress:
                        '0x83C8BE8970c4fF7Db775Ed7DBB4E967019652884',
                    },
                    {
                      id: 'df98f5dc-4fae-4287-81f0-52520c7932c4',
                      username: 'yogi',
                      avatar:
                        'https://d151dmflpumpzp.cloudfront.net/thumbnails/profiles/avatar/17abd424-ac48-4460-9ea5-28665a7ebb15-40x40.jpeg',
                      walletAddress:
                        '0xF874Cf1BcE2D471c640D1b466946184843da1E78',
                    },
                  ],
                },
              ],
            }}
          >
            {() => (
              <GnosisProvider>
                <BadgesView />
              </GnosisProvider>
            )}
          </Query>
        );
      }
      case View.Content:
        return <ContentView />;
      case View.Room: {
        return (
          <Query api={`/core-api/room/${viewID}`} ignoreError loader={null}>
            {({ message, name }) => (
              <RoomView isMember={Boolean(message) === false} name={name} />
            )}
          </Query>
        );
      }
      case View.Channel:
        return <Channel />;
      case View.MainChannel:
        return <MainChannel />;
      case View.Upgrade: {
        const isTribeOwnerOrTribeAdmin =
          role === Role.Owner || role === Role.Admin;
        if (isTribeOwnerOrTribeAdmin === false) {
          return (
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden h-full w-full">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg"
                  alt="People working on laptops"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-900 mix-blend-multiply" />
              </div>
              <div className="px-4 py-4 flex flex-col gap-4 absolute justify-center items-center w-full text-center h-full">
                <p>You don&apos;t have access to see this view </p>
              </div>
            </div>
          );
        }

        return (
          <Query api={`/core-api/tribe/${tribeID}/members`} loader={null}>
            {() => (
              <Web3Provider>
                <UpgradeView />
              </Web3Provider>
            )}
          </Query>
        );
      }
      case View.NotFound:
        return <NotFound message="You dont have access to see this content" />;
      default:
        return <NotFound message="You dont have access to see this content" />;
    }
  };

  return (
    <ErrorBoundary FallbackComponent={() => <ErrorView />}>
      {renderView()}
    </ErrorBoundary>
  );
};

const TribePageProxy: NextPage = () => {
  const { query } = useRouter();
  const { tribeID, viewID } = query;

  return (
    <>
      <SEO title="Sapien" />
      <TribePage tribeID={tribeID as string} viewID={viewID as string} />
    </>
  );
};

export default TribePageProxy;
