import { useRouter } from 'next/router';
import { useEffect } from 'react';

// context
import { useAuth } from 'context/user';

// types
import type { Tribe } from 'tools/types/tribeBar';

// components
import Layout from './Layout';
import { Query } from 'components/common';

interface Props {
  tribes: Array<Tribe>;
}

const Index = ({ tribes }: Props) => {
  const { push } = useRouter();

  useEffect(() => {
    if (tribes?.length) {
      push(`/client/${tribes[0].mainSquareId}`);
    }
  }, [tribes, push]);

  return null;
};

const IndexPage = () => {
  const { me } = useAuth();

  if (!me) return 'TODO NOT AUTH API CALL';

  return (
    <Query api="/api/v3/profile/tribes" loader={<span>Redirecting...</span>}>
      {(tribes: Array<Tribe>) => <Index tribes={tribes} />}
    </Query>
  );
};

IndexPage.Layout = Layout;

export default IndexPage;
