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

const FeedbackView = ({ code }: { code: number }) => {
  const getRedirectURL = () => {
    if (typeof window === 'undefined')
      return 'https://www.sapien.network/passport/purchase';

    const { host } = window.location;

    if (host === 'front-sandbox.sapien.network')
      return 'https://passport-sandbox.sapien.network/passport/purchase';
    else if (host === 'localhost:3000')
      return `http://localhost:3000/passport/purchase`;
    else if (host === 'https://front-qat.sapien.network/')
      return 'https://passport-qat.sapien.network/passport/purchase';

    return 'https://www.sapien.network/passport/purchase';
  };

  const renderText = () => {
    switch (code) {
      case 101:
        return (
          <p className="mt-6 text-xl text-white font-semibold">
            To mint a passport, you need first to{' '}
            <a
              href={getRedirectURL()}
              className="text-base font-medium bg-primary-200"
            >
              Buy a passport
            </a>
          </p>
        );
      case 102:
        return (
          <p className="mt-6 text-xl text-white font-semibold">
            Please finish the avatar select flow and then come back to min{' '}
            <a
              href={getRedirectURL()}
              className="text-base font-medium bg-primary-200"
            >
              Click here to continue
            </a>
          </p>
        );
    }
  };

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
      <div className="px-4 py-4 flex absolute justify-center items-center w-full text-center h-full">
        {renderText()}
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
      // await mintPassport();

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
  code: number | null;
}

const MintPage: NextPage = () => {
  const { asPath } = useRouter();
  const { me, isLoggingIn } = useAuth();

  if (isLoggingIn) return null;

  if (me === null)
    return (
      <>
        <SEO title="" />
        <Redirect path={`/login?redirect=${asPath}`} />
      </>
    );

  const renderView = (code) => {
    if (code === null) return <Redirect path="/" />;

    if (code === 100) return <Mint />;

    if (code === 101) return <FeedbackView code={101} />;

    if (code === 102) return <FeedbackView code={102} />;
  };

  return (
    <Query
      api="/api/v3/passport/mint"
      options={{ fetcher: () => ({ code: 100 }) }}
    >
      {({ code }: MintStatus) => renderView(code)}
    </Query>
  );
};

export default MintPage;