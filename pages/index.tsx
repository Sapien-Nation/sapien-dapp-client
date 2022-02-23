// components
import { Redirect } from 'components/common';

// hooks
import { useMainTribe } from 'hooks/tribe';

// types
import { NextPage } from 'next';

const IndexPage: NextPage = () => {
  const { tribeID } = useMainTribe();

  return <Redirect path={`/tribes/${tribeID}/home`} />;
};

export default IndexPage;
