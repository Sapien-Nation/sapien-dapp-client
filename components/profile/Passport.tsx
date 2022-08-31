import { useState } from 'react';

// components
import { Query } from 'components/common';

// hooks
import { useAuth } from 'context/user';
import { usePassport } from 'hooks/passport';
import { useUserBadges } from 'hooks/user';

// utils
import { formatAvatarName, formatTokenID } from 'utils/passport';
import { formatDate } from 'utils/date';

enum View {
  Posts,
  Badges,
  Transactions,
  Members,
}

const Passport = () => {
  const badges = useUserBadges();
  const passport = usePassport();
  const [view, setView] = useState<View>(View.Posts);

  const renderView = () => {
    switch (view) {
      case View.Posts:
        return <>Posts</>;
      case View.Badges:
        return <>Badges</>;
      case View.Transactions:
        return <>Transactions</>;
      case View.Members:
        return <>Members</>;
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      {/* passport */}
      <div className="rounded-xl bg-sapien-neutral-600 p-7">
        <div className="flex flex-col md:grid md:grid-cols-3 md:grid-rows-4 md:gap-x-4 max-w-4xl">
          <div className="flex justify-center md:grid md:row-start-1 md:row-end-4">
            <img
              className="rounded-xl"
              src="https://bit.ly/3czl8ws"
              alt="Bored Ape"
            />
          </div>

          <div>
            <span className="block text-gray-400 font-semibold">
              PASSPORT NUMBER:
            </span>
            <span className="font-bold">
              {formatTokenID(Number(passport.tokenId))}
            </span>
          </div>
          <div>
            <span className="block text-gray-400 font-semibold">
              ISSUING AUTHORITY:
            </span>
            <span className="font-bold">{passport.issuingAuthority}</span>
          </div>
          <div>
            <span className="block text-gray-400 font-semibold">
              ISSUE DATE:
            </span>
            <span className="font-bold">
              {formatDate(passport.issueDate, 'LLLL d y')}
            </span>
          </div>
          <div>
            <span className="block text-gray-400 font-semibold">NAME:</span>
            <span className="font-bold">
              {formatAvatarName(passport.name) || 'Avatar Name'}
            </span>
          </div>
          <div>
            <span className="block text-gray-400 font-semibold">USERNAME:</span>
            <span className="font-bold">{passport.username}</span>
          </div>
          <div>
            <span className="block text-gray-400 font-semibold">BADGES:</span>
            <span className="font-bold">
              {formatTokenID(Number(passport.tokenId))}
            </span>
          </div>
          <div className="flex items-center">
            <div className="flex h-12 w-full rounded-md p-[1px] bg-gradient-to-br from-[#ff64ca] to-[#f66e21]">
              <div className="flex justify-center items-center rounded-md w-full h-full bg-sapien-neutral-600">
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff64ca] to-[#f66e21]">
                  DAO AUTHORITY
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <span className="block text-gray-400 font-semibold">BIO:</span>
            <span className="font-normal">{passport.bio || '-'}</span>
          </div>
        </div>
      </div>
      {/* badges */}
      <div className="rounded-xl bg-sapien-neutral-600">
        <div className="flex justify-center border-b-2 border-sapien-neutral-900">
          <button
            className={`border-b-2 ${
              view === View.Posts ? 'border-red-600' : 'border-transparent'
            } px-7 py-4`}
            onClick={() => setView(View.Posts)}
          >
            Posts
          </button>
          <button
            className={`border-b-2 ${
              view === View.Badges ? 'border-red-600' : 'border-transparent'
            } px-7 py-4`}
            onClick={() => setView(View.Badges)}
          >
            Badges
          </button>
          <button
            className={`border-b-2 ${
              view === View.Transactions
                ? 'border-red-600'
                : 'border-transparent'
            } px-7 py-4`}
            onClick={() => setView(View.Transactions)}
          >
            Transactions
          </button>
          <button
            className={`border-b-2 ${
              view === View.Members ? 'border-red-600' : 'border-transparent'
            } px-7 py-4`}
            onClick={() => setView(View.Members)}
          >
            Members
          </button>
        </div>
        <div className="flex flex-col rounded-xl bg-sapien-neutral-600 p-7">
          <div>{renderView()}</div>
        </div>
      </div>
    </div>
  );
};

const PassportProxy = () => {
  const { me } = useAuth();

  return (
    <Query api={`/core-api/user/${me.id}/badges`}>{() => <Passport />}</Query>
  );
};

export default PassportProxy;
