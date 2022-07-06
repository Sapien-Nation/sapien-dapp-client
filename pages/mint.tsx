import { RefreshIcon } from '@heroicons/react/solid';
import Link from 'next/link';
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
import type { ProfileTribe } from 'tools/types/tribe';

const NothingToMintview = () => {
  const { me } = useAuth();

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
      <div className="px-4 py-4 flex flex-col gap-4 absolute justify-center items-center w-full text-center h-full">
        <p>
          You already have a Passport minted with the email{' '}
          <span className="underline">{me.email}</span>
        </p>
        <div className="flex justify-between gap-4">
          <Link passHref href="/logout?redirect=/mint">
            <a className="flex justify-center h-12 items-center py-2 px-4 border-2 rounded-md shadow-sm text-md font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2">
              Switch Account
            </a>
          </Link>
          <Link passHref href="/">
            <a className="flex justify-center h-12 items-center py-2 px-4 border-2 rounded-md shadow-sm text-md font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2">
              Launch App
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

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

const Mint = ({ avatar }: { avatar: string }) => {
  const [isFetching, setIsFetching] = useState(false);

  const toast = useToast();
  const { me } = useAuth();
  const { push } = useRouter();

  const handleMint = async ({ id }: ProfileTribe) => {
    setIsFetching(true);
    try {
      const data = await mintPassport(me.walletAddress);
      push(`/tribes/${id}/home`);
    } catch (err) {
      toast({ message: err });
    }
    setIsFetching(false);
  };

  return (
    <Query api="/core-api/user/tribes">
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
            <div className="relative flex justify-center items-center mb-5 flex-col h-full w-full gap-4">
              <h4 className="text-3xl sm:text-5xl font-bold">
                Find your tribe and ignite the new renaissance!
              </h4>
              {avatar && (
                <div className="aspect-w-1 aspect-h-1 sm:aspect-w-3 sm:aspect-h-2">
                  <img
                    className="object-cover max-w-sm mx-auto rounded-xl shadow-lg shadow-white/50 border-double border-4 border-sky-500"
                    src={avatar}
                    alt="Sapien Avatar Transition"
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => handleMint(tribes[0])}
                className={
                  isFetching
                    ? 'animate-bounce cursor-not-allowed mt-5 flex h-12 items-center justify-center py-2 px-4 border-2 rounded-md shadow-sm text-md font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 '
                    : 'flex justify-center h-12 items-center mt-5 py-2 px-4 border-2 rounded-md shadow-sm text-md font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 '
                }
                disabled={isFetching}
              >
                {isFetching ? (
                  <>
                    <RefreshIcon className="animate-spin h-5 w-5 mr-3" />
                    Minting Passport...
                  </>
                ) : (
                  <>Mint Passport</>
                )}
              </button>
              <p className="text-xs">
                Minting Passport as <span>{me.email}</span> wanna use other
                account?{' '}
                <Link passHref href="/logout?redirect=/mint">
                  <a className="font-bold">Switch account</a>
                </Link>
              </p>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

interface MintStatus {
  avatar: string | null;
  code: number | null;
  figureName: string | null;
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

  const renderView = ({ avatar, code }: MintStatus) => {
    if (code === null) return <NothingToMintview />;

    if (code === 100) return <Mint avatar={avatar} />;

    if (code === 101) return <FeedbackView code={101} />;

    if (code === 102) return <FeedbackView code={102} />;
  };

  return (
    <>
      <SEO title="Minting" />
      <Query api="/core-api/passport/mint-checker">
        {(response: MintStatus) => renderView(response)}
      </Query>
    </>
  );
};

export default MintPage;
