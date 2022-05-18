import * as Sentry from '@sentry/nextjs';
import _range from 'lodash/range';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { matchSorter } from 'match-sorter';

// api
import { upgradeTribe } from 'api/tribe';

// components
import { Query } from 'components/common';

// hooks
import { useTribeMembers } from 'hooks/tribe';
import { mockTribeMember } from 'tools/mocks/tribe';

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

  const { push, query } = useRouter();

  const tribeID = query.tribeID as string;
  const tribeMembers = useTribeMembers(tribeID);

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
                onClick={() => push(`/tribes/${tribeID}/home`)}
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
                onClick={() => push(`/tribes/${tribeID}/home`)}
                className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setView(View.Owners)}
                className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Start
              </button>
            </div>
          </div>
        );
      case View.Owners:
        return (
          <div className="overflow-hidden shadow rounded-lg divide-y divide-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <h5 className="text-xl text-white font-bold tracking-wide text-center">
                Assign Owners
              </h5>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <p className="text-lg text-white justify-center mt-3">
                To create a vault, you must add owners. Executing Transactions
                from your vault will require approval from owners. You may add
                additional owners later.
              </p>
            </div>
            <div>
              <input
                name="tribe-members-search"
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              {matchSorter(tribeMembers, searchTerm, {
                keys: ['displayName'],
              }).map((member) => {
                const isSelected = Boolean(
                  selectedOwners.find(({ id }) => id === member.id)
                );
                return (
                  <div key={member.id}>
                    <span>{member.displayName}</span>
                    <button
                      disabled={selectedOwners.length >= 12}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedOwners(
                            selectedOwners.filter(({ id }) => id !== member.id)
                          );
                        } else {
                          setSelectedOwners([...selectedOwners, member]);
                        }
                      }}
                    >
                      {isSelected ? 'Remove' : 'Select'}
                    </button>
                  </div>
                );
              })}
              <div>
                {selectedOwners.length} Members will receive the owner badge
              </div>
            </div>
            <div className="py-4 flex gap-4">
              <button
                type="button"
                disabled={selectedOwners.length === 0}
                onClick={() => {
                  setView(View.Confirm);
                }}
                className={
                  selectedOwners.length === 0
                    ? 'w-full py-2 px-4 flex justify-center cursor-not-allowed items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
                    : 'w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">{renderView()}</div>
    </div>
  );
};

const UpgradeViewProxy = () => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  return (
    <Query
      api={`/core-api/tribe/${tribeID}/members`}
      options={{
        fetcher: () => [
          mockTribeMember(),
          mockTribeMember({ displayName: 'Ethaanpump' }),
          mockTribeMember({ displayName: 'Carlos' }),
        ],
      }}
    >
      {() => {
        return <UpgradeView />;
      }}
    </Query>
  );
};

export default UpgradeViewProxy;
