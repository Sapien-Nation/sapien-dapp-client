import { useRouter } from 'next/router';

// components
import { NotFound } from 'components/common';

const ContentView = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id) {
    return <NotFound message="We could't find any content for this search" />;
  }

  return <h1>TODO Query Content for id {id}</h1>;
};

export default ContentView;
