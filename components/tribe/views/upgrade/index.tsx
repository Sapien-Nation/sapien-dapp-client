import {
  ExclamationIcon,
  PhotographIcon,
  RefreshIcon,
} from '@heroicons/react/solid';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import * as Sentry from '@sentry/nextjs';
import { matchSorter } from 'match-sorter';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Lottie from 'react-lottie-player';
import Link from 'next/link';
import _range from 'lodash/range';
import { useSWRConfig } from 'swr';

// api
import { upgradeTribe, upgradeTribeOwners } from 'api/tribe';

// assets
import AssignOwnersJSONLottie from './lottie/AssignOwners.json';
import CreateVaultJSONLottie from './lottie/CreateVault.json';
import UpgradeTribeJSONLottie from './lottie/UpgradeTribe.json';
import UpgradeSuccessJSONLottie from './lottie/UpgradeSuccess.json';
import AlreadyUpgradedJSONLottie from './lottie/ape.json';
import NoTokens from './lottie/NoTokens.json';
import LoadingJSONData from './lottie/Loading.json';
import ProgressClockJSONData from './lottie/ProgressClock.json';

// context
import { useAuth } from 'context/user';
import { useToast } from 'context/toast';

// components
import { SEO, Query } from 'components/common';

// hooks
import { useWeb3 } from 'wallet/providers';
import { useTribe, useTribeMembers, useUpgradeStatus } from 'hooks/tribe';

// types
import type { Token } from 'wallet/types';
import type { ProfileTribe, TribeMember } from 'tools/types/tribe';

enum View {
  // Wallet Views
  Home,
  Tokens,
  DeclarationOfSovereignty,
  ConfirmSign,

  // Upgrade Start Views
  Owners,
  Confirm,

  Loading,

  Success,

  CompleteUpgrade,
}

enum VaultStatus {
  Idle,
  Upgrading,
  AlmostThere,
  Owners,
  Success,
}

interface Props {
  meAsMember: TribeMember; // We do this because me.displayName comes empty backend to take a look into this
  contractTransferred: boolean;
}

