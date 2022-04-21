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

const distributionURL = process.env.NEXT_PUBLIC_DISTRIBUTION_URL;
const FeedbackView = ({ code }: { code: number }) => {
  const renderText = () => {
    switch (code) {
      case 101:
        return (
          <p className="mt-6 text-xl text-white font-semibold">
            To mint a passport, you need first to{' '}
            <a
              href={`${distributionURL}passport/purchase`}
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
              href={`${distributionURL}passport/purchase`}
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
  const [isFetching, setIsFetching] = useState(false);

  const toast = useToast();
  const { me } = useAuth();
  const { push } = useRouter();

  const handleMint = async ({ id }: ProfileTribe) => {
    setIsFetching(true);
    try {
      await mintPassport(me.walletAddress);
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
          <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden h-full w-full">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg"
                alt="People working on laptops"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-900 mix-blend-multiply" />
            </div>
            <div className="relative flex justify-center items-center flex-col h-full w-full gap-4">
              <h4 className="text-3xl sm:text-5xl font-extrabold bg-sapien-80">
                Find your tribe and ignite the new renaissance!
              </h4>
              <p>
                Click below to mint your passport. You will be redirected to the
                Sapien Network private beta.{' '}
              </p>
              <button
                type="button"
                onClick={() => handleMint(tribes[0])}
                className={
                  isFetching
                    ? 'animate-bounce cursor-not-allowed flex h-12 items-center w-48 justify-center py-2 px-4 border-2 rounded-md shadow-sm text-md font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 '
                    : 'flex justify-center h-12 items-center w-48 py-2 px-4 border-2 rounded-md shadow-sm text-md font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 '
                }
                disabled={isFetching}
              >
                {isFetching ? (
                  <>
                    <RefreshIcon className="animate-spin h-5 w-5 mr-3" />
                    Minting...
                  </>
                ) : (
                  <>Mint Passport</>
                )}
              </button>
            </div>
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
    <>
      <SEO title="Minting" />
      <Query api="/api/v3/passport/mint-checker">
        {({ code }: MintStatus) => renderView(code)}
      </Query>
    </>
  );
};

export default MintPage;
