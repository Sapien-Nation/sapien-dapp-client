import * as Sentry from '@sentry/nextjs';
import _range from 'lodash/range';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { matchSorter } from 'match-sorter';
import { CheckIcon, SearchIcon, XIcon } from '@heroicons/react/outline';

// api
import { upgradeTribe } from 'api/tribe';

// components
import { Query } from 'components/common';

// context
import { useAuth } from 'context/user';

// hooks
import { useTribeMembers } from 'hooks/tribe';

// assets
import { BoostIcon, CrownIcon } from '../../assets';

enum View {
  Confirm,
  Home,
  Loading,
  Owners,
  Success,
}

const UpgradeView = () => {
  const [view, setView] = useState(View.Home);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOwners, setSelectedOwners] = useState([]);
  const [approvalsCount, setApprovalsCount] = useState(0);

  const { me } = useAuth();
  const { push, query } = useRouter();

  const tribeID = query.tribeID as string;
  const tribeMembers = useTribeMembers(tribeID).filter(
    ({ id }) => id !== me.id
  );

  const handleUpgradeTribe = async () => {
    setView(View.Loading);
    try {
      await upgradeTribe(tribeID);
      setView(View.Success);
    } catch (err) {
      setView(View.Confirm);
      Sentry.captureMessage(err);
    }
  };

  const renderView = () => {
    switch (view) {
      case View.Success:
        return (
          <div className="overflow-hidden shadow rounded-lg divide-y divide-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <h5 className="text-xl text-white font-bold tracking-wide text-center">
                Tribe Upgraded
              </h5>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <p className="text-lg text-white justify-center mt-3">
                Congratulations!
              </p>
            </div>
            <div className="py-4 flex gap-4">
              <Link href={`/tribes/${tribeID}/badges`} passHref>
                <a className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                  Manage Badges
                </a>
              </Link>
            </div>
          </div>
        );
      case View.Confirm:
        return (
          <div className="overflow-hidden shadow rounded-lg divide-y divide-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <h5 className="text-xl text-white font-bold tracking-wide text-center">
                Create Vault
              </h5>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <p className="text-lg text-white justify-center mt-3">
                Vault transactions must be approved by owners, how many
                approvals do you want to require? This can be updated later
              </p>
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Approvals
              </label>
              <select
                id="approvals"
                name="approvals"
                onChange={(event) =>
                  setApprovalsCount(Number(event.target.value))
                }
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
            <div className="py-4 flex gap-4">
              <button
                type="button"
                onClick={() => setView(View.Owners)}
                className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Back
              </button>
              <button
                type="button"
                disabled={
                  approvalsCount === 0 || approvalsCount > selectedOwners.length
                }
                onClick={handleUpgradeTribe}
                className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
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
              <BoostIcon fill="white" className="w-12 animate-pulse" />
              <h1 className="text-xl lg:text-3xl italic text-white font-bold tracking-wide text-center underline decoration-double decoration-gray-500 decoration-2">
                Upgrade Tribe
              </h1>
            </div>
            <div>
              <p className="text-lg text-gray-400 justify-center mt-2 mb-6">
                To upgrade your tribe you must have a signed Sapien Nation
                Passport. Your passport will be permanently linked to your tribe
                after it is upgraded. After your Tribe is upgraded you will
                receive access to the following benefits:
              </p>
              <div className="bg-gradient-to-r to-sapien-dark-purple from-sapien-neutral-400 px-4 py-2 font-semibold text-lg mt-3 rounded-t-md">
                Benefits
              </div>
              <ol className="text-gray-300 bg-black p-4 space-y-1.5 rounded-b-md">
                <li className="flex items-center gap-1">
                  <CheckIcon className="text-sapien-green w-6" /> Vault Creation
                </li>
                <li className="flex items-center gap-1">
                  <CheckIcon className="text-sapien-green w-6" /> Issue Badges
                </li>
                <li className="flex items-center gap-1">
                  <CheckIcon className="text-sapien-green w-6" /> Early Access
                  Features
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
              <CrownIcon fill="white" className="w-12 animate-pulse" />
              <h1 className="text-xl lg:text-3xl italic text-white font-bold tracking-wide text-center underline decoration-double decoration-gray-500 decoration-2">
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
                          className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-primary-700 bg-primary-100 border border-primary-300 "
                        >
                          <div className="text-xs font-normal leading-none max-w-full flex-initial">
                            {owner.displayName}
                          </div>
                          <div className="flex flex-auto flex-row-reverse">
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
              <p className="mt-5 text-sm text-gray-300">
                {selectedOwners.length === tribeMembers.length ? (
                  <>
                    All of the selected members will recive an{' '}
                    <span className="underline">owner</span> badge
                  </>
                ) : (
                  <>
                    <span className="text-bold">{tribeMembers.length}</span>{' '}
                    Member(s) will receive an{' '}
                    <span className="underline decoration-white">owner</span>{' '}
                    badge
                  </>
                )}
              </p>
            </div>
            <div className="mb-4 mt-6 flex gap-10 justify-center">
              <button
                type="button"
                onClick={() => {
                  setView(View.Home);
                }}
                className="py-2 px-4 flex-1 justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Back
              </button>
              <button
                type="button"
                disabled={selectedOwners.length === 0}
                onClick={() => {
                  setView(View.Confirm);
                }}
                className="py-2 px-4 flex-1 justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-primary hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
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
