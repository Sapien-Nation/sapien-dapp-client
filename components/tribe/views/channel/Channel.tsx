import { useRouter } from 'next/router';

// components
import { Head, ErrorView } from 'components/common';

// hooks
import { useChannel } from 'hooks/channel';

const Channel = () => {
  const { query } = useRouter();
  const { tribeID, viewID } = query;

  const channel = useChannel(tribeID as string, viewID as string);

  if (channel === null) {
    return <ErrorView message="There was a problem rendering this Channel!" />;
  }

  return (
    <>
      <Head title={channel.name} />
      <h1 className="sr-only">{channel.name}</h1>
      <div>
        <span>Editor goes here</span>
      </div>
      <div>InfiniteScroll Feed Goes here</div>
    </>
  );
};

export default Channel;
