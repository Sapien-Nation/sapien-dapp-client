import { useRouter } from 'next/router';

// components
import { Query, SEO } from 'components/common';

// types
import type { NextPage } from 'next';

interface Props {
  passportID: string;
}

const PassportPage = ({ passportID }: Props) => {
  return (
    <Query api={`/api/v3/passport/${passportID}`}>
      {() => {
        return <h1>TODO animation</h1>;
      }}
    </Query>
  );
};

const PassportPageProxy: NextPage = () => {
  const { query } = useRouter();

  if (!query.id) return null;

  return (
    <>
      <SEO title="Sapien Nation Passport" />
      <PassportPage passportID={query.id as string} />
    </>
  );
};

export default PassportPageProxy;
