import { useRouter } from 'next/router';

//components
import { Head, ErrorView } from 'components/common';
import { useTribe } from 'hooks/tribe';

const MainChannel = () => {
  const { query } = useRouter();
  const { tribeID, viewID } = query;

  const tribe = useTribe(tribeID as string);

  return (
    <>
      <Head title={`${tribe.name} Main Channel`} />
      <h1 className="sr-only">Main Channel for Tribe {tribe.name}</h1>
      <div>InfiniteScroll Feed Goes here</div>
    </>
  );
};

export default MainChannel;
