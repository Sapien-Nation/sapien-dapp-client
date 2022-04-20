import { useRouter } from 'next/router';

// components
import { Query, SEO } from 'components/common';

// types
import type { NextPage } from 'next';
import type { Passport } from 'tools/types/passport';

interface Props {
  passportID: string;
}

const PassportPage = ({ passportID }: Props) => {
  return (
    <Query api={`/api/v3/passport/${passportID}`}>
      {(passport: Passport) => {
        return <h1>{passport.passportId}</h1>;
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
