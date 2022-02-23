// components
import { Head, Header, Page } from 'components/common';

// types
import type { Channel } from 'tools/types/channel';

interface Props {
  channel: Channel;
}

const ChannelView = ({ channel }: Props) => {
  console.log(channel);
  return (
    <>
      <Head title={channel.name} />
      <Page
        header={
          channel.cover ? (
            <Header alt={channel.name} src={channel.cover} />
          ) : null
        }
      >
        <h1>
          TODO SVG with random color and tribe name for channel.cover === null
          cases
        </h1>
        <h1>TODO Editor for create Content (Rooms)</h1>
        TODO fetch {`/api/v3/channel/${channel.id}/feed`}
      </Page>
    </>
  );
};

export default ChannelView;
