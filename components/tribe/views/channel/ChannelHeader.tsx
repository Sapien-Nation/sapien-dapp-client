// types
import type { Channel } from 'tools/types/channel';

interface Props {
  channel: Channel;
}

const ChannelHeader = ({ channel }: Props) => {
  return <h1>{channel.name}</h1>;
};

export default ChannelHeader;
