import { useEffect } from 'react';

// next
import { useRouter } from 'next/router';

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

  if (!me) return null;

  return (
    <Query api="/api/profile/tribes">
      {(tribes: Array<Tribe>) => <Index tribes={tribes} />}
    </Query>
  );
};

IndexPage.Layout = Layout;

export default IndexPage;
