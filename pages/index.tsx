// components
import { Redirect } from 'components/common';

// hooks
import { useMainSquare } from 'hooks/tribe';

// types
import { NextPage } from 'next';

const IndexPage: NextPage = () => {
  const { tribeID, viewID } = useMainSquare();

  return <Redirect path={`/tribes/${tribeID}/${viewID}`} />;
};

export default IndexPage;
