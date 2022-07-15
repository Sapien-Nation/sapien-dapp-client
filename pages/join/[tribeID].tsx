import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';

// api
import { joinTribe } from 'api/tribe';

// context
import { useAuth } from 'context/user';

// components
import { Query, Redirect } from 'components/common';

// types
import type { TribeInvite } from 'tools/types/tribe';

enum View {
  Error,
  Join,
}

interface Props {
  tribe: TribeInvite;
}

const Join = ({ tribe }: Props) => {
  const [view, setView] = useState<View>(View.Join);

  const { push } = useRouter();

  const handleJoin = async () => {
    try {
      await joinTribe(tribe.id);
      push(`/tribes/${tribe.id}/home`);
    } catch (err) {
      setView(View.Error);
    }
  };

  const renderView = () => {
    switch (view) {
      case View.Error:
        return (
          <div className="text-center">
            <div className="flex-shrink-0">
              <img
                className="mx-auto h-12 w-auto"
                src="/images/logooutlined.svg"
                alt="sapien"
              />
            </div>
            <h1 className="text-xl my-4">
              Whoops, it seems there was an error
            </h1>
            <Link href="/">
              <a className="inline-flex w-full justify-center rounded-md border-0 px-4 py-2 text-base font-medium bg-primary-200">
                Back Home
              </a>
            </Link>
          </div>
        );
      case View.Join:
        return (
          <div className="text-center">
            {tribe.avatar ? (
              <img
                className="w-16 h-16 rounded-xl mx-auto"
                src={tribe.avatar}
                alt=""
              />
            ) : (
              <div className="w-16 h-16 rounded-xl mx-auto bg-sapien-40 shadow shadow-sapien-neutral-600" />
            )}
            <h1 className="text-xl mt-5">{tribe.name}</h1>
            <p className="text-sm text-gray-400 mb-3">
              {tribe.ownerName} has invited you to join
            </p>
            <p className="text-xs text-gray-400">
              {tribe.membersCount} members
            </p>
            <button
              className="inline-flex w-full mt-6 justify-center rounded-md border-0 px-4 py-2 text-base font-medium bg-primary-200"
              onClick={handleJoin}
            >
              Accept Invite
            </button>
          </div>
        );
    }
  };

  return (
    <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden  h-full w-full">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg"
          alt="People working on laptops"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-900 mix-blend-multiply" />
      </div>
      <div className="p-6 top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 absolute w-80 rounded-xl text-center bg-sapien-neutral-600">
        {renderView()}
      </div>
    </div>
  );
};

const JoinProxy = () => {
  const { me } = useAuth();
  const { asPath, query } = useRouter();

  if (me === null) {
    return <Redirect path={`/login?redirect=${asPath}`} />;
  }

  if (!query.tribeID) return null;

  return (
    <Query api={`/core-api/tribe/${query.tribeID as string}/invite`}>
      {(tribe: TribeInvite) => <Join tribe={tribe} />}
    </Query>
  );
};
export default JoinProxy;
