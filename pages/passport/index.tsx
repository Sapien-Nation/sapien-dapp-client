// components
import { Head } from 'components/common';
import { AuthHero, PublicHero, PassportFeatures } from 'components/passport';

// hooks
import { useAuth } from 'context/user';

// types
import type { NextPage } from 'next';

const PassportPage: NextPage = () => {
  const { me, isLoggingIn } = useAuth();

  if (isLoggingIn) return null;

  return (
    <>
      <Head title="Passport" />
      <div>
        {me ? <AuthHero /> : <PublicHero />}
        <PassportFeatures />
      </div>
    </>
  );
};

export default PassportPage;
