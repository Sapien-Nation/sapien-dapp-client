// components
import { Head } from 'components/common';
import DiscoveryCard from 'components/tribe/DiscoveryCard';

// types
import { NextPage } from 'next';

const DiscoveryPage: NextPage = () => {
  return (
    <>
      <Head title="Discover Tribes" />
      <h1 className="sr-only">Discovery Tribes Page</h1>
      <DiscoveryCard />
    </>
  );
};

export default DiscoveryPage;
