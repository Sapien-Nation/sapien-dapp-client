// components
import { Redirect } from 'components/common';

// hooks
import { useMainTribe, useTribeRooms } from 'hooks/tribe';

// types
import { NextPage } from 'next';

const IndexPage: NextPage = () => {
  const { tribeID } = useMainTribe();
  const [{ id }] = useTribeRooms(tribeID);

  return <Redirect path={`/tribes/${tribeID}/${id}`} />;
};

export default IndexPage;
