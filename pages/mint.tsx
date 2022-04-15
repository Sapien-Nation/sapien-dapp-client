import { RefreshIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useState } from 'react';

// api
import { mintPassport } from 'api/passport';

// components
import { Query, Redirect, SEO } from 'components/common';

// context
import { useAuth } from 'context/user';
import { useToast } from 'context/toast';

// types
import type { NextPage } from 'next';
import { ProfileTribe } from 'tools/types/tribe';

const PassportNotReadyForMint = () => {
  return (
    <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden h-full w-full">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg"
          alt="People working on laptops"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-900 mix-blend-multiply" />
      </div>
      <div className="px-4 py-4 bottom-0 absolute w-full text-center">
        <p className="mt-6 text-xl text-white font-semibold">
          Your Passport is still not ready, please be aware of your email and we
          will let you know when its ready
        </p>
      </div>
    </div>
  );
};

const Mint = () => {
  const { push } = useRouter();

  const [isFetching, setIsFetching] = useState(false);

  const toast = useToast();

  const handleMint = async ({ id }: ProfileTribe) => {
    setIsFetching(true);
    try {
      await mintPassport();

      push(`/tribes/${id}/home#minted`);
    } catch (err) {
      toast({ message: err });
    }
    setIsFetching(false);
  };

  return (
    <Query api="/api/v3/profile/tribes">
      {(tribes: Array<ProfileTribe>) => {
        return (
          <div className="bg-black min-h-full w-full flex flex-col justify-center items-center">
            <span className="flex">
              <span className="animate-ping absolute left-0 inline-flex h-full w-full rounded-full bg-sapien-80 opacity-75"></span>
              <span className="relative inline-flex rounded-fullbg-sapien-80"></span>
            </span>
            <h1 className="text-5xl font-extrabold mb-4">
              Join the Sapien Nation
            </h1>
            <img
              src="https://d1bdmh0gdusw0k.cloudfront.net/images/misc/passport_sapien_nation.png"
              alt="sapien protocol"
              className="rounded-md relative"
            />
            <button
              type="button"
              onClick={() => handleMint(tribes[0])}
              className={
                isFetching
                  ? 'absolute bottom-[320px] cursor-not-allowed flex h-14 items-center w-56 justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 '
                  : 'absolute bottom-[320px] flex justify-center h-14 items-center w-56 py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 '
              }
              disabled={isFetching}
            >
              {isFetching && (
                <RefreshIcon className="animate-spin h-5 w-5 mr-3" />
              )}
              Mint Passport
            </button>
          </div>
        );
      }}
    </Query>
  );
};

interface MintStatus {
  statusCode: number | null;
}

const MintPage: NextPage = () => {
  const { asPath, ...rest } = useRouter();
  const { me, isLoggingIn } = useAuth();

  if (isLoggingIn) return null;

  if (me === null)
    return (
      <>
        <SEO title="" />
        <Redirect path={`/login?redirect=${asPath}`} />
      </>
    );

  const handleRedirectToPurchase = () => {
    const getURL = () => {
      if (typeof window === 'undefined')
        return 'https://www.sapien.network/passport/purchase';

      const { host } = window.location;

      if (host === 'front-sandbox.sapien.network')
        return 'https://passport-sandbox.sapien.network/passport/purchase';
      else if (host === 'https://front-qat.sapien.network/')
        return 'https://passport-qat.sapien.network/passport/purchase';

      return 'https://www.sapien.network/passport/purchase';
    };

    return window.location.replace(getURL());
  };

  const renderView = (statusCode) => {
    if (statusCode === null) <Redirect path={`/`} />;

    if (statusCode === 100) return <Mint />;

    if (statusCode === 101) return handleRedirectToPurchase();

    if (statusCode === 102) return <PassportNotReadyForMint />;
  };

  return (
    <Query
      api="/api/v3/passport/mint"
      options={{ fetcher: () => ({ statusCode: 100 }) }}
    >
      {({ statusCode }: MintStatus) => renderView(statusCode)}
    </Query>
  );
};

export default MintPage;
