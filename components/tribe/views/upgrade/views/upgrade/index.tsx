import * as Sentry from '@sentry/nextjs';
import _range from 'lodash/range';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { matchSorter } from 'match-sorter';
import { CheckIcon, XIcon } from '@heroicons/react/outline';

// api
import { upgradeTribe } from 'api/tribe';

// components
import { Query, LottiePlayer } from 'components/common';

// context
import { useAuth } from 'context/user';

// hooks
import { useTribeMembers } from 'hooks/tribe';

// assets
import { VaultIcon } from 'assets';
import { CrownIcon } from '../../assets';

// web3
import { createVault } from './web3';

enum View {
  Confirm,
  Home,
  Loading,
  Owners,
  Success,
}

const UpgradeView = () => {
  const [view, setView] = useState(View.Home);
  const [threshold, setThreshold] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOwners, setSelectedOwners] = useState([]);

  const { me } = useAuth();
  const { push, query } = useRouter();

  const tribeID = query.tribeID as string;
  const tribeMembers = useTribeMembers(tribeID).filter(
    ({ id }) => id !== me.id
  );

  const handleUpgradeTribe = async () => {
    setView(View.Loading);
    try {
      const safeAddress = await createVault({
        owners: selectedOwners.map(({ walletAddress }) => walletAddress),
        threshold,
      });

      await upgradeTribe(tribeID, {
        safeAddress,
        owners: selectedOwners.map(({ id, walletAddress }) => ({
          id,
          walletAddress,
        })),
        threshold,
      });
      setView(View.Success);
    } catch (err) {
      setView(View.Confirm);
      Sentry.captureMessage(err);
    }
  };

  const renderHelperText = () => {
    if (selectedOwners.length === 0) return null;

    if (selectedOwners.length === tribeMembers.length) {
      return (
        <>
          All of the members of the tribe will receive an{' '}
          <span className="underline">Owner</span> badge
        </>
      );
    }

    return (
      <>
        <span className="text-bold">{selectedOwners.length}</span> Member(s)
        will receive an{' '}
        <span className="underline decoration-white">Owner</span> badge
      </>
    );
  };

  const renderView = () => {
    switch (view) {
      case View.Success:
        return (
          <div>
            <div className="px-4 py-5 sm:px-6 flex flex-col items-center gap-3">
              <h1 className="text-xl lg:text-3xl italic text-white font-bold tracking-wide text-center underline decoration-double decoration-gray-500 decoration-2">
                Congratulations!
              </h1>
            </div>
            <div className="bg-gradient-to-r to-sapien-dark-purple from-sapien-neutral-400 px-4 py-2 font-semibold text-lg mt-3 rounded-md text-center">
              Tribe Upgraded Successfully!
            </div>
            <div className="flex flex-col items-center">
              <LottiePlayer lottie="/lottie/UpgradeSuccess.json" />
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
      case View.Confirm:
        return (
          <div>
            <div className="px-4 py-5 sm:px-6 flex flex-col items-center gap-3">
              <VaultIcon fill="white" className="w-12 animate-pulse" />
              <h1 className="text-xl lg:text-3xl italic text-white font-bold tracking-wide text-center underline decoration-double decoration-gray-500 decoration-2">
                Create Vault
              </h1>
            </div>
            <div>
              <p className="text-lg text-gray-400 justify-center mt-2 mb-6">
                Vault transactions must be approved by owners, how many
                approvals do you want to require? This can be updated later.
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
      case View.Home:
        return (
          <div>
            <div className="px-4 py-5 sm:px-6 flex flex-col items-center gap-3">
              <LottiePlayer
                lottie="/lottie/UpgradeTribe.json"
                width="200px"
                height="200px"
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
              <ol className="text-gray-300 bg-black p-4 space-y-1.5 rounded-b-md">
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
                onClick={() => push(`/tribes/${tribeID}/home`)}
                className="py-2 px-4 flex-1 justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setView(View.Owners)}
                className="py-2 px-4 flex-1 justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-primary hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Start
              </button>
            </div>
          </div>
        );
      case View.Owners:
        return (
          <div>
            <div className="px-4 py-5 sm:px-6 flex flex-col items-center gap-3">
              <LottiePlayer
                lottie="/lottie/AssignOwners.json"
                width="200px"
                height="200px"
              />
              <h1 className="text-xl lg:text-3xl text-white font-bold tracking-wide text-center ">
                Assign Owners
              </h1>
            </div>
            <div>
              <p className="text-lg text-gray-400 justify-center mt-2 mb-6">
                To create a vault, you must add owners. Executing Transactions
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
              <p className="mt-5 text-sm text-gray-300">{renderHelperText()}</p>
            </div>
            <div className="mb-4 mt-6 flex gap-10 justify-center">
              <button
                type="button"
                onClick={() => {
                  setView(View.Home);
                }}
                className="py-2 px-4 flex-1 justify-center items-center gap-4 border-2 border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Back
              </button>
              <button
                type="button"
                disabled={selectedOwners.length === 0}
                onClick={() => {
                  setView(View.Confirm);
                }}
                className={
                  selectedOwners.length === 0
                    ? 'py-2 px-4 flex-1 justify-center items-center gap-4 border-2 border-transparent rounded-md shadow-sm text-sm text-white bg-[#6200ea] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black cursor-not-allowed'
                    : 'py-2 px-4 flex-1 justify-center items-center gap-4 border-2 border-transparent rounded-md shadow-sm text-sm text-white bg-[#6200ea] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
                }
              >
                Next
              </button>
            </div>
          </div>
        );
      case View.Loading:
        return (
          <div>
            <h1>https://sapienteam.atlassian.net/browse/PVD-222</h1>
          </div>
        );
    }
  };

  return <div className="max-w-2xl mx-auto">{renderView()}</div>;
};

const UpgradeViewProxy = () => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  return (
    <Query api={`/core-api/tribe/${tribeID}/members`}>
      {() => {
        return <UpgradeView />;
      }}
    </Query>
  );
};

export default UpgradeViewProxy;