const Upgrade = ({ meAsMember, contractTransferred }: Props) => {
  const [view, setView] = useState(
    contractTransferred === true ? View.CompleteUpgrade : View.Home
  );
  const [error, setError] = useState<string | Error | null>(null);
  const [tokens, setTokens] = useState<Array<Token>>([]);
  const [threshold, setThreshold] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [vaultStatus, setVaultStatus] = useState<VaultStatus>(VaultStatus.Idle);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [selectedOwners, setSelectedOwners] = useState([meAsMember]);
  const [isFetchingTokens, setIsFetchingTokens] = useState(true);

  const { me } = useAuth();
  const toast = useToast();
  const { mutate } = useSWRConfig();
  const { push, query } = useRouter();

  const tribeID = query.tribeID as string;
  const tribeMembers = useTribeMembers(tribeID).filter(
    ({ id }) => id !== me.id
  );
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
      setError(err);
    }
    setIsFetchingTokens(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAPI]);

  const handleCompleteUpgradeTribe = async (_, currentCount = 1) => {
    setView(View.Loading);
    try {
      setVaultStatus(VaultStatus.Upgrading);

      await upgradeTribeOwners(tribeID);

      setVaultStatus(VaultStatus.AlmostThere);

      mutate(
        '/core-api/user/tribes',
        (tribes: Array<ProfileTribe>) =>
          tribes.map((cacheTribe) => {
            if (cacheTribe.id === tribeID) {
              return {
                ...cacheTribe,
                isUpgraded: true,
              };
            }

            return cacheTribe;
          }),
        false
      );
      setVaultStatus(VaultStatus.Success);
      await new Promise((r) => setTimeout(r, 2000)); // dramatic 2 seconds delay

      setView(View.Success);
      setVaultStatus(null);
    } catch (err) {
      if (err === 'Tribe has already been upgraded') {
        setVaultStatus(VaultStatus.Success);
        await new Promise((r) => setTimeout(r, 2000)); // dramatic 2 seconds delay

        setView(View.Success);
        setVaultStatus(null);
        return;
      }

      if (err === '') {
        if (currentCount < 3) {
          return handleCompleteUpgradeTribe(null, currentCount + 1);
        }
      }

      toast({
        message: err,
      });
      setView(View.CompleteUpgrade);
      Sentry.captureMessage(err);
    }
  };

  const handleUpgradeTribe = async (_, currentCount = 1) => {
    setView(View.Loading);
    try {
      setVaultStatus(VaultStatus.Upgrading);
      await upgradeTribe(tribeID, {
        owners: selectedOwners.map(({ id, walletAddress }) => ({
          id,
          walletAddress,
        })),
        threshold,
        passportTokenId: selectedToken.id,
      });

      setVaultStatus(VaultStatus.AlmostThere);
      await upgradeTribeOwners(tribeID);

      setVaultStatus(VaultStatus.Owners);
      mutate(
        '/core-api/user/tribes',
        (tribes: Array<ProfileTribe>) =>
          tribes.map((cacheTribe) => {
            if (cacheTribe.id === tribeID) {
              return {
                ...cacheTribe,
                isUpgraded: true,
              };
            }

            return cacheTribe;
          }),
        false
      );

      setVaultStatus(VaultStatus.Success);
      setView(View.Success);
      setVaultStatus(null);
    } catch (err) {
      if (err === 'Tribe has already been upgraded') {
        setVaultStatus(VaultStatus.Success);
        await new Promise((r) => setTimeout(r, 2000)); // dramatic 2 seconds delay

        setView(View.Success);
        return;
      }

      if (err === '') {
        if (currentCount < 3) {
          return handleCompleteUpgradeTribe(null, currentCount + 1);
        }
      }
      toast({
        message: err,
      });
      setView(View.Confirm);
      Sentry.captureMessage(err);
    }
  };
  //------------------------------------------------------------------------

  useEffect(() => {
    handleGetTokens();
  }, [handleGetTokens, walletAPI]);
  //------------------------------------------------------------------------

  const renderOwnersHelperText = () => {
    if (selectedOwners.length === 0) return null;

    if (selectedOwners.length === tribeMembers.length) {
      return <>One owner will receive a badge when one owner selected</>;
    }

    return (
      <>
        <span className="text-bold">{selectedOwners.length}</span> Member(s)
        will receive an{' '}
        <span className="underline decoration-white">Owner</span> badge
      </>
    );
  };

  const renderConfirmHelperText = () => {
    return (
      <>
        <span className="text-bold">
          {threshold} out of {selectedOwners.length} owners must sign every
          transaction.
        </span>
      </>
    );
  };

  const renderView = () => {
    if (web3Error) {
      return (
        <div>
          <div className="px-4 py-5 sm:px-6 flex flex-col items-center gap-3">
            <ExclamationIcon className="w-12 animate-pulse text-sapien-red-700" />
            <h1 className="text-xl lg:text-3xl italic text-white font-bold tracking-wide text-center underline decoration-double decoration-sapien-red-700 decoration-2">
              Wallet API Error
            </h1>
          </div>
          <div className="text-center">
            <p className="text-lg text-gray-300 grid gap-4 items-center justify-center mt-5">
              There was an error loading our Web3 library.
            </p>
            <p className="text-sm mt-2 text-gray-300">
              Please try reloading the page or contact{' '}
              <a
                href="mailto:support@sapien.network"
                className="text-primary-200 font-bold underline"
                target="_blank"
                rel="noreferrer"
              >
                support@sapien.network
              </a>{' '}
              if the error persists.
            </p>
          </div>
        </div>
      );
    }

    if (isWeb3Ready === false) {
      return (
        <div>
          <div className="px-4 py-5 sm:px-6 flex flex-col items-center gap-3">
            <RefreshIcon className="w-12 animate-spin" />
            <h1 className="text-xl animate-pulse lg:text-3xl italic text-white font-bold tracking-wide text-center bg-clip-text text-transparent bg-gradient-to-r to-primary-100 from-white">
              Loading Sapien Wallet
            </h1>
          </div>
          <div>
            <p className="text-lg grid gap-4 items-center justify-center text-gray-300">
              Bring the bananas, and leave the APIs to us 🙉.
            </p>
          </div>
        </div>
      );
    }

    switch (view) {
      case View.Home:
        return (
          <div>
            <div className="px-4 py-5 sm:px-6 flex flex-col items-center gap-3">
              <Lottie
                animationData={UpgradeTribeJSONLottie}
                play
                className="w-52 h-52"
              />
              <h1 className="text-xl lg:text-3xl text-white font-bold tracking-wide text-center decoration-double decoration-gray-500 decoration-2">
                Upgrade Tribe
              </h1>
            </div>
            <div>
              <p className="py-2 text-lg text-gray-400 justify-center mb-6">
                To upgrade your tribe you must have a signed Sapien Nation
                Passport. Your passport will be permanently linked to your tribe
                and will become non-transferrable (
                <a
                  href="https://vitalik.ca/general/2022/01/26/soulbound.html"
                  className="text-purple-600"
                  target="_blank"
                  rel="noreferrer"
                >
                  Soulbound
                </a>
                ).
              </p>
              <p className="text-lg text-gray-400 justify-center mb-6">
                After your Tribe is upgraded you will receive access to the
                following benefits:
              </p>
              <div className="bg-gradient-to-r to-[#6200ea] from-black px-4 py-2 font-semibold text-lg mt-3 rounded-t-md">
                Benefits
              </div>
              <ol className="text-gray-300 bg-black p-4 mb-2 rounded-b-md">
                <li className="flex items-center gap-1">
                  <CheckIcon className="text-sapien-green w-6" /> Create a Vault
                </li>
                <li className="flex items-center gap-1">
                  <CheckIcon className="text-sapien-green w-6" /> Issue NFT
                  Badges
                </li>
                <li className="flex items-center gap-1">
                  <CheckIcon className="text-sapien-green w-6" /> Priority
                  Support
                </li>
                <li className="flex items-center gap-1">
                  <CheckIcon className="text-sapien-green w-6" /> Early Access
                  Features
                </li>
                <li className="flex items-center gap-1">
                  <CheckIcon className="text-sapien-green w-6" /> Verified DAO
                  in the Network
                </li>
              </ol>
            </div>
            <div className="mb-4 mt-6 flex gap-10 justify-center">
              <button
                type="button"
                onClick={() => push(`/tribes/${query.tribeID as string}/home`)}
                className="py-2 px-4 flex-1 justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setView(View.Tokens)}
                className="py-2 px-4 flex-1 justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-primary hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Start
              </button>
            </div>
          </div>
        );
      case View.Tokens:
        return (
          <div className="flex flex-col h-full">
            <div className="px-4 py-5 sm:px-6 flex flex-col items-center gap-3">
              {isFetchingTokens ? (
                <RefreshIcon className="w-12 animate-spin" />
              ) : null}
              <h1
                className={
                  isFetchingTokens
                    ? 'text-xl animate-pulse lg:text-3xl italic text-white font-bold tracking-wide text-center bg-clip-text text-transparent bg-gradient-to-r to-primary-100 from-sapien-neutral-100'
                    : 'text-xl lg:text-3xl text-white font-bold tracking-wide text-center'
                }
              >
                {isFetchingTokens ? 'Loading Tokens...' : 'Sapien Wallet'}
              </h1>
            </div>
            <div className="mt-6 flex-1 flex flex-col justify-center">
              {isFetchingTokens ? (
                <Lottie
                  animationData={LoadingJSONData}
                  play
                  loop
                  className="m-auto absolute w-60 h-60 inset-0"
                />
              ) : (
                <>
                  {tokens.length === 0 ? (
                    <div>
                      <div className="px-10 sm:px-6 flex flex-col items-center gap-3">
                        <Lottie
                          animationData={NoTokens}
                          play
                          loop={false}
                          className="w-96"
                        />
                        <h1 className="text-xl py-6 lg:text-3xl font-bold tracking-wide text-center text-gray-400">
                          No signable tokens found
                        </h1>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full">
                      <div className="text-gray-300 mb-3">
                        <p>Please select one of the tokens listed below:</p>
                      </div>
                      <ol className="flex flex-wrap gap-5">
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
                                <PhotographIcon className="rounded-full w-16 h-16 cursor-pointer object-cover bg-sapien-neutral-300 p-3" />
                              ) : (
                                <img
                                  className="rounded-full w-16 h-16 cursor-pointer object-cover"
                                  src={token.image}
                                  alt=""
                                />
                              )}
                            </>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      case View.DeclarationOfSovereignty:
        return (
          <div>
            <div className="px-4 py-5 sm:px-6 flex flex-col items-center gap-3">
              <h1 className="text-xl lg:text-3xl text-white font-bold tracking-wide text-center ">
                Declaration of Sovereignty of The Sapiens
              </h1>
            </div>
            <div className="max-h-120 overflow-auto mt-5 text-left px-8 leading-6">
              The world is at a turning point and we are faced with tremendous
              uncertainty in all directions. As the threats we face grow to
              existential proportions, the things we might turn to for support —
              our communities, our shared purpose and even a shared reality have
              eroded from under us. If we are to have any hope of conquering the
              challenges ahead of us, we must first understand the problems that
              we face and how they are connected. These problems go to the very
              roots of society and its institutions, affecting every aspect of
              how we make decisions and live our lives; from the information we
              consume to the communities that give us meaning; from the careers
              to which we dedicate ourselves to the causes we invest in. At the
              first glance these problems may seem unconnected but as we delve
              deeper it becomes clear that they share a common thread — a
              fundamental disconnect in how we engage in these systems and one
              of the deepest roots of human nature — the <b> Tribe </b>.
              <br />
              <br />
              For tens of thousands of years the Tribe was the driving force
              behind human existence, dictating every aspect of how we lived our
              lives. As our Tribes wandered across every corner of the globe we
              found balance with nature and each other. We evolved alongside our
              Tribes and many of the unique things that would come to define our
              species — Homo Sapiens — such as language and our ability to solve
              problems collaboratively emerged from this inseparable
              interdependence between each of us and our Tribes.
              <br />
              <br />
              As civilization emerged the rules and incentives that drove our
              lives began to diverge from Nature. As we gained the ability to
              move rivers and shape the world around us the entire world became
              our domain at the expense of the ecosystems that had to contend
              with us. As society became larger and more complex, Nature&lsquo;s
              grasp — that bond that had shackled us for so long but had also
              held us in balance with the Earth and all its diversity — further
              loosened. The industrial age and the discovery of fossil fuels
              severed once and for all any control that Nature had over us — no
              climate too harsh, no sea too vast, no mountain too great to stop
              the relentless titan of industry whose sword now rests at the
              throat of the earth who gave us life.
              <br />
              <br />
              Just as technology has collectively liberated us from
              nature&lsquo;s grasp so too has it liberated each of us from our
              dependence on one another. The relentless progress of technology
              has lifted countless people out of poverty and given each of us
              great control and freedom over how we live our lives. It has
              enabled us to fulfill our desires with the click of a button and
              at a moment&lsquo;s notice. It has given us the ability to travel
              the world, to have any experience we can imagine. It has put the
              sum of human knowledge in the palm of our hand and given us the
              power to share it across the world. With such incredible freedoms
              at our disposal we no longer depend on those around us — for basic
              necessities, for information or entertainment, for meaning — and
              so the bonds of trust that forged our Tribes and held them
              together have all but vanished before our eyes.
              <br />
              <br />
              At this pivotal moment in history we are left with but a single
              choice. We can continue on our current trajectory and hand our
              fate to the titan of industry — or we can choose to claim our own
              fate. This is not a choice we can make alone — if we are to claim
              our fate we must do it together, as
              <b> Sovereign Tribes </b> — equipped with the tools to shape our
              own destiny.
              <br />
              <br />
              And so it is that We the Sapiens, in order that we may secure the
              future of Earth and her children declare our <b>Sovereignty</b>,
              and the <b>Sovereignty of our Tribes.</b>
              <br />
              <br />
              In order to secure and maintain the Sovereignty and flourishing of
              our Tribes we present the following
              <b> Rights, Responsibilities, and Principles </b> that they may
              serve as a guiding light for all committed to the advancement of
              Sapiens and their Tribes.
              <br />
              <br />
              1. <b className="ml-[0.4rem]">The Right to Sovereignty:</b>
              <div className="ml-[1.4rem]">
                {' '}
                Sovereignty is the manifestation of the will of a Tribe. The
                Tribe, as a group of people, has the right to personhood
                including the right to autonomy, existence and
                self-determination. The Sovereignty of the Tribe derives from
                the Sovereignty of its members and each individual has the right
                to choose the Tribes among which their Sovereignty is divided.
                No Tribe, individual or entity may interfere, restrict or impose
                costs on the Sovereignty of another Tribe or individual.{' '}
              </div>
              <br />
              2.{' '}
              <b className="ml-[0.4rem]">
                The Right to Freedom of Information:
              </b>
              <div className="ml-[1.4rem]">
                Information is power. The ability to freely share information,
                whether through speech or expression in any medium, is vital to
                our ability to understand and engage with the world and each
                other. Each individual has the right to freely share information
                with others or choose not to share any information. No Tribe,
                individual or entity may compel anyone to share any information
                against their will.{' '}
              </div>
              <br />
              3. <b className="ml-[0.4rem]">The Right to Economic Autonomy:</b>
              <div className="ml-[1.4rem]">
                Currency is the tool that directs our energy. Every Tribe and
                individual has the right to choose how they direct their energy
                and resources including the right to not expend energy or
                resources. Every Tribe and individual has the right to issue and
                govern their own currency so they may direct their energy and
                resources to the best of their ability. No Tribe, individual or
                entity may compel anyone to expend energy or resources against
                their will.{' '}
              </div>
            </div>
            <div className="mb-4 mt-6 flex gap-10 justify-center">
              <button
                type="button"
                onClick={() => setView(View.Tokens)}
                className="py-2 px-4 flex-1 justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setView(View.ConfirmSign)}
                className="py-2 px-4 flex-1 justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-primary hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Continue
              </button>
            </div>
          </div>
        );
      case View.ConfirmSign:
        return (
          <div>
            <div className="px-4 py-5 sm:px-6 flex flex-col items-center gap-3">
              <h1 className="text-xl lg:text-3xl text-white font-bold tracking-wide text-center">
                Confirm Sign
              </h1>
            </div>
            <div className="flex flex-col gap-5 pt-5">
              <span>
                <p>
                  Please confirm the signing of your Sapien Nation Passport.
                  This will make your passport untradeable and unlock a host of
                  benefits on the Sapien Platform.
                </p>
                <br />
                <p>
                  <b className="text-rose-500">
                    This action is irreversible. Once a passport is signed it
                    can not leave your Sapien wallet.{' '}
                  </b>
                </p>
              </span>
            </div>
            <div className="mb-4 mt-6 flex gap-10 justify-center">
              <button
                type="button"
                onClick={() => setView(View.DeclarationOfSovereignty)}
                className="py-2 px-4 flex-1 justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setView(View.Owners)}
                className="py-2 px-4 flex-1 justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-primary hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Confirm
              </button>
            </div>
            {error && (
              <span className="text-sm text-sapien-red-700 text-center items-center block">
                {(error as Error)?.message || error}
              </span>
            )}
          </div>
        );
      case View.Owners:
        return (
          <div>
            <div className="px-4 sm:px-6 flex flex-col items-center gap-3">
              <Lottie
                animationData={AssignOwnersJSONLottie}
                play
                className="w-52 h-52"
              />
              <h1 className="text-xl lg:text-3xl text-white font-bold tracking-wide text-center ">
                Assign Owners
              </h1>
            </div>
            <div>
              <p className="text-lg text-gray-400 justify-center mt-2 mb-6">
                To create a vault, you must add owners. Executing transactions
                from your vault will require approval from owners. You may add
                additional owners later.
              </p>
            </div>

            <div className="w-full">
              <div className="flex flex-col items-center relative">
                <div className="w-full">
                  <div className="my-2 p-1 flex border border-sapien-neutral-400 bg-sapien-neutral-500 placeholder-sapien-neutral-200 rounded">
                    <div className="flex flex-auto flex-wrap">
                      {selectedOwners.map((owner) => (
                        <div
                          key={owner.id}
                          className="flex justify-center items-center m-1 font-medium py-1 px-4  rounded-full text-primary-700 bg-[#6200ea] border border-primary-300 "
                        >
                          <div className="text-xs text-white font-semibold mr-2 leading-none max-w-full flex-initial">
                            {owner.displayName}
                          </div>
                          {owner.id !== me.id && (
                            <div className="flex flex-auto flex-row-reverse text-white ml-1">
                              <button
                                onClick={() => {
                                  setSelectedOwners(
                                    selectedOwners.filter(
                                      ({ id }) => id !== owner.id
                                    )
                                  );
                                }}
                              >
                                <XIcon className="w-5" />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}

                      <div className="flex-1">
                        <input
                          autoFocus
                          placeholder="Search members"
                          className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-white placeholder-sapien-neutral-200"
                          onChange={(event) =>
                            setSearchTerm(event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shadow z-40 w-full lef-0 rounded max-h-select overflow-y-auto">
                  <div className="flex flex-col w-full">
                    {matchSorter(tribeMembers, searchTerm, {
                      keys: ['displayName'],
                    }).map((member) => {
                      const isSelected = selectedOwners.find(
                        ({ id }) => id === member.id
                      );
                      return (
                        <div
                          key={member.id}
                          className={
                            isSelected
                              ? 'py-2 px-3 cursor-pointer bg-gray-900 hover:bg-gray-800 border-transparent border-l-2 border-sapien'
                              : 'py-2 px-3 cursor-pointer bg-gray-900 hover:bg-gray-800 border-transparent border-l-2'
                          }
                          onClick={() => {
                            if (isSelected) {
                              setSelectedOwners(
                                selectedOwners.filter(
                                  ({ id }) => id !== member.id
                                )
                              );
                            } else {
                              setSelectedOwners([...selectedOwners, member]);
                            }
                          }}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              {member.avatar && (
                                <img
                                  className="w-5 h-5 rounded-full flex-shrink-0"
                                  src={member.avatar}
                                  alt={member.displayName}
                                />
                              )}
                              {!member.avatar && member.displayName && (
                                <div className="bg-sapien-neutral-200 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center">
                                  {member.displayName[0].toUpperCase()}
                                </div>
                              )}
                              {member.displayName}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm text-gray-300">
                {renderOwnersHelperText()}
              </p>
            </div>
            <div className="mb-4 mt-6 flex gap-10 justify-center">
              <button
                type="button"
                onClick={() => {
                  setView(View.Tokens);

                  queueMicrotask(() => {
                    setSelectedOwners([meAsMember]);
                    setSelectedToken(null);
                  });
                }}
                className="py-2 px-4 flex-1 justify-center items-center gap-4 border-2 border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (threshold === null) {
                    setThreshold(selectedOwners.length - 1);
                  }
                  setView(View.Confirm);
                }}
                className="py-2 px-4 flex-1 justify-center items-center gap-4 border-2 border-transparent rounded-md shadow-sm text-sm text-white bg-[#6200ea] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Next
              </button>
            </div>
          </div>
        );
      case View.Confirm:
        return (
          <div>
            <div className="px-4 sm:px-6 flex flex-col items-center gap-3">
              <Lottie
                animationData={CreateVaultJSONLottie}
                play
                className="w-52 h-52"
              />
              <h1 className="text-xl lg:text-3xl text-white font-bold tracking-wide text-center">
                Create Vault
              </h1>
            </div>
            <div>
              <p className="text-lg text-gray-400 justify-center mt-2 mb-6">
                Please specify the signing threshold to approve transactions on
                your Gnosis Safe. This can also be updated later.
              </p>
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-md font-medium text-gray-300"
              >
                Approvals
              </label>
              <select
                id="approvals"
                name="approvals"
                value={threshold}
                onChange={(event) => setThreshold(Number(event.target.value))}
                className="rounded p-2 mt-2 appearance-none outline-none h-full w-full text-white placeholder-sapien-neutral-200 bg-sapien-neutral-500 border border-sapien-neutral-400 focus:border-primary-200 focus:ring-primary-200"
              >
                {_range(1, selectedOwners.length + 1).map((val) => {
                  return (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  );
                })}
              </select>
            </div>
            <p className="mt-5 text-sm text-gray-300">
              {renderConfirmHelperText()}
            </p>
            <div className="mb-4 mt-6 flex gap-10 justify-center">
              <button
                type="button"
                onClick={() => setView(View.Owners)}
                className="py-2 px-4 flex-1 justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Back
              </button>
              <button
                type="button"
                disabled={threshold === 0 || threshold > selectedOwners.length}
                onClick={handleUpgradeTribe}
                className={
                  threshold === 0 || threshold > selectedOwners.length
                    ? 'py-2 px-4 flex-1 justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-primary hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black cursor-not-allowed'
                    : 'py-2 px-4 flex-1 justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-primary hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
                }
              >
                Confirm
              </button>
            </div>
          </div>
        );
      case View.Loading: {
        const renderProgressContent = () => {
          switch (vaultStatus) {
            case VaultStatus.Upgrading:
              return (
                <div className="flex gap-2 justify-center font-semibold items-center">
                  <p className="text-lg">Upgrading</p>
                  <span className="text-sapien-green text-xl">35%</span>
                </div>
              );
            case VaultStatus.Owners:
              return (
                <div className="flex gap-2 justify-center font-semibold items-center">
                  <p className="text-lg">Upgrading</p>
                  <span className="text-sapien-green text-xl">75%</span>
                </div>
              );
            case VaultStatus.AlmostThere:
              return (
                <div className="flex gap-2 justify-center font-semibold items-center">
                  <p className="text-lg">Upgrading</p>
                  <span className="text-sapien-green text-xl">55%</span>
                </div>
              );
            case VaultStatus.Success:
              return (
                <div className="flex gap-2 justify-center font-semibold items-center">
                  <p className="text-lg">Finalazing</p>
                  <span className="text-sapien-green text-xl">99%</span>
                </div>
              );
            default:
              return (
                <div className="flex gap-2 justify-center font-semibold items-center">
                  <p className="text-lg">Starting</p>
                  <span className="text-sapien-green text-xl">0%</span>
                </div>
              );
          }
        };

        return (
          <div>
            <div className="px-4 sm:px-6 flex flex-col items-center gap-3">
              <h1 className="text-xl lg:text-3xl tracking-wide text-center decoration-double decoration-gray-500 decoration-2 text-sapien-red-700 mt-6">
                Please don&apos;t close this window!
              </h1>
            </div>

            <Lottie
              animationData={ProgressClockJSONData}
              play
              loop
              className="m-auto mt-8 w-60 h-60 inset-0"
            />
            <div>{renderProgressContent()}</div>
          </div>
        );
      }
      case View.Success:
        return (
          <div>
            <div className="px-4 sm:px-6 flex flex-col items-center gap-3">
              <h1 className="text-xl lg:text-3xl italic text-white font-bold tracking-wide text-center underline decoration-double decoration-gray-500 decoration-2">
                Congratulations!
              </h1>
            </div>
            <div className="bg-gradient-to-r to-sapien-dark-purple from-sapien-neutral-400 px-4 py-2 font-semibold text-lg mt-3 rounded-md text-center">
              Tribe Upgraded Successfully!
            </div>
            <div className="flex flex-col items-center">
              <Lottie
                animationData={UpgradeSuccessJSONLottie}
                play
                className="w-52 h-52"
              />
            </div>
            <p className="mt-5 text-sm text-gray-300 text-center">
              Click the button below to manage your badges.
            </p>
            <div className="py-4 flex justify-center">
              <Link href={`/tribes/${tribeID}/badges`} passHref>
                <a className="py-2 px-4 justify-center items-center gap-4 border-2 border-transparent rounded-md shadow-sm text-sm text-white bg-primary hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                  Manage Badges
                </a>
              </Link>
            </div>
          </div>
        );
      case View.CompleteUpgrade:
        return (
          <div>
            <div className="px-4 py-5 sm:px-6 flex flex-col items-center gap-3">
              <h1 className="text-xl lg:text-3xl text-white font-bold tracking-wide text-center">
                Complete Upgrade
              </h1>
            </div>
            <div className="flex flex-col gap-5 pt-5">
              <span>
                <p>
                  Please confirm the signing of your Sapien Nation Passport.
                  This will make your passport untradeable and unlock a host of
                  benefits on the Sapien Platform.
                </p>
                <br />
                <p>
                  <b className="text-rose-500">
                    This action is irreversible. Once a passport is signed it
                    can not leave your Sapien wallet.{' '}
                  </b>
                </p>
              </span>
            </div>
            <div className="mb-4 mt-6 flex gap-10 justify-center">
              <button
                type="button"
                onClick={handleCompleteUpgradeTribe}
                className="py-2 px-4 flex-1 justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-primary hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Complete
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
      <div className="max-w-3xl mx-auto h-full">{renderView()}</div>
    </div>
  );
};

const distributionURL = process.env.NEXT_PUBLIC_DISTRIBUTION_URL;
const UpgradeView = () => {
  const { query } = useRouter();
  const tribeID = query.tribeID as string;

  const tribe = useTribe(tribeID);
  const { me } = useAuth();
  const tribeMembers = useTribeMembers(tribeID);
  const { contractTransferred } = useUpgradeStatus();

  if (tribe.isUpgraded === true) {
    return (
      <div className="bg-sapien-neutral-800 lg:rounded-3xl p-5 flex-1">
        <SEO title="Upgrade" />
        <h1 className="sr-only">Already Upgraded</h1>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="max-w-3xl mx-auto h-full">
            <div>
              <div className="px-10 sm:px-6 flex flex-col items-center gap-3">
                <Lottie
                  animationData={AlreadyUpgradedJSONLottie}
                  play
                  className="w-52 h-52"
                />
                <h1 className="text-xl py-6 lg:text-3xl text-white font-bold tracking-wide text-center">
                  Your Tribe is already upgraded!
                </h1>

                <p className="mt-5 text-sm text-gray-300 text-center">
                  Click the button below to manage your badges.
                </p>
                <div className="py-4 flex justify-center">
                  <Link href={`/tribes/${tribeID}/badges`} passHref>
                    <a className="py-2 px-4 justify-center items-center gap-4 border-2 border-transparent rounded-md shadow-sm text-sm text-white bg-primary hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                      Manage Badges
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Query api="/core-api/passport/signed" loader={null}>
      {({ hasPassport }: { hasPassport: boolean }) => {
        if (hasPassport === false)
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
              <div className="left-0 right-0 mx-auto h-full absolute w-full text-center">
                <p className="text-xl text-white font-semibold mt-96 mx-auto w-96 h-96">
                  To upgrade a tribe you need a Sapien Nation Passport. You can{' '}
                  <a
                    href={`${distributionURL}passport/purchase`}
                    className="text-base font-medium bg-[#6200ea] pl-2 pr-2 rounded-lg"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Mint
                  </a>{' '}
                  an NFT or get one on a secondary market like{' '}
                  <a
                    href={`https://opensea.io/collection/sapien-nation-passport`}
                    className="text-base font-medium bg-[#6200ea] pl-2 pr-2 rounded-lg"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Opensea
                  </a>
                </p>
              </div>
            </div>
          );

        return (
          <div className="bg-sapien-neutral-800 lg:rounded-3xl p-5 flex-1">
            <SEO title="Upgrade" />
            <h1 className="sr-only">Tribe Upgrade View</h1>
            <Upgrade
              meAsMember={tribeMembers.find(({ id }) => id === me.id)}
              contractTransferred={contractTransferred}
            />
          </div>
        );
      }}
    </Query>
  );
};

export default UpgradeView;
