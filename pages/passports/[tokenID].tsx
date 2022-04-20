import { useRouter } from 'next/router';

// components
import { Query, SEO } from 'components/common';

// types
import type { NextPage } from 'next';
import type { Passport } from 'tools/types/passport';

interface Props {
  tokenID: string;
}

const PassportPage = ({ tokenID }: Props) => {
  return (
    <Query
      api={`/api/v3/passport/metadata/${tokenID}`}
      options={{
        fetcher: () => ({
          image:
            'https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=80',
          passportId: 1,
          issueDate: new Date().toISOString(),
          issuingAuthority: 'Sapien Nation',
        }),
      }}
    >
      {(passport: Passport) => {
        return <h1>{passport.passportId}</h1>;
      }}
    </Query>
  );
};

const PassportPageProxy: NextPage = () => {
  const { query } = useRouter();

  if (!query.tokenID) return null;

  return (
    <>
      <SEO title="Sapien Nation Passport" />
      <PassportPage tokenID={query.tokenID as string} />
    </>
  );
};

export default PassportPageProxy;
