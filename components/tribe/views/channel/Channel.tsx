import { useRouter } from 'next/router';

// components
import { Head } from 'components/common';

// hooks
import { useTribeChannels } from 'hooks/tribe';

const Channel = () => {
  const { query } = useRouter();
  const { tribeID, viewID } = query;

  const channel = useTribeChannels(tribeID as string).find(
    ({ id }) => id === viewID
  );

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
