// components
import { Head } from 'components/common';

// types
import type { MainChannel } from 'tools/types/channel';

interface Props {
  mainChannel: MainChannel;
}

const MainChannelView = ({ mainChannel: { name } }: Props) => {
  return (
    <>
      <Head title={name} />
      <h1>TODO use Page here</h1>
    </>
  );
};

export default MainChannelView;
