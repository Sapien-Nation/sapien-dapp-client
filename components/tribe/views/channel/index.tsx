// components
import {
  DefaultCover,
  InfiniteScroll,
  Head,
  Header,
  Page,
} from 'components/common';

// types
import type { Channel } from 'tools/types/channel';
import type { Content } from 'tools/types/content';

interface Props {
  channel: Channel;
  channelID: string;
}

const ChannelView = ({ channelID, channel }: Props) => {
  return (
    <>
      <Head title={channel.name} />
      <Page
        header={
          channel.cover ? (
            <Header alt={channel.name} src={channel.cover} />
          ) : (
            <DefaultCover name={channel.name} />
          )
        }
      >
        <h1>
          TODO SVG with random color and tribe name for channel.cover === null
          cases
        </h1>
        <h1>TODO Editor for create Content (Rooms)</h1>

        <InfiniteScroll apiUrl={`/api/v3/channel/${channelID}/feed`}>
          {(data: Array<Content>) => {
            return <h1>TODO Items Feed {data.length}</h1>;
          }}
        </InfiniteScroll>
      </Page>
    </>
  );
};

export default ChannelView;
