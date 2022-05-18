import {
  ExclamationIcon,
  PhotographIcon,
  RefreshIcon,
} from '@heroicons/react/solid';
import { useCallback, useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';

// api
import { signPassport } from 'wallet/api';

// context
import { useAuth } from 'context/user';

// constants
import { PassportStatus } from 'tools/constants/user';

// components
import UpgradeView from '../upgrade';

// hooks
import { useWeb3 } from 'wallet/providers';

// types
import type { Token } from 'wallet/types';

enum View {
  Home,
  DeclarationOfSovereignty,
  ConfirmSign,
  Success,
  Tokens,
}

const Wallet = () => {
  const [view, setView] = useState(View.Home);
  const [error, setError] = useState<string | null>(null);
  const [tokens, setTokens] = useState<Array<Token>>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isFetchingTokens, setIsFetchingTokens] = useState(true);

  const { push, query } = useRouter();

  const { me } = useAuth();
  const { mutate } = useSWRConfig();
  const { walletAPI, isReady: isWeb3Ready, error: web3Error } = useWeb3();
  //------------------------------------------------------------------------

  const handleGetTokens = useCallback(async () => {
    setError(null);
    try {
      setIsFetchingTokens(true);

      const tokens = await walletAPI.getWalletTokens(me.walletAddress);
      setTokens(tokens);
      setError(null);
    } catch (err) {
      console.log(error);
      setError(err);
    }
    setIsFetchingTokens(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAPI]);

  const handleSignToken = async () => {
    setIsFetching(true);
    setError(null);

    try {
      // await signPassport(selectedToken.id);

      mutate(
        `/core-api/passport/${selectedToken.id}/signed`,
        () => ({ canSign: false, signed: true }),
        false
      );
      mutate(
        '/user-api/me',
        (me) => ({
          ...me,
          passport: {
            ...me.passport,
            status: PassportStatus.S,
          },
        }),
        false
      );

      setView(View.Success);
    } catch (err) {
      setError(err);
    }
    setIsFetching(true);
  };

  //------------------------------------------------------------------------

  useEffect(() => {
    handleGetTokens();
  }, [handleGetTokens, walletAPI]);
  //------------------------------------------------------------------------

  const renderView = () => {
    if (web3Error) {
      return (
        <div className="overflow-hidden shadow rounded-lg divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h5 className="text-xl text-white font-bold tracking-wide flex items-center gap-2">
              Wallet API Error
              <ExclamationIcon className="w-5" />
            </h5>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <p className="text-lg text-white grid gap-4 items-center justify-center mt-6">
              <span>
                There was an error loading our Web3 library. Please try
                reloading the page or contact{' '}
                <a
                  href="mailto:support@sapien.network"
                  className="text-blue-500 font-bold underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  support@sapien.network
                </a>{' '}
                if the error persists.
              </span>
            </p>{' '}
          </div>
        </div>
      );
    }

    if (isWeb3Ready === false) {
      return (
        <div className="overflow-hidden shadow rounded-lg divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h5 className="text-xl text-white font-bold tracking-wide flex items-center gap-2">
              Loading Sapien Wallet API tools{' '}
              <span className="animate-pulse">...</span>
              <RefreshIcon className="w-5 animate-spin" />
            </h5>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <p className="text-lg text-white grid gap-4 items-center justify-center mt-6">
              Bring the bananas, and leave the APIs to us 🙉.
            </p>
          </div>
        </div>
      );
    }

    switch (view) {
      case View.Home:
        return (
          <div className="overflow-hidden shadow rounded-lg divide-y divide-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <h5 className="text-xl text-white font-bold tracking-wide text-center">
                Upgrade Tribe
              </h5>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <p className="text-lg text-white justify-center mt-3">
                To upgrade your tribe you must have a signed Sapien Nation
                Passport. Your passport will be permanently linked to your tribe
                after it is upgraded. After your Tribe is upgraded you will
                receive access to the following benefits:
              </p>
              <ol>
                <li>Vault Creation</li>
                <li>Issue Badges</li>
              </ol>
            </div>
            <div className="py-4 flex gap-4">
              <button
                type="button"
                onClick={() => push(`/tribes/${query.tribeID as string}/home`)}
                className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setView(View.Tokens)}
                className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Sign Passport
              </button>
            </div>
          </div>
        );
      case View.Tokens:
        return (
          <div className="overflow-hidden shadow rounded-lg divide-y divide-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <h5 className="text-xl text-white font-bold tracking-wide text-center">
                {isFetchingTokens
                  ? 'Loading Tokens...'
                  : 'This are the tokens we found on your Sapien Wallet'}
              </h5>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <ol>
                {tokens.map((token) => (
                  <li
                    key={token.name}
                    onClick={() => {
                      if (token.id) {
                        setSelectedToken(token);
                        setView(View.DeclarationOfSovereignty);
                      }
                    }}
                  >
                    <>
                      {token.id === null ? (
                        <>
                          <PhotographIcon className="px-1 py-1 w-6" />
                        </>
                      ) : (
                        <img
                          className="rounded-full w-32 h-32 cursor-pointer"
                          src={token.image}
                          alt=""
                        />
                      )}
                    </>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        );
      case View.ConfirmSign:
        return (
          <div className="overflow-hidden shadow rounded-lg divide-y divide-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <h5 className="text-xl text-white font-bold tracking-wide text-center">
                Almost there.
              </h5>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <p>
                Please confirm the signing of your Sapien Passport. This will
                make your passport untradeable and unlock a host of benefits on
                the Sapien Platform.
              </p>
              <p>
                (Note: This action is irreversible, once a passport is signed it
                can not leave your Sapien wallet).
              </p>
            </div>
            <div className="py-4 flex gap-4">
              <button
                onClick={() => setView(View.DeclarationOfSovereignty)}
                className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Back
              </button>
              <button
                type="button"
                disabled={isFetching}
                onClick={handleSignToken}
                className={
                  isFetching
                    ? 'w-full py-2 px-4 flex animate-pulse justify-center items-center cursor-not-allowed gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
                    : 'w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
                }
              >
                {isFetching ? ' Signing Passport...' : 'Confirm'}
              </button>
              {error && (
                <span className="text-xs text-red-400 flex justify-center items-center">
                  {error}
                </span>
              )}
            </div>
          </div>
        );
      case View.Success:
        return <UpgradeView />;
      case View.DeclarationOfSovereignty:
        return (
          <div className="overflow-hidden shadow rounded-lg divide-y divide-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <h5 className="text-xl text-white font-bold tracking-wide text-center">
                Declaration of Sovereignty of The Sapiens
              </h5>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="text-justify px-3">
                <p>
                  The world is at a turning point and we are faced with
                  tremendous uncertainty in all directions. As the threats we
                  face grow to existential proportions, the things we might turn
                  to for support — our communities, our shared purpose and even
                  a shared reality have eroded from under us. If we are to have
                  any hope of conquering the challenges ahead of us, we must
                  first understand the problems that we face and how they are
                  connected. These problems go to the very roots of society and
                  its institutions, affecting every aspect of how we make
                  decisions and live our lives; from the information we consume
                  to the communities that give us meaning; from the careers to
                  which we dedicate ourselves to the causes we invest in. At the
                  first glance these problems may seem unconnected but as we
                  delve deeper it becomes clear that they share a common thread
                  — a fundamental disconnect in how we engage in these systems
                  and one of the deepest roots of human nature —{' '}
                  <span className="">the Tribe.</span>
                </p>
                <p>
                  For tens of thousands of years the Tribe was the driving force
                  behind human existence, dictating every aspect of how we lived
                  our lives. As our Tribes wandered across every corner of the
                  globe we found balance with nature and each other. We evolved
                  alongside our Tribes and many of the unique things that would
                  come to define our species — Homo Sapiens — such as language
                  and our ability to solve problems collaboratively emerged from
                  this inseparable interdependence between each of us and our
                  Tribes.
                </p>
                <p>
                  As civilization emerged the rules and incentives that drove
                  our lives began to diverge from Nature. As we gained the
                  ability to move rivers and shape the world around us the
                  entire world became our domain at the expense of the
                  ecosystems that had to contend with us. As society became
                  larger and more complex, Nature&lsquo;s grasp — that bond that
                  had shackled us for so long but had also held us in balance
                  with the Earth and all its diversity — further loosened. The
                  industrial age and the discovery of fossil fuels severed once
                  and for all any control that Nature had over us — no climate
                  too harsh, no sea too vast, no mountain too great to stop the
                  relentless titan of industry whose sword now rests at the
                  throat of the earth who gave us life.
                </p>
                <p>
                  Just as technology has collectively liberated us from
                  nature&lsquo;s grasp so too has it liberated each of us from
                  our dependence on one another. The relentless progress of
                  technology has lifted countless people out of poverty and
                  given each of us great control and freedom over how we live
                  our lives. It has enabled us to fulfill our desires with the
                  click of a button and at a moment&lsquo;s notice. It has given
                  us the ability to travel the world, to have any experience we
                  can imagine. It has put the sum of human knowledge in the palm
                  of our hand and given us the power to share it across the
                  world. With such incredible freedoms at our disposal we no
                  longer depend on those around us — for basic necessities, for
                  information or entertainment, for meaning — and so the bonds
                  of trust that forged our Tribes and held them together have
                  all but vanished before our eyes.
                </p>
                <p>
                  At this pivotal moment in history we are left with but a
                  single choice. We can continue on our current trajectory and
                  hand our fate to the titan of industry — or we can choose to
                  claim our own fate. This is not a choice we can make alone —
                  if we are to claim our fate we must do it together, as
                  Sovereign Tribes — equipped with the tools to shape our own
                  destiny.
                </p>
                <p>
                  And so it is that We the Sapiens, in order that we may secure
                  the future of Earth and her children declare our Sovereignty,
                  and the Sovereignty of our Tribes.
                </p>
                <p>
                  In order to secure and maintain the Sovereignty and
                  flourishing of our Tribes we present the following Rights,
                  Responsibilities, and Principles that they may serve as a
                  guiding light for all committed to the advancement of Sapiens
                  and their Tribes.
                </p>
                <ol className="mt-4">
                  <li>
                    <span className="">The Right to Sovereignty:</span>{' '}
                    Sovereignty is the manifestation of the will of a Tribe. The
                    Tribe, as a group of people, has the right to personhood
                    including the right to autonomy, existence and
                    self-determination. The Sovereignty of the Tribe derives
                    from the Sovereignty of its members and each individual has
                    the right to choose the Tribes among which their Sovereignty
                    is divided. No Tribe, individual or entity may interfere,
                    restrict or impose costs on the Sovereignty of another Tribe
                    or individual.
                  </li>
                  <li>
                    <span>The Right to Freedom of Information: </span>
                    Information is power. The ability to freely share
                    information, whether through speech or expression in any
                    medium, is vital to our ability to understand and engage
                    with the world and each other. Each individual has the right
                    to freely share information with others or choose not to
                    share any information. No Tribe, individual or entity may
                    compel anyone to share any information against their will.
                  </li>
                  <li>
                    <span>The Right to Economic Autonomy:</span> Currency is the
                    tool that directs our energy. Every Tribe and individual has
                    the right to choose how they direct their energy and
                    resources including the right to not expend energy or
                    resources. Every Tribe and individual has the right to issue
                    and govern their own currency so they may direct their
                    energy and resources to the best of their ability. No Tribe,
                    individual or entity may compel anyone to expend energy or
                    resources against their will.
                  </li>
                </ol>
              </div>
            </div>

            <div className="py-4 flex gap-4">
              <button
                onClick={() => setView(View.Tokens)}
                className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setView(View.ConfirmSign)}
                className="w-full py-2 px-4 mt-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Continue
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">{renderView()}</div>
    </div>
  );
};

export default Wallet;
