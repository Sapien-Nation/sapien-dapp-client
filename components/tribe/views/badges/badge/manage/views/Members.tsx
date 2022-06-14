import { RefreshIcon, XIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { matchSorter } from 'match-sorter';
import { useSWRConfig } from 'swr';

// api
import {
  executeTransaction,
  proposeBadgeGrant,
  rejectTransaction,
  signTransaction,
} from 'api/tribe';

// components
import { Query } from 'components/common';
import { useAuth } from 'context/user';
import { useToast } from 'context/toast';

// hooks
import { useTribeMembers } from 'hooks/tribe';
import { useBadgeTransactions } from 'hooks/tribe/badge';

// types
import type { BadgeTransaction, TribeBadge } from 'tools/types/tribe';

interface Props {
  badge: TribeBadge;
}

const MembersView = ({ badge }: Props) => {
  const [newOwners, setNewOwners] = useState<
    Array<{ id: string; walletAddress: string }>
  >([]);
  const [isSigning, setIsSigning] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [isProposing, setIsProposing] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const { me } = useAuth();
  const toast = useToast();
  const { query } = useRouter();
  const { mutate } = useSWRConfig();
  const tribeID = query.tribeID as string;

  const tribeMembers = useTribeMembers(tribeID);
  const badgeTransactions = useBadgeTransactions(badge.id);

  const badgeOwnersIDs = badge.owners.map(({ id }) => id);
  const availableOwnersToPropose = tribeMembers.filter(
    ({ id }) => !badgeOwnersIDs.includes(id)
  );

  //------------------------------------------------------------------------------------------------------------
  const handleExecuteTransaction = async (safeTxHash: string, grantToUsers) => {
    setIsFetching(true);
    try {
      await executeTransaction(badge.id, {
        safeTxHash,
        tribeId: tribeID,
      });

      mutate(
        `/core-api/tribe/${tribeID}/safe/transactions/${badge.id}`,
        (transactions) =>
          transactions.filter(
            (transaction) => transaction.safeTxHash !== safeTxHash
          ),
        false
      );
      mutate(
        `/core-api/tribe/${tribeID}/badges`,
        (badges: Array<TribeBadge>) =>
          badges.map((badgeFromCache) => {
            if (badgeFromCache.id === badge.id) {
              return {
                ...badge,
                owners: [
                  ...badge.owners,
                  ...grantToUsers.map((grantToUser) => ({
                    ...grantToUser,
                    walletAddress: '',
                  })),
                ],
              };
            }

            return badge;
          }),
        false
      );
    } catch (err) {
      toast({ message: err.message });
    }
    setIsFetching(false);
  };

  const handleRejectTransaction = async (safeTxHash: string) => {
    setIsRejecting(true);
    try {
      await rejectTransaction(badge.id, {
        safeTxHash,
        tribeId: tribeID,
      });

      mutate(
        `/core-api/tribe/${tribeID}/safe/transactions/${badge.id}`,
        (transactions) =>
          transactions.map((transaction) => {
            if (transaction.safeTxHash === safeTxHash) {
              return {
                ...transaction,
                rejectedBy: [...transaction.rejectedBy, me.id],
              };
            }

            return transaction;
          }),
        false
      );
    } catch (err) {
      toast({ message: err.message });
    }
    setIsRejecting(false);
  };

  const handleSignTransaction = async (safeTxHash: string) => {
    setIsSigning(true);
    try {
      await signTransaction(badge.id, {
        safeTxHash,
        tribeId: tribeID,
      });

      mutate(
        `/core-api/tribe/${tribeID}/safe/transactions/${badge.id}`,
        (transactions) =>
          transactions.map((transaction) => {
            if (transaction.safeTxHash === safeTxHash) {
              return {
                ...transaction,
                signedBy: [...transaction.signedBy, me.id],
              };
            }

            return transaction;
          }),
        false
      );
    } catch (err) {
      toast({ message: err.message });
    }
    setIsSigning(false);
  };

  const handleProposeTransaction = async () => {
    setIsProposing(true);
    try {
      const transaction = await proposeBadgeGrant(badge.id, {
        members: newOwners,
        tribeId: tribeID,
      });

      mutate(
        `/core-api/tribe/${tribeID}/safe/transactions/${badge.id}`,
        (transactions) => [...transactions, transaction],
        false
      );

      setNewOwners([]);
    } catch (err) {
      toast({ message: err.message });
    }
    setIsProposing(false);
  };

  //--------------------------------------------------------------------------------------------------------------------
  const renderTransactionActions = (transaction: BadgeTransaction) => {
    const transactionReadyToExecute =
      transaction.approvals >= transaction.requiredApprovals;
    const canExecuteTransaction = transaction.proposedBy === me.id;

    if (canExecuteTransaction && transactionReadyToExecute) {
      return (
        <button
          onClick={() =>
            handleExecuteTransaction(
              transaction.safeTxHash,
              transaction.grantToUsers
            )
          }
          type="button"
          className={
            isFetching
              ? 'cursor-not-allowed w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sapien hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
              : 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sapien hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
          }
          disabled={isFetching}
        >
          {isFetching && <RefreshIcon className="animate-spin h-5 w-5 mr-3" />}
          {isFetching ? 'Signing...' : `Execute Transaction`}
        </button>
      );
    }

    if (transaction.signedBy?.includes(me.id)) return <span>Signed</span>;

    if (transaction.rejectedBy?.includes(me.id)) return <span>Rejected</span>;

    return (
      <div className="flex gap-10">
        <button
          onClick={() => handleRejectTransaction(transaction.safeTxHash)}
          type="button"
          className={
            isRejecting
              ? 'cursor-not-allowed w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-sapien-red-700 over:bg-sapien-red-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
              : 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-sapien-red-700 hover:bg-sapien-red-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
          }
          disabled={isRejecting}
        >
          {isRejecting && <RefreshIcon className="animate-spin h-5 w-5 mr-3" />}
          {isRejecting ? 'Rejecting...' : 'Reject Transaction'}
        </button>
        <button
          onClick={() => handleSignTransaction(transaction.safeTxHash)}
          type="button"
          className={
            isSigning
              ? 'cursor-not-allowed w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sapien hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
              : 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sapien hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
          }
          disabled={isSigning}
        >
          {isSigning && <RefreshIcon className="animate-spin h-5 w-5 mr-3" />}
          {isSigning ? 'Signing...' : 'Sign Transaction'}
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-9 px-3 py-4">
      {badgeTransactions.length > 0 ? (
        <div>
          <h2 className="text-lg text-gray-300">Transactions</h2>
          <ol>
            {badgeTransactions.map((transaction) => (
              <li key={transaction.id}>
                <div className="flex gap-3 items-center mt-5">
                  <span className="text-gray-400 font-semibold">
                    {transaction.approvals} of {transaction.requiredApprovals}{' '}
                    Required Approvals
                  </span>
                  {/* TODO something like this https://stackoverflow.com/questions/48916431/overlapping-overlaying-multiple-inline-images */}
                  {transaction.grantToUsers?.length > 0 ? (
                    <div className="flex -space-x-2">
                      {transaction.grantToUsers.map((transactionUser) => (
                        <div key={transactionUser.id} className="inline-block">
                          {transactionUser.avatar ? (
                            <img
                              className="h-8 w-8 rounded-full ring-2 ring-white"
                              src={transactionUser.avatar}
                              alt=""
                            />
                          ) : (
                            <div className="bg-sapien-neutral-200 h-8 w-8 ring-2 ring-white rounded-full flex-shrink-0 flex items-center justify-center">
                              {transactionUser.username[0].toUpperCase()}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="mt-5">
                  {renderTransactionActions(transaction)}
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {badge.owners.length > 0 ? (
        <div>
          <h2 className="text-gray-400 font-semibold">Current Badge Owners</h2>
          <ol className="space-y-4 mt-4">
            {badge.owners.map((owner) => {
              return (
                <li key={owner.id} className="flex gap-3 items-center">
                  <img
                    className="h-8 w-8 rounded-full ring-2 ring-white"
                    src={owner.avatar}
                    alt=""
                  />
                  <span>{owner.username}</span>
                </li>
              );
            })}
          </ol>
        </div>
      ) : null}

      {availableOwnersToPropose.length > 0 ? (
        <div>
          <h2 className="text-gray-400 font-semibold">
            Propose new badge owners
          </h2>
          <div className="flex flex-col items-center relative mt-4">
            <div className="w-full">
              <div className="p-1 flex border border-sapien-neutral-400 bg-sapien-neutral-500 placeholder-sapien-neutral-200 rounded">
                <div className="flex flex-auto flex-wrap">
                  {newOwners.map((newOwner) => {
                    const owner = tribeMembers.find(
                      (tribeMember) => tribeMember.id === newOwner.id
                    );
                    return (
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
                              setNewOwners(
                                newOwners.filter(({ id }) => id !== owner.id)
                              );
                            }}
                          >
                            <XIcon className="w-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  <div className="flex-1">
                    <input
                      autoFocus
                      placeholder="Search members"
                      className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-white placeholder-sapien-neutral-200"
                      onChange={(event) => setSearchTerm(event.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="shadow z-40 w-full lef-0 rounded max-h-select overflow-y-auto">
              <div className="flex flex-col w-full">
                {matchSorter(availableOwnersToPropose, searchTerm, {
                  keys: ['displayName'],
                }).map((tribeMember) => {
                  const isSelected = newOwners.find(
                    (newOwner) => newOwner.id === tribeMember.id
                  );
                  return (
                    <div
                      key={tribeMember.id}
                      className={
                        isSelected
                          ? 'py-2 px-3 cursor-pointer bg-gray-900 hover:bg-gray-800 border-transparent border-l-2 border-sapien'
                          : 'py-2 px-3 cursor-pointer bg-gray-900 hover:bg-gray-800 border-transparent border-l-2'
                      }
                      onClick={() => {
                        if (isSelected) {
                          setNewOwners(
                            newOwners.filter(({ id }) => id !== tribeMember.id)
                          );
                        } else {
                          setNewOwners([
                            ...newOwners,
                            {
                              id: tribeMember.id,
                              walletAddress: tribeMember.walletAddress,
                            },
                          ]);
                        }
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {tribeMember.avatar && (
                            <img
                              className="w-5 h-5 rounded-full flex-shrink-0"
                              src={tribeMember.avatar}
                              alt={tribeMember.displayName}
                            />
                          )}
                          {!tribeMember.avatar && tribeMember.displayName && (
                            <div className="bg-sapien-neutral-200 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center">
                              {tribeMember.displayName[0].toUpperCase()}
                            </div>
                          )}
                          {tribeMember.displayName}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={handleProposeTransaction}
              type="button"
              className={
                isProposing || newOwners.length === 0
                  ? 'cursor-not-allowed w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sapien hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                  : 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sapien hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
              }
              disabled={isProposing || newOwners.length === 0}
            >
              {isProposing && (
                <RefreshIcon className="animate-spin h-5 w-5 mr-3" />
              )}
              {isProposing ? 'Submitting...' : `Propose Transaction`}
            </button>
            {newOwners.length === 0 ? (
              <span className="mt-1 block text-sm text-gray-400">
                Select at least 1 tribe member to propose a new transaction
              </span>
            ) : (
              <span className="mt-1 block text-sm text-gray-400">
                {newOwners.length} will be proposed to receive the {badge.name}{' '}
                badge
              </span>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const MembersFormProxy = ({ badge }: Props) => {
  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  const Loader = () => {
    return (
      <div className="w-full h-72 border-sapien-neutral-400 bg-sapien-neutral-500 placeholder-sapien-neutral-200 rounded-md"></div>
    );
  };
  return (
    <Query api={`/core-api/tribe/${tribeID}/members`} loader={<Loader />}>
      {() => (
        <Query
          api={`/core-api/tribe/${tribeID}/safe/transactions/${badge.id}`}
          loader={<Loader />}
        >
          {() => <MembersView badge={badge} />}
        </Query>
      )}
    </Query>
  );
};

export default MembersFormProxy;
